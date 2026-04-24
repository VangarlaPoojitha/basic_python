from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Backend.schemas import User, UserCreate
from Backend.database import users_db

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "FastAPI Backend Running"}

@app.get("/users", response_model=list[User])
def get_users():
    return users_db

@app.post("/users", response_model=User)
def create_user(user: UserCreate):
    new_user = {
        "id": len(users_db) + 1,
        "name": user.name,
        "email": user.email
    }
    users_db.append(new_user)
    return new_user