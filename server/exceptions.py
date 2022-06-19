class NotAuthorized(Exception):
    def __init__(self) -> None:
        self.message = "You don't have this privilege!"
        super().__init__(self.message)


class NotAuthenticated(Exception):
    def __init__(self) -> None:
        self.message = "Not authenticated!"
        super().__init__(self.message)


class InvalidLoginCredentials(Exception):
    def __init__(self) -> None:
        self.message = "Incorrect email or password. Try again!"
        super().__init__(self.message)


class ResourceNotFound(Exception):
    def __init__(self, resource_type: str, id: str | int) -> None:
        self.message = f"{resource_type} with id {id} does not exist!"
        super().__init__(self.message)


class EmailAlreadyExists(Exception):
    def __init__(self) -> None:
        self.message = "This email already exists!"
        super().__init__(self.message)


class EmailDoesNotExist(Exception):
    def __init__(self) -> None:
        self.message = "This email does not exists!"
        super().__init__(self.message)
