from models import User
from schemas import UserCreate, UserUpdate
from .base import CRUDBase


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    pass


user = CRUDUser(User)
