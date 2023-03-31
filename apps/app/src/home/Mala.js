import React, { Children, useRef } from "react";
import {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Arrow from '../component/Arrow.js'
import Cross from '../component/Cross.js'

function ItemMala({item, qtd}){
    const [qtdItem, setQtdItem] = useState(qtd)

    return(
        <div>

            <Cross style={{height:'30px', width:'30px', marginRight:'10px'}}/>
            <div style={{display:'inline-block', verticalAlign:'top', position: 'relative', top:'3px', fontSize:'20px'}}>{item}</div>
            <div style={{float:'right'}}>
                <Arrow style={{height:'30px', width:'30px', transform:'rotate(90deg)', marginRight:'12px'}} onClick={() => setQtdItem(qtdItem -1)}/>
                <span style={{verticalAlign:'top', position: 'absolute', marginLeft:'-7px',display:'inline-block'}}>{qtdItem}</span>
                <Arrow style={{height:'30px', width:'30px', transform:'rotate(-90deg)', marginLeft:'27px'}} onClick={() => setQtdItem(qtdItem +1)}/>
            </div>
        </div>
    )
}

function Mala() {

    const navigate = useNavigate()
    const routeParams = useParams();

    return (
        <>
            <div className="top-title main-gradient">{routeParams.id_viagem}</div>
            <div id='main-mala'> 
                <div className="home-question-title">Items</div>
                <div className="home-question">
                    <ItemMala item='Casaco' qtd={1}/>
                    <ItemMala item='Calça' qtd={5}/>
                    <ItemMala item='Blusa' qtd={10}/>
                    <ItemMala item='Roupa íntima' qtd={11}/>
                    <ItemMala item='Passaporte' qtd={1}/>
                    <ItemMala item='Carteira' qtd={1}/>
                    <ItemMala item='Toalha' qtd={3}/>
                    <ItemMala item='Escova de dentes' qtd={1}/>
                </div>
                <div className="home-question">
                    <div>Adicionar item</div>
                    <select className="home-input" style={{width:'77%', verticalAlign:'top'}}>
                        <option disabled selected value={-1}>Selecione</option>
                        <option value={0}>{'Oculos'}</option>
                        <option value={1}>{'Vestido'}</option>
                        <option value={1}>{'Sapato'}</option>
                        <option value={1}>{'Chinelo'}</option>
                        <option value={1}>{'Fone'}</option>
                        <option value={1}>{'Carregador de Celular'}</option>ddd
                        <option value={1}>{'Maquiagem'}</option>
                    </select>
                    <button className="add-item">{'>'}</button>
                </div>
                
                <div className="home-question-title">Recomendação</div>
                <div className="home-question">
                    <div>Mala Grande</div>
                    <div>68cm x 45cm x 26cm</div>
                </div>
                <div className="home-finish-button" onClick={() => navigate('/historico')}>Salvar</div>
            </div> 
        </>
    );
  }

export default Mala;