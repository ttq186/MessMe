from fastapi import FastAPI
from fastapi.middleware import cors, gzip

from src.database import postgres_engine, postgres_session
from src.graphql import graphql_app

app = FastAPI(title="MessMe")


allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://messme.ttq186.dev",
    "wss://messme.ttq186.dev",
]

app.add_middleware(
    cors.CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(gzip.GZipMiddleware, minimum_size=1000)


@app.on_event("startup")
async def startup_event():
    # await broadcast.connect()
    pass


@app.on_event("shutdown")
async def shutdown_event():
    # await broadcast.disconnect()
    postgres_session.close_all()
    await postgres_engine.dispose()


app.include_router(graphql_app, prefix="/graphql")
