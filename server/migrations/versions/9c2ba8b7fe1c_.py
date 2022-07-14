"""empty message

Revision ID: 9c2ba8b7fe1c
Revises: 
Create Date: 2022-07-10 12:31:04.324524

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9c2ba8b7fe1c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=True),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('avatar_url', sa.String(), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('phone_number', sa.String(length=15), nullable=True),
    sa.Column('is_female', sa.Boolean(), nullable=True),
    sa.Column('date_of_birth', sa.Date(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('has_confirmed_email', sa.Boolean(), nullable=True),
    sa.Column('is_admin', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_table('attachment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=True),
    sa.Column('file_type', sa.Enum('IMAGE', 'AUDIO', 'VIDEO', 'COMPRESS', name='filetypeenum'), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_attachment_user_id'), 'attachment', ['user_id'], unique=False)
    op.create_table('contact',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('requester_id', sa.String(), nullable=True),
    sa.Column('accepter_id', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('invitation_message', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['accepter_id'], ['user.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['requester_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_contact_accepter_id'), 'contact', ['accepter_id'], unique=False)
    op.create_index(op.f('ix_contact_requester_id'), 'contact', ['requester_id'], unique=False)
    op.create_table('conversation',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_conversation_user_id'), 'conversation', ['user_id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_conversation_user_id'), table_name='conversation')
    op.drop_table('conversation')
    op.drop_index(op.f('ix_contact_requester_id'), table_name='contact')
    op.drop_index(op.f('ix_contact_accepter_id'), table_name='contact')
    op.drop_table('contact')
    op.drop_index(op.f('ix_attachment_user_id'), table_name='attachment')
    op.drop_table('attachment')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    # ### end Alembic commands ###