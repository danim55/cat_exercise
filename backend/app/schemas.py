from datetime import date
from typing import List

from pydantic import BaseModel


class Vaccination(BaseModel):
    type: str
    date: date


class CatSchema(BaseModel):
    name: str
    age: int
    breed: str
    vaccinations: List[Vaccination]
    photo: str
