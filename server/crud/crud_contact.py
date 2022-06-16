from .base import CRUDBase
from models import Contact as ContactModal
from schemas.contact import Contact as ContactSchema


class CRUDContact(CRUDBase[ContactModal, ContactSchema]):
    pass


contact = CRUDContact(ContactModal)
