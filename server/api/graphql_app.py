import strawberry
from strawberry.fastapi import GraphQLRouter
from strawberry.tools import merge_types
from strawberry.subscriptions import GRAPHQL_TRANSPORT_WS_PROTOCOL
from fastapi import Depends, WebSocket
from sqlalchemy.ext.asyncio import AsyncSession
from motor.motor_asyncio import AsyncIOMotorDatabase
from core.config import settings
from fastapi_websocket_pubsub import PubSubEndpoint

from api import deps

# from db.config import pubsub, redis
from .graphql import (
    UserQuery,
    UserMutation,
    AuthMutation,
    MessageQuery,
    MessageMutation,
    MessageSubscription,
)

pubsub = PubSubEndpoint(
    broadcaster=f"redis://{settings.REDIS_HOSTNAME}:{settings.REDIS_PORT}"
)


async def get_context(
    pg_session: AsyncSession = Depends(deps.get_postgres_session),
    mongo_db: AsyncIOMotorDatabase = Depends(deps.get_mongo_db),
):
    return {"pg_session": pg_session, "mongo_db": mongo_db, "pubsub": pubsub}


Query = merge_types("Query", (UserQuery, MessageQuery))
Mutation = merge_types("Mutation", (UserMutation, AuthMutation, MessageMutation))
Subscription = merge_types("Subscription", (MessageSubscription,))

schema = strawberry.Schema(query=Query, mutation=Mutation, subscription=Subscription)

graphql_app = GraphQLRouter(
    schema,
    context_getter=get_context,
    subscription_protocols=[GRAPHQL_TRANSPORT_WS_PROTOCOL],
)


@graphql_app.websocket("/graphql")
async def websocket_rpc_endpoint(websocket: WebSocket):
    async with pubsub.broadcaster:
        await pubsub.main_loop(websocket)
