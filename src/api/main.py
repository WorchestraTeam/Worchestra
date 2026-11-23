from fastapi import FastAPI


app = FastAPI(title="Worchestra API")


@app.get("/health")
def health():
    return {"status": "ok"}
