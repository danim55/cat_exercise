from datetime import datetime
from typing import List

from pydantic import BaseModel


class Vaccination(BaseModel):
    type: str
    date: datetime


class CatSchema(BaseModel):
    name: str
    age: int
    breed: str
    vaccinations: List[Vaccination]
    photo: str
