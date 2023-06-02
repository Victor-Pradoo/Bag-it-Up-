import React, { Children, useRef } from "react";
import {useState, useEffect, useMemo} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Arrow from '../component/icons/Arrow.js'
import Cross from '../component/icons/Cross.js'

function ItemMala({item_id, initial_qtd, removeItem, setQtdItem}){
    const item = useMemo(() => ALL_POSSIBLE_ITEMS[item_id].nome, [])
    const qtd = useMemo(() => initial_qtd, [])

    // Transforma numeros negativos ou neutros em 1
    const keep_positive = (value) => {
        if (value < 1)
            value = 1
        else if (value > 99)
            value = 99
        return value
    }

    // Trata valor inputado pelo user
    const handle_input_change = (e) => {
        let value = e.target.value
        value  = value.replace(/\D/g,'');
        if (value.length == 0){
            value = 1
        } else {
            value = parseInt(value)
        }

        value = keep_positive(value)

        setLocalQtdItem(value)
    }

    const [qtdItem, setLocalQtdItem] = useState(qtd)

    return(
        <div>
            <Cross onClick={() => removeItem(item_id)} style={{height:'24px', width:'24px', marginRight:'10px'}}/>
            <div style={{display:'inline-block', verticalAlign:'top', position: 'relative', fontSize:'20px'}}>{item}</div>
            <div style={{float:'right', width: '74px', display:'flexbox'}}>
                <Arrow 
                    style={{height:'27px', width:'27px', transform:'rotate(90deg)', float:'right'}}
                    onClick={() => {
                        var val = keep_positive(qtdItem - 1)
                        setQtdItem(item_id, val)
                        setLocalQtdItem(val)
                    }}
                />
                <input type='text' className='item-qtd-input' value={qtdItem} onChange={handle_input_change}></input>
                <Arrow
                    style={{height:'27px', width:'27px', transform:'rotate(-90deg)', float:'left'}}
                    onClick={() => {
                        var val = keep_positive(qtdItem + 1)
                        setQtdItem(item_id, val)
                        setLocalQtdItem(val)
                    }}
                />
            </div>
        </div>
    )
}

// Isso será armazenado no banco, não aqui
const ALL_POSSIBLE_ITEMS = {
    casaco:{
        nome:'Casaco'
    },
    calca:{
        nome:'Calça'
    },
    blusa:{
        nome:'Blusa'
    },
    "roupa intima":{
        nome:'Roupa íntima'
    },
    passaporte:{
        nome:'Passaporte'
    },
    carteira:{
        nome:'Carteira'
    },
    toalha:{
        nome:'Toalha'
    },
    'escova de dentes':{
        nome:'Escova de Dentes'
    },
    ocolos:{
        nome:'Oculos'
    },
    vestido:{
        nome:'Vestido'
    },
    sapatos:{
        nome:'Sapato'
    },
    chinelo:{
        nome:'Chinelo'
    },
    fone:{
        nome:'Fone'
    },
    'carregador de celular':{
        nome:'Carregador de Celular'
    },
    maquinagem:{
        nome:'Maquiagem'  
    },
    shorts:{
        nome:'Shorts'  
    },
    regata:{
        nome:'Regata'  
    },
    'roupa de banho':{
        nome:'Roupa de banho'  
    },
}

function MalaItens({itemsMala, setQtdItem, removeItem}) {

    return(
        <>
            {itemsMala.length > 0 ? 
                itemsMala.map((itemMala) => (
                    <ItemMala
                        key={itemMala.item_id}
                        item_id={itemMala.item_id}
                        initial_qtd={itemMala.qtd}
                        removeItem={removeItem}
                        setQtdItem={setQtdItem}
                    />
                ))
                :
                <span
                    style={{
                        textAlign: 'center',
                        width: '100%',
                        color: 'var(--gray-light)',
                        display: 'block',
                    }}
                >
                    Mala vazia
                </span>
            }
        </>
    )

}

function Mala() {

    const navigate = useNavigate()
    const routeParams = useParams();
    
    // {item_id:'calca', qtd:1,},
    // {item_id:'blusa', qtd:5,},
    // {item_id:'passaporte', qtd:10,},
    // {item_id:'roupa de banho', qtd:11,},
    // {item_id:'carteira', qtd:1,},
    // {item_id:'vestido', qtd:1,},
    // {item_id:'roupa intima', qtd:3,},
    // {item_id:'fone', qtd:1,},

    const [itemsMala, setItemsMala] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5000/mala_json/'+routeParams.id_viagem)
        .then(response => response.json())
        .then(json => {
            setItemsMala(json)
        });
    }, [])


    const removeItem = (item_id) => {
        const new_items_mala = []
        for(const el of itemsMala){
            if(el.item_id !== item_id)
                new_items_mala.push(el)
        }
        setItemsMala(new_items_mala)
    }

    const addItem = (item_id) => {
        if(item_id !== '-1'){
            const new_line = {
                item_id:item_id,
                qtd:1,
            }
            setItemsMala([...itemsMala, new_line])
        }
    }

    const notUsedItems = useMemo(() => {
        if(itemsMala != null){

            var usedIds = itemsMala.map((x) => x.item_id);
            var retorno = {}
            for(const el of Object.keys(ALL_POSSIBLE_ITEMS)){
                if (!usedIds.includes(el))
                retorno[el] = ALL_POSSIBLE_ITEMS[el]
            }
            return retorno
        }
    }, [itemsMala])

    function salvarMala(){
        
        fetch('http://localhost:5000/save_mala', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                data: itemsMala,
                id_viagem: routeParams.id_viagem
            })
        })
        .then(response => response.text())
        .then(txt => {
            if(txt == '1'){
                console.log('Success:', txt);
                navigate('/historico')
            } else {
                console.log('Error:', txt);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        
    }

    function setQtdItem(item_id, qtd){
        for(const el of itemsMala){
            if(el.item_id == item_id){
                el.qtd = qtd
                break
            }
        }
        setItemsMala([...itemsMala])
    }

    return (
        <>
            <div className="top-title main-gradient">{routeParams.nome_viagem}</div>
            <div id='main-mala'> 
                {itemsMala != null ?
                <>
                    <div className="mala-question-title">Items</div>
                        <div className="mala-question">
                            <MalaItens 
                                itemsMala={itemsMala} 
                                setQtdItem={setQtdItem}
                                removeItem={removeItem}
                            />
                        </div>
                        <div className="mala-question">
                            <div>Adicionar item</div>
                            <select className="mala-input" id='add-item-mala-select' style={{width:'77%', verticalAlign:'top'}}>
                                {Object.keys(notUsedItems).map((item_id) => (
                                    <option
                                    key={item_id}
                                    value={item_id}
                                    >
                                        {notUsedItems[item_id].nome}
                                    </option>
                                ))}
                                <option disabled selected value={-1}>Selecione</option>
                            </select>
                            <button
                                className="add-item"
                                onClick={() => {
                                    var el = document.getElementById('add-item-mala-select')
                                    addItem(el.value)
                                    el.value = -1
                                }}
                            >
                                {'>'}
                            </button>
                        </div>
                        
                        <div className="mala-question-title">Recomendação</div>
                        <div className="mala-question">
                            <div>Mala Grande</div>
                            <div>68cm x 45cm x 26cm</div>
                        </div>
                        <div className="mala-finish-button" onClick={() => salvarMala()}>Salvar</div>
                    <div className='footer-spacing'></div>
                </>
                :
                <div className="mala-question-title">Carregando</div>
                }
            </div> 
        </>
    );
  }

export default Mala;