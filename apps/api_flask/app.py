from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pandas as pd
from math import ceil

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

def generate_recomendation(data):

    def round_items(x):
        x = {k:ceil(v) for k,v in x.items()}
        return x

    def remove_empty(x):
        x = {k:v for k,v in x.items() if v > 0}
        return x

    items = {}

    # Coeficiente de frio
    # Define a quantidade de casacos como % da
    # quantidade de blusas
    C_FRIO_DICT = {
        'muito frio': .4,
        'frio': .2,
        'fresco': .05,
        'equilibrado': .01,
        'quente': 0,
        'muito quente': 0,
    }
    c_frio = C_FRIO_DICT[data['nm_temperatura']]

    # Coeficiente de calor
    # Define a quantidade de regatas e shorst como % da
    # quantidade de blusas
    C_CALOR_REGATA_DICT = {
        'muito frio': 0,
        'frio': 0,
        'fresco': 0,
        'equilibrado': .1,
        'quente': .25,
        'muito quente': .5,
    }
    C_CALOR_SHORTS_DICT = {
        'muito frio': 0,
        'frio': 0,
        'fresco': 0,
        'equilibrado': .4,
        'quente': .6,
        'muito quente': .9,
    }
    c_calor_regata = C_CALOR_REGATA_DICT[data['nm_temperatura']]
    c_calor_shorts= C_CALOR_SHORTS_DICT[data['nm_temperatura']]

    # Get quantidade de dias viajados
    qtt_dias = (data['dt_volta'] - data['dt_partida']).days
    real_qtt_dias = qtt_dias
    # Limite de 9 dias, caso haja maquina de lavar
    if data['has_maquina_lavar'] and qtt_dias > 9:
        qtt_dias = 9



    # % dos dias que será tido como total de blusas
    c_blusas = 1.5
    items['blusa'] = qtt_dias * c_blusas
    # % dos dias que será tido como total de roupas intimas
    c_r_intimas = 2
    items["roupa intima"] = qtt_dias * c_r_intimas
    # Calcula qtt calcas
    c_calca = .7
    items['calca'] = qtt_dias * c_calca
    # Calcula qtt sapatos
    c_sapatos = .18
    items['sapatos'] = qtt_dias * c_sapatos
    # Calcula qtt casacos
    items['casaco'] = qtt_dias * c_frio
    # Calcula qtt regatas
    items['regata'] = items['blusa'] * c_calor_regata
    items['blusa'] = items['blusa'] - items['regata']
    # Calcula qtt shorts
    items['shorts'] = items['calca'] * c_calor_shorts
    items['calca']  = items['calca']  - items['shorts']

    # Arredonda valores decimais (ceil)
    items = round_items(items)

    # Setup conteudos obrigatorios
    items["carregador de celular"] = 1
    items["escova de dentes"] = 1
    items["fone"] = 1
    items["passaporte"] = 1
    items["carteira"] = 1

    # Add condicionais de local
    if data['nm_local_destino'] == 'praia':
        c_toalha_praia = .8
        items["toalha"] = qtt_dias * c_toalha_praia
        c_roupa_banho_praia = .8
        items["roupa de banho"] = qtt_dias * c_roupa_banho_praia
        c_chinelo = .15
        items["chinelo"] = qtt_dias * c_chinelo

    if data['nm_local_destino'] == 'natureza':
        items["carregador de celular"] = 0
        items["fone"] = 0

    if data['nm_local_destino'] == 'navio':
        c_roupa_banho_praia = .3
        items["roupa de banho"] = qtt_dias * c_roupa_banho_praia
        c_chinelo = .15
        items["chinelo"] = qtt_dias * c_chinelo

    # Add condicionais de vestimenta
    if data['has_piscina']:
        if 'toalha' not in items:
            c_toalha_piscina = .3
            items["toalha"] = qtt_dias * c_toalha_piscina
        if 'roupa de banho' not in items:
            c_roupa_banho_praia = .4
            items["roupa de banho"] = qtt_dias * c_roupa_banho_praia
        if 'chinelo' not in items:
            c_chinelo = .05
            items["chinelo"] = qtt_dias * c_chinelo

    # Add minimo de calças, caso seja uma viagem a trabalho
    if data['has_trabalho'] or data['has_festa']:
        c_calca_trabalho = .6
        min_calca = qtt_dias * c_calca_trabalho
        if 'calca' in items and items['calca'] < min_calca:
            items['calca'] = min_calca

    # Add minimo de calças, caso seja uma viagem a trabalho
    if data['has_esporte']:
        c_shorts_esportes = .4
        min_shorts = qtt_dias * c_shorts_esportes
        if 'shorts' in items and items['shorts'] < min_shorts:
            items['shorts'] = min_shorts

    # Tratamentos finais
    items = round_items(items)
    items = remove_empty(items)

    return items

