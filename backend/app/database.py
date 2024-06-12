from typing import Optional

from pymongo import MongoClient
from pymongo.database import Database


class MongoDBClientManager:
    def __init__(self, uri: str, db_name: str):
        self.uri = uri
        self.db_name = db_name
        self.client: Optional[MongoClient] = None
        self.db: Optional[Database] = None

    def connect(self):
        if self.client is None:
            self.client = MongoClient(self.uri)
            self.db = self.client[self.db_name]

    def close(self):
        if self.client:
            self.client.close()
            self.client = None
            self.db = None

    def get_db(self) -> Database:
        if self.client is None:
            self.connect()
        return self.db


db_manager = MongoDBClientManager(uri="mongodb://localhost:27017", db_name="cat_db")
