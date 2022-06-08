from fastapi import FastAPI, Depends

from sqlalchemy.ext.asyncio import async_session
from api import deps


app = FastAPI(title="MessMe", version="1.0.0", root_path="")


@app.get("/")
async def home(session: async_session = Depends(deps.get_session)):
    return {"detail": "test"}
