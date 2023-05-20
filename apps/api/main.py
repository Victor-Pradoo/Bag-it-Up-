from datetime import date
from fastapi import FastAPI, Request, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base

from InputData import UserData
from sqlalchemy.orm import sessionmaker
from typing import Dict
import sys
import json
from database_create import usuario_table, viagem_table, item_table, mala_table
from database_create import engine
from pydantic import BaseModel

from InputData import *
from random import randrange

class Usuario(BaseModel):
    id_usuario: int
    InSexo: str
    DtNascimento: date
    NmUsuario: str
    InFilhos: str
Base = declarative_base()

class UsuarioDB(Base):
    __tablename__ ='usuario'
    id_usuario = Column(Integer, primary_key=True)
    InSexo = Column(String)
    DtNascimento = Column(Date)
    NmUsuario = Column(String)
    InFilhos = Column(String)

Session = sessionmaker(bind=engine)

sys.path.append("/code/app/")

origins = [
    "http://localhost",
    "http://localhost:3000",
]

# 2. Create the app object
app = FastAPI(
      title="Bag It Up API",
      description="API for input user data and to make predictions",
      version="1.0")

# 3. Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# # 4. Index route, opens automatically on http://0.0.0.0:80
@app.get('/')
def index() -> Dict:
         """
         Endpoint padrao que nao faz nada
         """
         return {'message': 'O metodo get nao tem nenhuma informacao =c, va para o endpoint /user e use o metodo post enviar os dados'}

@app.post('/user')
def upload_userdata(data:UserData) -> None:
     """
     Nao ta definido ainda, to vendo oq essa funcao faz de verdade rsrs
      
     Parameters:
         data = user data
        
     """
     data = data.dict()
     return { 'Data' :  data}

@app.post('/model')
async def predict(data:ModelInputData) -> ModelOutputData:
    input = data.dict()
    output = {
        'casaco':0,
        'calca':0,
        'blusa':0,
        'roupa_intima':0,
        'passaporte':0,
        'carteira':0,
        'toalha':0,
        'escova_de_dentes':0
    }

    for k,v in output.items():
        if k=='passaporte':
            output[k] = randrange(0,2)
        else:
            output[k] = randrange(1,10)
    
    print(input)
    print(output)
    return output

@app.post('/viagem/save')
async def salvar_viagem(request: Request) -> Dict:
      data = await request.body()
      json_data = json.loads(data.decode('utf-8'))
      print(json_data)
      return {'message' : 'Viagem salva'}

@app.post('/users/save')
async def salvar_usuario(user: Usuario) -> Dict:
    usuario_instance = UsuarioDB(
        InSexo=user.InSexo,
        DtNascimento=user.DtNascimento,
        NmUsuario=user.NmUsuario,
        InFilhos=user.InFilhos
    )
    
    # Create a new session and add the usuario instance to it
    session = Session()
    session.add(usuario_instance)
    
    # Commit the changes and close the session
    session.commit()
    session.close()
    
    # Return a response indicating that the data was saved
    return {"message": "Data saved successfully"}

def convert_users_to_json(Users):
    result = []
    for row in Users:
        user = {
            "id": row[0],
            "inSexo": row[1],
            "DtNascimento": row[2].isoformat(),
            "NmUsuario": row[3],
            "inFilhos": row[4]
        }
        result.append(user)
    encoded_users = jsonable_encoder(result)
    return encoded_users

def convert_items_to_json(items):
    result = []
    for row in items:
        item = {
            "id": row[0],
            "inCategoria": row[1],
            "VlVolumeItem": row[2],
            "VlPeso": row[3],
            "NmItem": row[4]
        }
        result.append(item)
    encoded_items = jsonable_encoder(result)
    return encoded_items

def convert_viagens_to_json(viagens):
    result = []
    for row in viagens:
        viagem = {
            "id": row[0],
            "id_usuario": row[1],
            "NmLocalDestino": row[2],
            "DtInicioViagem": row[3].isoformat(),
            "DtFimViagem": row[4].isoformat(),
            "inMeioTransporte": row[5],
            "inTipoViagem": row[6]
        }
        result.append(viagem)
    encoded_viagens = jsonable_encoder(result)
    return encoded_viagens

@app.get("/users")
async def get_users():
    # create a new session and query the database
    session = Session()
    rows = session.query(usuario_table).all()
    session.close()
    # convert users list to a JSON-serializable format
    jsonUsers = convert_users_to_json(rows)
    return jsonUsers


@app.get("/items")
async def get_items():
    session = Session()
    rows = session.query(item_table).all()
    session.close()
    jsonItems = convert_items_to_json(rows)
    return jsonItems

@app.get("/viagens")
async def get_viagens(id_usuario: int):
    session = Session()
    rows = session.query(viagem_table).filter(viagem_table.c.id_usuario == id_usuario).all()
    session.close()
    jsonViagem = convert_viagens_to_json(rows)
    return jsonViagem
