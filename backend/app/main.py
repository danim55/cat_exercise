import os

import uvicorn
from fastapi import FastAPI

from app.database import connect_to_db, close_db_connection
from app.routes import cat

app = FastAPI()


@app.on_event("startup")
async def startup_db_client():
    connect_to_db()


@app.on_event("shutdown")
async def shutdown_db_client():
    close_db_connection()


app.include_router(cat.router)


# Start server function
def start_server():
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get('WEB_SERVER_PORT', 8000)))


if __name__ == "__main__":
    start_server()
