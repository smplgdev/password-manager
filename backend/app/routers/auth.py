from datetime import timezone, datetime, timedelta
from typing import Annotated

import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud import users as crud_users
from app.db.session import get_db
from app.schemas.users import UserCreate, UserResponse
from app.config_reader import config
from app.crud.users import get_user_by_email
from app.schemas.tokens import Token
from app.security import verify_password

router = APIRouter()


async def authenticate_user(db: AsyncSession, username: str, password: str):
    user = await get_user_by_email(db, username)
    if not user:
        return False
    if not verify_password(password, user.password_hash):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, config.auth_secret_key.get_secret_value(), algorithm=config.auth_algorithm)
    return encoded_jwt


@router.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db=Depends(get_db),
) -> Token:
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=config.auth_access_token_expire_minutes)
    access_token = create_access_token(
        data={
            "sub": user.email,
            "user_id": user.id,
        },
        expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@router.post("/register", response_model=UserResponse)
async def register_user(user: UserCreate, db=Depends(get_db)):
    try:
        user_db = await crud_users.create_user(db, user)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    return user_db
