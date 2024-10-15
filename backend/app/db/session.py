from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from app.config_reader import config

engine = create_async_engine(config.db_url.unicode_string())

Session = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)


async def get_db():
    db = Session()

    try:
        yield db
    finally:
        await db.close()
