from fastapi import APIRouter

from .auth import router as auth_router
from .users import router as users_router
from .passwords import router as passwords_router

router = APIRouter()

router.include_router(auth_router, prefix="/auth", tags=["auth"])
router.include_router(users_router, prefix="/users", tags=["users"])
router.include_router(passwords_router, prefix="/users/{user_id}/passwords", tags=["passwords"])