@app.route("/nova_viagem", methods=['POST'])
def nova_viagem():
    def add_left_zero(x):
        x = str(x)
        if len(x) == 1:
            x = f'0{x}'
        return x

    data = request.json

    new_row = {
        "nm_viagem": data['titulo'],
        "id_usuario": data['user_id'],
        "dt_partida": pd.to_datetime(f"{data['partida']['ano']}-{add_left_zero(data['partida']['mes'])}-{add_left_zero(data['partida']['dia'])}"), 
        "dt_volta":  pd.to_datetime(f"{data['volta']['ano']}-{add_left_zero(data['volta']['mes'])}-{add_left_zero(data['volta']['dia'])}"),
        "nm_temperatura": f"{data['temperatura']}", 
        "nm_local_destino": f"{data['local']}", 
        'has_festa': 'festa' in data['vestimentas'],
        'has_trabalho': 'trabalho' in data['vestimentas'],
        'has_piscina': 'piscina' in data['vestimentas'],
        'has_esporte': 'esporte' in data['vestimentas'],
        'has_maquina_lavar': 'maquina_lavar' in data['outros'],
    }
    recomendation = generate_recomendation(new_row)
    print(recomendation)

    new_row = {
        "nm_viagem": f"'{new_row['nm_viagem']}'",
        "id_usuario": new_row['id_usuario'],
        "dt_partida": f"'{new_row['dt_partida'].strftime(format='%Y-%m-%d')}'", 
        "dt_volta":  f"'{new_row['dt_volta'].strftime(format='%Y-%m-%d')}'",
        "nm_temperatura": f"'{new_row['nm_temperatura']}'", 
        "nm_local_destino": f"'{new_row['nm_local_destino']}'", 
        'has_festa': str(new_row['has_festa']).lower(),
        'has_trabalho': str(new_row['has_trabalho']).lower(),
        'has_piscina': str(new_row['has_piscina']).lower(),
        'has_esporte': str(new_row['has_esporte']).lower(),
        'has_maquina_lavar': str(new_row['has_maquina_lavar']).lower(),
    }


    ### Cadastra nova viagem
    conn = engine.connect()
    keys = new_row.keys()
    query = f"""
        INSERT INTO viagem ({' , '.join(keys)})
        VALUES ({' , '.join([str(v) for k, v in new_row.items()])});
    """
    conn.execute(text(query))
    conn.commit()
    conn.close()

    query = f"""
        SELECT max(id_viagem) as id_viagem FROM viagem 
        WHERE id_usuario = {new_row['id_usuario']}
        AND nm_local_destino = {new_row['nm_local_destino']}
    """
    id_viagem = pd.read_sql(query, engine)['id_viagem'].iloc[0]

    print(query)

    ### Cadastra nova mala
    conn = engine.connect()
    keys = new_row.keys()
    rows = [f"({id_viagem}, '{k}', {v})" for k,v in recomendation.items()]
    query = f"""
        INSERT INTO mala (id_viagem, nm_item, vl_quantidade)
        VALUES
        {",".join(rows)};
    """
    conn.execute(text(query))
    conn.commit()
    conn.close()

    return str(id_viagem)

@app.route("/mala_json/<id_viagem>")
def get_mala_json(id_viagem):
    df = pd.read_sql(f"SELECT nm_item, vl_quantidade FROM mala WHERE id_viagem = {id_viagem}", engine)
    df.columns = ['item_id', 'qtd']
    json_ = df.to_dict('records')

    return jsonify(json_)

@app.route("/historico/<user_id>")
def historico(user_id):
    df = pd.read_sql(f"SELECT id_viagem, nm_viagem, dt_partida, dt_volta FROM viagem WHERE id_usuario = {user_id} ORDER BY dt_partida", engine)
    
    now = pd.to_datetime('today')

    df['dt_volta'] = pd.to_datetime(df['dt_volta'])

    historico = df[df['dt_volta'] < now]
    active = df[~(df['dt_volta'] < now)]

    historico = historico[['id_viagem', 'nm_viagem']].to_dict('records')
    active = active[['id_viagem', 'nm_viagem']].to_dict('records')

    return jsonify([{
        'historico':historico,
        'active':active
    }])

@app.route("/home/<user_id>")
def home(user_id):
    df = pd.read_sql(f"SELECT id_viagem, nm_viagem, dt_partida FROM viagem WHERE id_usuario = {user_id} ORDER BY dt_partida", engine)
    
    now = pd.to_datetime('today')

    df['dt_partida'] = pd.to_datetime(df['dt_partida'])

    df = df[(df['dt_partida'] >= now)]
    df['dias'] = df.apply(lambda x: (x['dt_partida'] - now).days, axis=1)

    df = df[['id_viagem', 'nm_viagem', 'dias']]
    df.columns = ['id', 'nome', 'dias']
    df = df.to_dict('records')

    return jsonify([df])

@app.route("/save_mala", methods=['POST'])
def save_mala():
    data = request.json

    conn = engine.connect()
    conn.execute(text(
        f"""
        DELETE FROM mala WHERE id_viagem = {data["id_viagem"]}
         """
    ))
    rows = [f"({data['id_viagem']}, '{x['item_id']}', {x['qtd']})" for x in data["data"]]
    conn.execute(text(
        f"""
        INSERT INTO mala (id_viagem, nm_item, vl_quantidade)
        VALUES
        {",".join(rows)};
         """
    ))
    conn.commit()
    conn.close()
    return '1'

if __name__ == "__main__":
    app.run(debug=DEVELOPMENT_ENV)