from sqlalchemy import create_engine, Table, Column, Integer, Float, String, Date, MetaData, ForeignKey
from sqlalchemy.orm import sessionmaker
from flask import Flask, render_template, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd

userdb = "teste"
passworddb = "teste"
ip = "34.228.167.153:5432"
url_connection = f'postgresql://{userdb}:{passworddb}@{ip}/bag'

engine = create_engine('postgresql://teste:teste@3.208.119.152:5432/bag', echo=True)

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
        return "1"
    return "0"

if __name__ == "__main__":
    app.run(debug=DEVELOPMENT_ENV)