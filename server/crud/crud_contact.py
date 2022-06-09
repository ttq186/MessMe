from .base import CRUDBase
from models import Contact
from schemas import ContactCreate, ContactUpdate


class CRUDContact(CRUDBase[Contact, ContactCreate, ContactUpdate]):
    pass


contact = CRUDContact(Contact)
