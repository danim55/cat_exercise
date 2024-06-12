import os
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI

from app.database import connect_to_db, close_db_connection
from app.routes import cat

app = FastAPI()


@asynccontextmanager
async def lifespan():
    # Connect to the database before the app starts
    connect_to_db()
    yield
    # Close the database after the app finishes
    close_db_connection()


app.include_router(cat.router)


# Start server function
def start_server():
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get('WEB_SERVER_PORT', 8000)))


if __name__ == "__main__":
    start_server()
