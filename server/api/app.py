import strawberry
from strawberry.fastapi import GraphQLRouter
from strawberry.tools import merge_types
from fastapi import Depends

from . import deps
from .graphql import UserQuery, UserMutation, MessageQuery, AuthMutation


async def get_context(session=Depends(deps.get_session)):
    return {"session": session}


Query = merge_types("Query", (UserQuery, MessageQuery))
Mutation = merge_types("Mutation", (UserMutation, AuthMutation))

schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema, context_getter=get_context)
