from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_200_OK

from app.config_reader import config
from app.crud.passwords import get_user_passwords, create_password, delete_password
from app.db.session import get_db
from app.dependencies import get_current_user
from app.models import User
from app.schemas.passwords import PasswordResponse, PasswordCreate

router = APIRouter()


@router.get("", response_model=list[PasswordResponse])
async def read_user_passwords(
    current_user: Annotated[User, Depends(get_current_user)],
    user_id: int,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    if current_user.id != user_id:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "You can only read your own passwords")
    passwords_db = await get_user_passwords(db, user_id)
    response: list[PasswordResponse] = []
    for password in passwords_db:
        response.append(
            PasswordResponse(
                id=password.id,
                user_id=user_id,
                username=password.username,
                password=password.decrypt_password(config.passwords_encryption_key_bytes),
                website_name=password.website_name,
                comment=password.comment,
            )
        )
    return response


@router.post("", response_model=PasswordResponse)
async def create_user_password(
    current_user: Annotated[User, Depends(get_current_user)],
    user_id: int,
    db: Annotated[AsyncSession, Depends(get_db)],
    password: PasswordCreate,
):
    if current_user.id != user_id:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "You can only create passwords for yourself")
    try:
        password_db = await create_password(db, user_id, password)
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    return PasswordResponse(**password.dict(), id=password_db.id, user_id=user_id)


@router.delete("/{password_id}", status_code=HTTP_200_OK)
async def delete_user_password(
    current_user: Annotated[User, Depends(get_current_user)],
    user_id: int,
    password_id: int,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    if current_user.id != user_id:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "You can only delete your own passwords")
    password_db = await delete_password(db, password_id)
    if not password_db:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Password not found")
    return "Password was successfully deleted"
