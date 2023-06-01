import React, { Children, useRef } from "react";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Globals from "../Globals"

function DateSelect({onValidInput}){
    const dias = Array.from(Array(31), (_, index) => index + 1);
    const meses = Array.from(Array(12), (_, index) => index + 1);
    const anos = Array.from(Array(20), (_, index) => index + 2023); // Ta harcoded o ano inicial

    const [data, setData] = useState(
        {
            dia:null,
            mes:null,
            ano:null,
        }
    )

    function onChange(e, key){
        var val = e.target.value
        data[key] = val
        setData({...data})

        if(data.dia != null
           && data.mes != null
           && data.ano != null){
            onValidInput(data)
        }
    }

    return(
        <>
        <select
            className="mala-input mala-date-input"
            style={{marginLeft:'0'}}
            onChange={(e) => onChange(e, 'dia')}
        > {/* Sim, é possível selecionar dia 31 de fevereiro... */}
            <option disabled selected value={-1}>Dia</option>
            {dias.map((dia, idx) => {
                return(
                    <option key={dia}>{dia}</option>
                    )
                })}
        </select>
        <select
            className="mala-input mala-date-input"
            onChange={(e) => onChange(e, 'mes')}
        > {/* Sim, é possível selecionar dia 31 de fevereiro... */}
            <option disabled selected value={-1}>Mês</option>
            {meses.map((mes, idx) => {
                return(
                    <option key={mes}>{mes}</option>
                    )
                })}
        </select>
        <select
            className="mala-input mala-date-input"
            onChange={(e) => onChange(e, 'ano')}
        > {/* Sim, é possível selecionar dia 31 de fevereiro... */}
            <option disabled selected value={-1}>Ano</option>
            {anos.map((ano, idx) => {
                return(
                    <option key={ano}>{ano}</option>
                    )
                })}
        </select>
        </>
    )
}
function Checkbox({text, onChange}){
    return(
        <div style={{display: 'block'}}>
        <label className="mala-label">{text}</label>
            <input
                type={'checkbox'}
                className="mala-checkbox"
                style={{float:'right'}}   
                onChange={onChange}
                >                    
            </input>
        </div>
    )
}

function Create() {

    const navigate = useNavigate()
    const [inputedData, setInputedData] = useState(
        {
            user_id: Globals.USER_ID,
            partida: null,
            volta: null,
            temperatura: null,
            local: null,
            vestimentas: [],
            outros: [],
        }
    )

    function gerarMala(){
        console.log(inputedData)

        if (inputedData.partida === null
            || inputedData.volta === null
            || inputedData.temperatura === null
            || inputedData.local === null
        ){
            console.log('faltam itens!')
        } else {
            
            fetch('http://localhost:5000/nova_viagem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
            },
                body: JSON.stringify(inputedData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                navigate('/historico/Nova%20Viagem')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    return (
        <>
            <div className="top-title main-gradient">Cadastrar viagem</div>
            <div id='main-mala'> 
                <div className="mala-question-title">Sobre a sua viagem</div>
                <div className="mala-question">
                    <div>Partida</div>
                    <DateSelect
                        onValidInput={(obj) => {
                            inputedData.partida = obj
                            setInputedData({...inputedData})
                        }}
                    />
                    <div style={{marginTop: '8px'}}>Volta</div>
                    <DateSelect
                        onValidInput={(obj) => {
                            inputedData.volta = obj
                            setInputedData({...inputedData})
                        }}
                    />
                </div>
                <div className="mala-question">
                    <div>Temperatura</div>
                    <select
                        className="mala-input"
                        onChange={(e) => {
                            let val = e.target.value
                            inputedData.temperatura = val
                            setInputedData({...inputedData})
                        }}
                    >
                        <option disabled selected value={-1}>Selecione</option>
                        <option value={'muito frio'}>{'Muito Frio 5°C'}</option>
                        <option value={'frio'}>{'Frio 15°C'}</option>
                        <option value={'fresco'}>{'Fresco 20°C'}</option>
                        <option value={'equilibrado'}>{'Equilibrado 25°C'}</option>
                        <option value={'quente'}>{'Quente 30°C'}</option>
                        <option value={'muito quente'}>{'Muito Quente 35°C'}</option>
                    </select>
                </div>
                <div className="mala-question">
                    <div>Local</div>
                    <select
                        className="mala-input"
                        onChange={(e) => {
                            let val = e.target.value
                            inputedData.local = val
                            setInputedData({...inputedData})
                        }}
                    >
                        <option disabled selected value={-1}>Selecione</option>
                        <option value={'cidade'}>{'Cidade'}</option>
                        <option value={'navio'}>{'Navio'}</option>
                        <option value={'natureza'}>{'Natureza'}</option>
                        <option value={'praia'}>{'Praia'}</option>
                    </select>
                </div>
                <div className="mala-question">
                    <div>Vestimentas</div>
                    <Checkbox text='Festa'
                        onChange={(e) => {
                            if(e.target.checked){
                                inputedData.vestimentas.push('festa')
                            } else {
                                if(inputedData.vestimentas.includes('festa')){
                                    const index = inputedData.vestimentas.indexOf('festa');
                                    inputedData.vestimentas.splice(index, 1);
                                }
                            }
                            setInputedData({...inputedData})
                        }}
                    />
                    <Checkbox text='Trabalho'
                        onChange={(e) => {
                            if(e.target.checked){
                                inputedData.vestimentas.push('trabalho')
                            } else {
                                if(inputedData.vestimentas.includes('trabalho')){
                                    const index = inputedData.vestimentas.indexOf('trabalho');
                                    inputedData.vestimentas.splice(index, 1);
                                }
                            }
                            setInputedData({...inputedData})
                        }}
                    />
                    <Checkbox text='Piscina'
                        onChange={(e) => {
                            if(e.target.checked){
                                inputedData.vestimentas.push('piscina')
                            } else {
                                if(inputedData.vestimentas.includes('piscina')){
                                    const index = inputedData.vestimentas.indexOf('piscina');
                                    inputedData.vestimentas.splice(index, 1);
                                }
                            }
                            setInputedData({...inputedData})
                        }}
                    />
                    <Checkbox text='Esporte'
                        onChange={(e) => {
                            if(e.target.checked){
                                inputedData.vestimentas.push('esporte')
                            } else {
                                if(inputedData.vestimentas.includes('esporte')){
                                    const index = inputedData.vestimentas.indexOf('esporte');
                                    inputedData.vestimentas.splice(index, 1);
                                }
                            }
                            setInputedData({...inputedData})
                        }}
                    />
                </div>
                <div className="mala-question">
                    <div>Outros</div>
                    <Checkbox text='Maquina de lavar roupas'
                        onChange={(e) => {
                            if(e.target.checked){
                                inputedData.outros.push('maquina_lavar')
                            } else {
                                if(inputedData.outros.includes('maquina_lavar')){
                                    const index = inputedData.outros.indexOf('maquina_lavar');
                                    inputedData.outros.splice(index, 1);
                                }
                            }
                            setInputedData({...inputedData})
                        }}
                    />
                </div>
                <div className="mala-finish-button" onClick={() => gerarMala()}>Gerar mala</div>
            </div>
        </>
         
    );
  }

export default Create;