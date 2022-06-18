from fastapi import FastAPI

from api.graphql_app import graphql_app


app = FastAPI(title="MessMe", version="1.0.0", root_path="")


app.include_router(graphql_app, prefix="/graphql")
