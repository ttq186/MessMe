class ContactAlreadyExist(Exception):
    def __init__(self) -> None:
        self.message = "This contact already exists"
        super().__init__(self.message)


class ContactWaitForAccepting(Exception):
    def __init__(self) -> None:
        self.message = "This contact is wating for your partner to accept!"
        super().__init__(self.message)
