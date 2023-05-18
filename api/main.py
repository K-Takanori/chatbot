from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

app = FastAPI()
load_dotenv()

origins = [
    os.getenv('HOST1'),
    os.getenv('HOST2'),
    os.getenv('HOST3'),
    os.getenv('HOST4'),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class matchKeyword():
    keyword1 = os.getenv('KEYWORD1')
    keyword2 = os.getenv('KEYWORD2')

@app.get("/{text}")
async def root(text):
    match text:
        case matchKeyword.keyword1:
            return {"response": os.getenv('RESPONSE1')}
        case matchKeyword.keyword2:
            return {"response": os.getenv('RESPONSE2')}
        case _:
            return {"response": "他のキーワードを入力してください"}

