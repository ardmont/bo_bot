"""empty message

Revision ID: f45072944138
Revises: 585dda3074e3
Create Date: 2017-06-11 10:23:37.753634

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f45072944138'
down_revision = '585dda3074e3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tb_ocorrencias', sa.Column('descricao', sa.String(length=255), nullable=True))
    op.add_column('tb_ocorrencias', sa.Column('motivo', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tb_ocorrencias', 'motivo')
    op.drop_column('tb_ocorrencias', 'descricao')
    # ### end Alembic commands ###
