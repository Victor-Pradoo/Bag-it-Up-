from pydantic import BaseModel
class UserData(BaseModel):
    """
    Class to receive the parameters from the api post
    """
    place_holder1: int 
    place_holder2: str 
    place_holder3: str 
    place_holder4: str

class ModelData(BaseModel):
    place_holder1: int 
