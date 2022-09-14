import strawberry
from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from sqlalchemy.ext.asyncio import AsyncSession
from strawberry.fastapi import GraphQLRouter
from strawberry.subscriptions import GRAPHQL_TRANSPORT_WS_PROTOCOL
from strawberry.tools import merge_types

from api import deps

from .graphql import (AuthQuery, ContactMutation, ContactQuery,
                      ContactSubscription, MessageMutation, MessageQuery,
                      MessageSubscription, UserMutation, UserQuery)


async def get_context(
    pg_session: AsyncSession = Depends(deps.get_postgres_session),
    mongo_db: AsyncIOMotorDatabase = Depends(deps.get_mongo_db),
):
    return {"pg_session": pg_session, "mongo_db": mongo_db}


Query = merge_types("Query", (AuthQuery, UserQuery, MessageQuery, ContactQuery))
Mutation = merge_types("Mutation", (UserMutation, MessageMutation, ContactMutation))
Subscription = merge_types("Subscription", (MessageSubscription, ContactSubscription))

schema = strawberry.Schema(query=Query, mutation=Mutation, subscription=Subscription)

graphql_app = GraphQLRouter(
    schema,
    graphiql=False,
    context_getter=get_context,
    subscription_protocols=[GRAPHQL_TRANSPORT_WS_PROTOCOL],
)
