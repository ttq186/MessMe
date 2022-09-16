from typing import Any


class ResourceNotFound(Exception):
    def __init__(self, resource_type: str, id: str | int, email: str = None) -> None:
        if email:
            self.message = f"{resource_type} with email {email} does not exist!"
        else:
            self.message = f"{resource_type} with id {id} does not exist!"
        super().__init__(self.message)


class DeleteFailed(Exception):
    def __init__(self, resource_type: str, id: Any) -> None:
        self.message = f"Delete {resource_type} with id {id} failed!"
        super().__init__(self.message)


class NotAuthorized(Exception):
    def __init__(self) -> None:
        self.message = "You don't have this privilege!"
        super().__init__(self.message)


class NotAuthenticated(Exception):
    def __init__(self) -> None:
        self.message = "Not authenticated!"
        super().__init__(self.message)


class EmailAlreadyExists(Exception):
    def __init__(self) -> None:
        self.message = "This email already exists!"
        super().__init__(self.message)


class EmailDoesNotExist(Exception):
    def __init__(self) -> None:
        self.message = "This email does not exists!"
        super().__init__(self.message)
