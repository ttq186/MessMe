import uuid
from typing import Any

from strawberry import BasePermission
from strawberry.types import Info

from . import deps


def generate_uuid() -> str:
    return str(uuid.uuid4())


def to_camel(string: str) -> str:
    string_split = string.split("_")
    return string_split[0] + "".join(word.capitalize() for word in string_split[1:])


class IsAuthenticatedUser(BasePermission):
    async def has_permission(self, source: Any, info: Info, **kwargs) -> bool:
        current_user = await deps.get_current_user(info)
        info.context["current_user"] = current_user
        return True


class IsAuthenticatedAdmin(BasePermission):
    async def has_permission(self, source: Any, info: Info, **kwargs) -> bool:
        current_user = await deps.get_current_superuser(info)
        info.context["current_user"] = current_user
        return True
