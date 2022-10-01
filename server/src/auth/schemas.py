import strawberry


@strawberry.type
class SasToken:
    token: str


@strawberry.type
class AuthToken:
    access_token: str
    refresh_token: str
