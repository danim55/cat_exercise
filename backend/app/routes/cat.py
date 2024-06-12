from fastapi import APIRouter, HTTPException, Depends

from app.database import get_db
from app.models import Cat
from app.schemas import CatSchema

router = APIRouter()


def get_cat_model():
    db = get_db()
    return Cat(db)


@router.post("/cats")
def create_cat(cat: CatSchema, cat_model: Cat = Depends(get_cat_model)):
    cat_model.create_cat(cat.dict())
    return {"message": "Cat created successfully"}


@router.get("/cats")
def get_all_cats(cat_model: Cat = Depends(get_cat_model)):
    return cat_model.get_all_cats()


@router.get("/cats/{name}")
def get_cat(name: str, cat_model: Cat = Depends(get_cat_model)):
    cat = cat_model.get_cat(name)
    if cat is None:
        raise HTTPException(status_code=404, detail="Cat not found")
    return cat


@router.put("/cats/{name}")
def update_cat(name: str, cat: CatSchema, cat_model: Cat = Depends(get_cat_model)):
    updated_cat = cat_model.update_cat(name, cat.dict())
    if updated_cat.modified_count == 0:
        raise HTTPException(status_code=404, detail="Cat not found")
    return {"message": "Cat updated successfully"}


@router.delete("/cats/{name}")
def delete_cat(name: str, cat_model: Cat = Depends(get_cat_model)):
    deleted_cat = cat_model.delete_cat(name)
    if deleted_cat.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cat not found")
    return {"message": "Cat deleted successfully"}
