import os
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI

from app.database import db_manager
from app.routes import cat

app = FastAPI()
app.include_router(cat.router)


@asynccontextmanager
async def lifespan():
    # Connect to the database before the app starts
    db_manager.connect()
    yield
    # Close the database after the app finishes
    db_manager.close()


# Start server function
def start_server():
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get('WEB_SERVER_PORT', 8000)))


if __name__ == "__main__":
    start_server()
