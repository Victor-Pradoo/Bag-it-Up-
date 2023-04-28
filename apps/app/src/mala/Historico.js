import React, { Children, useRef } from "react";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import Arrow from '../component/Arrow.js'

function ButtonMala({nomeViagem}){
    const navigate = useNavigate()

    return(
        <div
            className="mala-question"
            onClick={() => navigate('/historico/'+encodeURIComponent(nomeViagem))}
        >
            <div>{nomeViagem}</div>
        </div>
        
    )
}

function Historico() {

    const [showHistorico, setShowHistorico] = useState(false)

    return (
        <>
            <div className="top-title main-gradient">Viagens cadastradas</div>
            <div id='main-historico'> 
                <div className="mala-question-title">Ativas</div>
                    <ButtonMala
                        nomeViagem={'Orlando - Negócios'}
                    />                
                    <ButtonMala
                        nomeViagem={'Praia Grande (Férias)'}
                    />                
                    <ButtonMala
                        nomeViagem={'Visitar Avó'}
                    />                
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
                        <ButtonMala
                            nomeViagem={'Vancouver'}
                            />                
                        <ButtonMala
                            nomeViagem={'VCT LOCK//IN (SP)'}
                            />                
                        <ButtonMala
                            nomeViagem={'Copa - Qatar'}
                            />                
                        <ButtonMala
                            nomeViagem={'México'}
                            />                
                        <ButtonMala
                            nomeViagem={'Paraty - RJ'}
                            />                
                        <ButtonMala
                            nomeViagem={'Ibiza'}
                            />
                    </>
                    }                
            </div>
        </>
         
    );
  }

export default Historico;