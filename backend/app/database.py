from pymongo import MongoClient

client = None


def connect_to_db():
    global client
    client = MongoClient("mongodb://localhost:27017")


def close_db_connection():
    global client
    if client is not None:
        client.close()


def get_db():
    global client
    if client is None:
        connect_to_db()
    return client["cat_db"]
