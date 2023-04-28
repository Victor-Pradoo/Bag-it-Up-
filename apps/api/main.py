import sys
import json
sys.path.append("/code/app/")

# 1. Library imports
from typing import Dict
from fastapi import FastAPI, Request
from InputData import *
from random import randrange
from fastapi.middleware.cors import CORSMiddleware

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

      