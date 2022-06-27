import strawberry
from strawberry.fastapi import GraphQLRouter
from strawberry.tools import merge_types
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from api import deps
from .graphql import UserQuery, UserMutation, MessageQuery, AuthMutation


async def get_context(
    postgres_session: AsyncSession = Depends(deps.get_postgres_session),
):
    return {"postgres_session": postgres_session}


Query = merge_types("Query", (UserQuery, MessageQuery))
Mutation = merge_types("Mutation", (UserMutation, AuthMutation))

schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema, context_getter=get_context)
