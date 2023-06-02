import React, { Children, useRef } from "react";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import Globals from "../Globals"


function DaysCounter({id, nomeViagem, dias}){
    const navigate = useNavigate()

    return(
        <div 
            id='home-daysleft'
            className='home-div'
            onClick={() => {
                navigate('/historico/'+id+'/'+encodeURIComponent(nomeViagem))
                // console.log('/historico/'+id+'/'+encodeURIComponent(nomeViagem))
            }}
        >
            <div id="home-daysleft-title-div">
                <span>{nomeViagem}</span>
            </div>
            <div id="home-daysleft-circle">
                <div id="home-daysleft-inner-circle">
                    <span id='home-daysleft-dias'>
                        {dias}
                    </span>
                    <br/>
                    <span id='home-daysleft-dias-text'>
                        Dias
                    </span>
                </div>
            </div>
        </div>
    )
}

function Home() {

    useEffect(() => {
        fetch('http://localhost:5000/home/'+Globals.USER_ID)
        .then(response => response.json())
        .then(json => {
            // console.log(json)
            setViagens(json[0])
        });
    }, [])

    const [viagens, setViagens] = useState(null)
    // [ // Será substituido por um request na API
    //     {
    //         id: 0,
    //         nome: 'Orlando - Negócios',
    //         dias: 3
    //     },
    //     {
    //         id: 1,
    //         nome: 'Praia Grande (Férias)',
    //         dias: 52
    //     },
    //     {
    //         id: 2,
    //         nome: 'Visitar Avó',
    //         dias: 177
    //     },
    // ]

    const navigate = useNavigate();

    return (
        <>
            <div className="top-title main-gradient">Home</div>
            <div id='main-home'>
                <div className='home-welcome-div'>
                    <span className="home-welcome-text">Olá, convidado</span>
                </div>
                { viagens !== null &&
                    viagens.map((viagem) => {
                        return(
                            <DaysCounter
                                key={viagem.id}
                                id={viagem.id}
                                nomeViagem={viagem.nome}
                                dias={viagem.dias}
                            />
                        )
                    })
                }
            </div>
        </>
    );
  }

export default Home;