from contextlib import asynccontextmanager
from typing import Annotated, Literal
from uuid import uuid4

import yaml
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, ConfigDict, Field, StringConstraints

from .database import database, initialize_database


Name = Annotated[
    str,
    StringConstraints(strip_whitespace=True, min_length=1, max_length=200),
]


class WorkflowCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: Name
    yaml_text: str = Field(min_length=1, max_length=200_000)


class WorkflowResponse(WorkflowCreate):
    id: str
    status: Literal["draft"] = "draft"


@asynccontextmanager
async def lifespan(app: FastAPI):
    initialize_database()
    yield


app = FastAPI(
    title="Worchestra API",
    lifespan=lifespan,
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post(
    "/workflows",
    response_model=WorkflowResponse,
    status_code=201,
)
def create_workflow(request: WorkflowCreate):
    try:
        configuration = yaml.safe_load(request.yaml_text)
    except yaml.YAMLError as error:
        mark = getattr(error, "problem_mark", None)

        raise HTTPException(
            status_code=422,
            detail={
                "message": "Ошибка синтаксиса YAML",
                "line": mark.line + 1 if mark else None,
                "column": mark.column + 1 if mark else None,
            },
        ) from error

    if not isinstance(configuration, dict):
        raise HTTPException(
            status_code=422,
            detail="Конфигурация должна содержать поля YAML",
        )

    workflow_id = str(uuid4())

    with database() as connection:
        connection.execute(
            """
            INSERT INTO workflows (id, name, yaml_text)
            VALUES (?, ?, ?)
            """,
            (workflow_id, request.name, request.yaml_text),
        )

    return WorkflowResponse(
        id=workflow_id,
        name=request.name,
        yaml_text=request.yaml_text,
    )


@app.get("/workflows", response_model=list[WorkflowResponse])
def list_workflows(
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    with database() as connection:
        rows = connection.execute(
            """
            SELECT id, name, yaml_text
            FROM workflows
            ORDER BY rowid DESC
            LIMIT ? OFFSET ?
            """,
            (limit, offset),
        ).fetchall()

    return [WorkflowResponse(**dict(row)) for row in rows]


@app.get("/workflows/{workflow_id}", response_model=WorkflowResponse)
def get_workflow(workflow_id: str):
    with database() as connection:
        row = connection.execute(
            """
            SELECT id, name, yaml_text
            FROM workflows
            WHERE id = ?
            """,
            (workflow_id,),
        ).fetchone()

    if row is None:
        raise HTTPException(
            status_code=404,
            detail="Workflow не найден",
        )

    return WorkflowResponse(**dict(row))
