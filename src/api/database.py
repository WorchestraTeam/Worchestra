import sqlite3
from contextlib import closing, contextmanager
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[2]
DATABASE_PATH = PROJECT_ROOT / "data" / "worchestra.db"


@contextmanager
def database():
    with closing(sqlite3.connect(DATABASE_PATH)) as connection:
        connection.row_factory = sqlite3.Row

        with connection:
            yield connection


def initialize_database():
    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)

    with database() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS workflows (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                yaml_text TEXT NOT NULL
            )
            """
        )
