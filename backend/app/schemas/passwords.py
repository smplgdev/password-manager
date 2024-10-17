from pydantic import BaseModel


class PasswordBase(BaseModel):
    website_name: str
    username: str
    password: str
    comment: str | None = None


class PasswordCreate(PasswordBase):
    pass


class PasswordResponse(PasswordBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
