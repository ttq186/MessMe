class InvalidLoginCredentials(Exception):
    def __init__(self) -> None:
        self.message = "Incorrect email or password. Try again!"
        super().__init__(self.message)


class InvalidGoogleCredentials(Exception):
    def __init__(self) -> None:
        self.message = "Could not validate your Google credentials. Try again!"
        super().__init__(self.message)


class AccountCreatedByGoogle(Exception):
    def __init__(self) -> None:
        self.message = (
            "Looks like this account has been created by "
            "Google sign in method. Try again!"
        )
        super().__init__(self.message)


class AccountCreatedWithoutGoogle(Exception):
    def __init__(self) -> None:
        self.message = (
            "Looks like an account has been created before without "
            "Google sign in method. Try again!"
        )
        super().__init__(self.message)


class TokenHasExpired(Exception):
    def __init__(self) -> None:
        self.message = "Token has expired!"
        super().__init__(self.message)
