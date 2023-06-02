import React, { Children, useRef } from "react";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import Arrow from '../component/icons/Arrow.js'

import Globals from "../Globals"

function ButtonMala({nomeViagem, id_viagem}){
    const navigate = useNavigate()

    return(
        <div
            className="mala-question"
            onClick={() => navigate('/historico/'+id_viagem+'/'+encodeURIComponent(nomeViagem))}
        >
            <div>{nomeViagem}</div>
        </div>
        
    )
}

function Historico() {

    const [showHistorico, setShowHistorico] = useState(false)
    const [viagens, setViagens] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5000/historico/'+Globals.USER_ID)
        .then(response => response.json())
        .then(json => {
            setViagens(json[0])
        });
    }, [])

    return (
        <>
            <div className="top-title main-gradient">Viagens cadastradas</div>
            <div id='main-historico'> 
                { viagens != null ?
                <>
                    <div className="mala-question-title">Ativas</div>
                        {viagens.active.map((viagem) => {
                            return(
                                <ButtonMala
                                    nomeViagem={viagem.nm_viagem}
                                    id_viagem={viagem.id_viagem}
                                /> 
                            )
                        })}
                                                   
                    <div
                        className="mala-question-title"
                        style={{marginTop: '15px'}}
                        onClick={() => setShowHistorico(!showHistorico)}
                    >
                        <span style={{verticalAlign:'top'}}>Historico</span>
                        <Arrow style={{transition: '.5s', transform:showHistorico && 'rotate(90deg)', height:'38px', width:'38px'}}/>
                    </div>
                    { showHistorico &&
                    <>
                        {viagens.historico.map((viagem) => {
                            return(
                                <ButtonMala
                                    nomeViagem={viagem.nm_viagem}
                                    id_viagem={viagem.id_viagem}
                                /> 
                            )
                        })}
                    </>
                    }
                </>
                :
                <>
                    <div className="mala-question-title">Carregando</div>
                </>
                }               
            </div>
        </>
         
    );
  }

export default Historico;