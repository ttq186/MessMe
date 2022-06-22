from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.graphql_app import graphql_app


app = FastAPI(title="MessMe", version="1.0.0", root_path="")


allowed_origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(graphql_app, prefix="/graphql")
