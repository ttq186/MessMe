from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from sqlalchemy import text

from api.graphql_app import graphql_app
from db.config import (broadcast, mongo_client, postgres_engine,
                       postgres_session)

app = FastAPI(title="MessMe")


allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://messme.ttq186.dev",
    "wss://messme.ttq186.dev",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)


@app.on_event("startup")
async def startup_event():
    await broadcast.connect()

    # Test postgresql connection
    async with postgres_engine.connect() as conn:
        await conn.execute(text("SELECT 1"))

    # Test mongodb connection
    await mongo_client.start_session()


@app.on_event("shutdown")
async def shutdown_event():
    await broadcast.disconnect()
    postgres_session.close_all()
    await postgres_engine.dispose()


app.include_router(graphql_app, prefix="/graphql")