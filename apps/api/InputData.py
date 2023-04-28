from pydantic import BaseModel
class UserData(BaseModel):
    """
    Class to receive the parameters from the api post
    """
    place_holder1: int 
    place_holder2: str 
    place_holder3: str 
    place_holder4: str

class ModelInputData(BaseModel):
    partida_dia: int
    partida_mes: int
    partida_ano: int
    volta_dia: int
    volta_mes: int
    volta_ano: int
    temperatura: int
    local: str

class ModelOutputData(BaseModel):
    casaco:int
    calca:int
    blusa:int
    roupa_intima:int
    passaporte:int
    carteira:int
    toalha:int
    escova_de_dentes:int
