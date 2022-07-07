"""empty message

Revision ID: d011fa931517
Revises: dac403ef982a
Create Date: 2022-07-07 10:38:10.576334

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd011fa931517'
down_revision = 'dac403ef982a'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('contact', sa.Column('last_message_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('contact', 'last_message_at')
    # ### end Alembic commands ###
