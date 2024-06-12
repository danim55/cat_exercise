from fastapi import APIRouter, Depends, HTTPException
from pymongo.database import Database

from app.database import db_manager
from app.models import Cat
from app.schemas import CatSchema

router = APIRouter()


def get_db() -> Database:
    return db_manager.get_db()


@router.post("/cats")
async def create_cat(cat: CatSchema, db: Database = Depends(get_db)):
    cat_model = Cat(db)
    cat_model.create_cat(cat.dict())
    return {"message": "Cat created successfully"}


@router.get("/cats")
async def get_all_cats(db: Database = Depends(get_db)):
    cat_model = Cat(db)
    return cat_model.get_all_cats()


@router.get("/cats/{name}")
async def get_cat(name: str, db: Database = Depends(get_db)):
    cat_model = Cat(db)
    cat = cat_model.get_cat(name)
    if cat is None:
        raise HTTPException(status_code=404, detail="Cat not found")
    return cat


@router.put("/cats/{name}")
async def update_cat(name: str, cat: CatSchema, db: Database = Depends(get_db)):
    cat_model = Cat(db)
    updated_cat = cat_model.update_cat(name, cat.dict())
    if updated_cat.modified_count == 0:
        raise HTTPException(status_code=404, detail="Cat not found")
    return {"message": "Cat updated successfully"}


@router.delete("/cats/{name}")
async def delete_cat(name: str, db: Database = Depends(get_db)):
    cat_model = Cat(db)
    deleted_cat = cat_model.delete_cat(name)
    if deleted_cat.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cat not found")
    return {"message": "Cat deleted successfully"}
