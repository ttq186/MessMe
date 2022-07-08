from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from api.graphql_app import graphql_app
from db.config import broadcast, postgres_session, postgres_engine, mongo_client


app = FastAPI(title="MessMe", version="1.0.0", root_path="")


allowed_origins = ["http://localhost:3000", "http://127.0.0.1:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
