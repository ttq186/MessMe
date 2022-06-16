from uuid import UUID
import strawberry


@strawberry.type
class Contact:
    id: strawberry.ID
    user_id: UUID | None
    friend_id: UUID | None
