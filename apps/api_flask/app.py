from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pandas as pd

userdb = "teste"
passworddb = "teste"
ip = "3.208.119.152:5432"
url_connection = f'postgresql://{userdb}:{passworddb}@{ip}/bag'
engine = create_engine(url_connection, echo=True)

DEVELOPMENT_ENV = True

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app_data = {
    "name": "Peter's Starter Template for a Flask Web App",
    "description": "A basic Flask app using bootstrap for layout",
    "author": "Peter Simeth",
    "html_title": "Peter's Starter Template for a Flask Web App",
    "project_name": "Starter Template",
    "keywords": "flask, webapp, template, basic",
}

@app.route("/")
def index():
    df = pd.read_sql("SELECT * FROM usuario", engine)
    return jsonify(df.to_dict("records"))

@app.route("/login/<user>/<pwd>")
def login(user, pwd):
    input_ = {'username':user, 'password':pwd}

    df = pd.read_sql("SELECT * FROM usuario", engine)
    df = df[(df['username']==input_['username']) & (df['password']==input_['password'])]


    if not df.empty:
        id_usuario = df['id_usuario'].iloc[0]
        return str(id_usuario)
    return "0"

@app.route("/register/<user>/<pwd>")
def register(user, pwd):
    input_ = {'username':user, 'password':pwd}

    ### Check se o usuario já está cadastrado
    df = pd.read_sql("SELECT * FROM usuario", engine)
    already_registered = not df[(df['username']==input_['username'])].empty

    if already_registered:
        return "0"
    
    ### Cadastra novo user
    conn = engine.connect()
    conn.execute(text(
        f"""
        INSERT INTO usuario (username, password)
        VALUES ('{input_['username']}', '{input_['password']}');
        """
    ))
    conn.commit()
    id_usuario = pd.read_sql(f"SELECT id_usuario FROM usuario where username = '{input_['username']}'", engine)
    id_usuario = id_usuario['id_usuario'].iloc[0]
    conn.close()

    print(id_usuario)

    return str(id_usuario)

@app.route("/nova_viagem", methods=['POST'])
def nova_viagem():
    def add_left_zero(x):
        x = str(x)
        if len(x) == 1:
            x = f'0{x}'
        return x

    data = request.json

    new_row = {
        "id_usuario": data['user_id'],
        "dt_partida": f"'{data['partida']['ano']}-{add_left_zero(data['partida']['mes'])}-{add_left_zero(data['partida']['dia'])}'", 
        "dt_volta":  f"'{data['volta']['ano']}-{add_left_zero(data['volta']['mes'])}-{add_left_zero(data['volta']['dia'])}'",
        "nm_temperatura": f"'{data['temperatura']}'", 
        "nm_local_destino": f"'{data['local']}'", 
        'has_festa': str('festa' in data['vestimentas']).lower(),
        'has_trabalho': str('trabalho' in data['vestimentas']).lower(),
        'has_piscina': str('piscina' in data['vestimentas']).lower(),
        'has_esporte': str('esporte' in data['vestimentas']).lower(),
        'has_maquina_lavar': str('maquina_lavar' in data['outros']).lower(),
    }

    ### Cadastra novo user
    keys = new_row.keys()
    query = f"""
        INSERT INTO viagem ({' , '.join(keys)})
        VALUES ({' , '.join([str(v) for k, v in new_row.items()])});
    """
    conn = engine.connect()
    conn.execute(text(
        query
    ))
    conn.commit()
    conn.close()

    print(query)

    return '1'

if __name__ == "__main__":
    app.run(debug=DEVELOPMENT_ENV)