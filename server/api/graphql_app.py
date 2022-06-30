import strawberry
from strawberry.fastapi import GraphQLRouter
from strawberry.tools import merge_types
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from motor.motor_asyncio import AsyncIOMotorDatabase

from api import deps
from .graphql import (
    UserQuery,
    UserMutation,
    AuthMutation,
    MessageQuery,
    MessageMutation,
)


async def get_context(
    pg_session: AsyncSession = Depends(deps.get_postgres_session),
    mongo_db: AsyncIOMotorDatabase = Depends(deps.get_mongo_db),
):
    return {"pg_session": pg_session, "mongo_db": mongo_db}


Query = merge_types("Query", (UserQuery, MessageQuery))
Mutation = merge_types("Mutation", (UserMutation, AuthMutation, MessageMutation))

schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
)
graphql_app = GraphQLRouter(schema, context_getter=get_context)