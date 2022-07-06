import strawberry
from strawberry.fastapi import GraphQLRouter
from strawberry.tools import merge_types
from strawberry.subscriptions import GRAPHQL_TRANSPORT_WS_PROTOCOL
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from motor.motor_asyncio import AsyncIOMotorDatabase

from api import deps

from .graphql import (
    AuthQuery,
    UserQuery,
    UserMutation,
    MessageQuery,
    MessageMutation,
    MessageSubscription,
)


async def get_context(
    pg_session: AsyncSession = Depends(deps.get_postgres_session),
    mongo_db: AsyncIOMotorDatabase = Depends(deps.get_mongo_db),
):
    return {"pg_session": pg_session, "mongo_db": mongo_db}


Query = merge_types("Query", (AuthQuery, UserQuery, MessageQuery))
Mutation = merge_types("Mutation", (UserMutation, MessageMutation))
Subscription = merge_types("Subscription", (MessageSubscription,))

schema = strawberry.Schema(query=Query, mutation=Mutation, subscription=Subscription)

graphql_app = GraphQLRouter(
    schema,
    context_getter=get_context,
    subscription_protocols=[GRAPHQL_TRANSPORT_WS_PROTOCOL],
)
