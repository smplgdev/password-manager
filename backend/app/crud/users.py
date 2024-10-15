from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import User
from app.schemas.users import UserCreate
from app.security import hash_password


async def create_user(db: AsyncSession, user: UserCreate) -> User:
    existing_user = await get_user_by_email(db, user.email)
    if existing_user:
        raise ValueError(f"User with e-mail {user.email} already exists")
    password_hash = hash_password(user.password)
    user_db = User(email=user.email, password_hash=password_hash)
    db.add(user_db)
    await db.commit()
    await db.refresh(user_db)
    return user_db


async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    stmt = (
        select(User).
        where(User.email == email)  # type: ignore
    )

    result = await db.execute(stmt)
    return result.scalar_one_or_none()
