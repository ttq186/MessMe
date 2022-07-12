from sqlalchemy.ext.declarative import as_declarative


@as_declarative()
class Base:
    def to_dict(self, exclude_unset: bool = False, exclude: list = []) -> dict:
        if exclude_unset:
            return dict(
                [
                    (key, getattr(self, key))
                    for key in self.__dict__.keys()
                    if not key.startswith("_")
                    and getattr(self, key) is not None
                    and key not in exclude
                ]
            )
        return dict(
            [
                (key, getattr(self, key))
                for key in self.__dict__.keys()
                if not key.startswith("_") and key not in exclude
            ]
        )
