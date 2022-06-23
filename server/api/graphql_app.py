import strawberry
from strawberry.fastapi import GraphQLRouter
from strawberry.tools import merge_types
from strawberry.extensions import DisableValidation
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from api import deps
from .graphql import UserQuery, UserMutation, MessageQuery, AuthMutation


async def get_context(db_session: AsyncSession = Depends(deps.get_db_session)):
    return {"db_session": db_session}


Query = merge_types("Query", (UserQuery, MessageQuery))
Mutation = merge_types("Mutation", (UserMutation, AuthMutation))

schema = strawberry.Schema(
    query=Query, mutation=Mutation, extensions=[DisableValidation()]
)
graphql_app = GraphQLRouter(schema, context_getter=get_context)
