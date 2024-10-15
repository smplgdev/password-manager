from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config_reader import config
from app.routers import router as api_router

APP_OBJ = FastAPI(root_path=config.api_path)

APP_OBJ.add_middleware(
    CORSMiddleware,  # type: ignore
    allow_origins=config.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

APP_OBJ.include_router(api_router)


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(APP_OBJ, host='localhost', port=8000)
