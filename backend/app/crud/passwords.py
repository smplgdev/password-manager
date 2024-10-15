from typing import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Password
from app.schemas.passwords import PasswordCreate


async def get_user_passwords(db: AsyncSession, user_id: int) -> Sequence[Password]:
    stmt = (
        select(Password).
        where(Password.user_id == user_id).  # type: ignore
        order_by(Password.id)
    )

    result = await db.execute(stmt)
    return result.scalars().all()


async def create_password(db: AsyncSession, user_id: int, password: PasswordCreate) -> Password:
    password_db = Password(
        user_id=user_id,
        website_name=password.website_name,
        username=password.username,
        password=password.password,
        comment=password.comment,
    )
    db.add(password_db)
    await db.commit()
    await db.refresh(password_db)
    return password_db
