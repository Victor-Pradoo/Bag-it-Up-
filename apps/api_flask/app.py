from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from flask import Flask, render_template, jsonify
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

if __name__ == "__main__":
    app.run(debug=DEVELOPMENT_ENV)
