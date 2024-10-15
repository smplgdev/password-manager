import base64

from pydantic import PostgresDsn, Field, SecretStr
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    origins: list[str]

    auth_secret_key: SecretStr
    auth_algorithm: str
    auth_access_token_expire_minutes: int

    db_url: PostgresDsn = Field(alias="POSTGRES_URL")

    api_path: str = "/api/v1"

    passwords_encryption_key_base64: str

    class Config:
        env_file = ".env"
        extra = "allow"


config = Settings()
config.passwords_encryption_key_bytes = base64.b64decode(config.passwords_encryption_key_base64)
