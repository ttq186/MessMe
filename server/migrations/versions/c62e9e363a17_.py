"""empty message

Revision ID: c62e9e363a17
Revises: 9c2ba8b7fe1c
Create Date: 2022-07-14 09:46:48.746727

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = 'c62e9e363a17'
down_revision = '9c2ba8b7fe1c'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('contact', sa.Column('is_established', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('contact', 'is_established')
    # ### end Alembic commands ###
