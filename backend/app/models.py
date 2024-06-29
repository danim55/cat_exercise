from datetime import datetime, date

from pymongo.database import Database


class Cat:
    def __init__(self, db: Database):
        self.collection = db["cats"]

    def create_cat(self, cat_data):
        return self.collection.insert_one(cat_data)

    def get_all_cats(self):
        return list(self.collection.find({}, {"_id": 0}))

    def get_cat(self, name):
        return self.collection.find_one({"name": name}, {"_id": 0})

    def update_cat(self, name, cat_data):
        return self.collection.update_one({"name": name}, {"$set": cat_data})

    def delete_cat(self, name):
        return self.collection.delete_one({"name": name})
