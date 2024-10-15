from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt import InvalidTokenError

from app.config_reader import config
from app.crud.users import get_user_by_email
from app.db.session import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{config.api_path}/auth/token")


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db=Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, config.auth_secret_key.get_secret_value(), algorithms=[config.auth_algorithm])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception
    user = await get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception
    return user
