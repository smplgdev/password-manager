from typing import Annotated

from fastapi import APIRouter, Depends

from app.models import User
from app.dependencies import get_current_user
from app.schemas.users import UserResponse

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_user)],
):
    return current_user
