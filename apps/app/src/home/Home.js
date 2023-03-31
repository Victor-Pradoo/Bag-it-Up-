import React, { Children, useRef } from "react";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";


function DateSelect(){
    const dias = Array.from(Array(31), (_, index) => index + 1);
    const meses = Array.from(Array(12), (_, index) => index + 1);
    const anos = Array.from(Array(20), (_, index) => index + 2023); // Ta harcoded o ano inicial

    return(
        <>
        <select className="home-input home-date-input" style={{marginLeft:'0'}}> {/* Sim, é possível selecionar dia 31 de fevereiro... */}
            <option disabled selected value={-1}>Dia</option>
            {dias.map((dia, idx) => {
                return(
                    <option key={dia}>{dia}</option>
                    )
                })}
        </select>
        <select className="home-input home-date-input"> {/* Sim, é possível selecionar dia 31 de fevereiro... */}
            <option disabled selected value={-1}>Mês</option>
            {meses.map((mes, idx) => {
                return(
                    <option key={mes}>{mes}</option>
                    )
                })}
        </select>
        <select className="home-input home-date-input"> {/* Sim, é possível selecionar dia 31 de fevereiro... */}
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
function Checkbox({text}){
    return(
        <div style={{display: 'block'}}>
        <label className="home-label">{text}</label>
            <input
                type={'checkbox'}
                className="home-checkbox"
                style={{float:'right'}}   
                >                    
            </input>
        </div>
    )
}

function Home() {

    const navigate = useNavigate()

    return (
        <>
            <div className="top-title main-gradient">Cadastrar viagem</div>
            <div id='main-home'> 
                <div className="home-question-title">Sobre a sua viagem</div>
                <div className="home-question">
                    <div>Partida</div>
                    <DateSelect/>
                    <div style={{marginTop: '8px'}}>Volta</div>
                    <DateSelect/>
                </div>
                <div className="home-question">
                    <div>Temperatura</div>
                    <select className="home-input">
                        <option disabled selected value={-1}>Selecione</option>
                        <option value={0}>{'Muito Frio 5°C'}</option>
                        <option value={1}>{'Frio 15°C'}</option>
                        <option value={2}>{'Fresco 20°C'}</option>
                        <option value={3}>{'Equilibrado 25°C'}</option>
                        <option value={4}>{'Quente 30°C'}</option>
                        <option value={5}>{'Muito 35°C'}</option>
                    </select>
                </div>
                <div className="home-question">
                    <div>Local</div>
                    <select className="home-input">
                        <option disabled selected value={-1}>Selecione</option>
                        <option value={0}>{'Cidade'}</option>
                        <option value={1}>{'Navio'}</option>
                        <option value={2}>{'Natureza'}</option>
                        <option value={3}>{'Praia'}</option>
                    </select>
                </div>
                <div className="home-question">
                    <div>Vestimentas</div>
                    <Checkbox text='Festa'/>
                    <Checkbox text='Trabalho'/>
                    <Checkbox text='Piscina'/>
                    <Checkbox text='Esporte'/>
                </div>
                <div className="home-question">
                    <div>Outros</div>
                    <Checkbox text='Maquina de lavar roupas'/>
                </div>
                <div className="home-finish-button" onClick={() => navigate('/historico/Nova%20Viagem')}>Gerar mala</div>
            </div>
        </>
         
    );
  }

export default Home;