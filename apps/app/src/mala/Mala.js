import React, { Children, useRef } from "react";
import {useState, useEffect, useMemo} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Arrow from '../component/Arrow.js'
import Cross from '../component/Cross.js'

function ItemMala({item_id, initial_qtd, removeItem}){

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

        setQtdItem(value)
    }

    const [qtdItem, setQtdItem] = useState(qtd)

    return(
        <div>
            <Cross onClick={() => removeItem(item_id)} style={{height:'24px', width:'24px', marginRight:'10px'}}/>
            <div style={{display:'inline-block', verticalAlign:'top', position: 'relative', fontSize:'20px'}}>{item}</div>
            <div style={{float:'right', width: '74px', display:'flexbox'}}>
                <Arrow style={{height:'27px', width:'27px', transform:'rotate(90deg)', float:'right'}} onClick={() => setQtdItem(keep_positive(qtdItem -1))}/>
                <input type='text' className='item-qtd-input' value={qtdItem} onChange={handle_input_change}></input>
                <Arrow style={{height:'27px', width:'27px', transform:'rotate(-90deg)', float:'left'}} onClick={() => setQtdItem(keep_positive(qtdItem +1))}/>
            </div>
        </div>
    )
}

// Isso será armazenado no banco, não aqui
const ALL_POSSIBLE_ITEMS = {
    0:{
        nome:'Casaco'
    },
    1:{
        nome:'Calça'
    },
    2:{
        nome:'Blusa'
    },
    3:{
        nome:'Roupa íntima'
    },
    4:{
        nome:'Passaporte'
    },
    5:{
        nome:'Carteira'
    },
    6:{
        nome:'Toalha'
    },
    7:{
        nome:'Escova de Dentes'
    },
    8:{
        nome:'Oculos'
    },
    9:{
        nome:'Vestido'
    },
    10:{
        nome:'Sapato'
    },
    11:{
        nome:'Chinelo'
    },
    12:{
        nome:'Fone'
    },
    13:{
        nome:'Carregador de Celular'
    },
    14:{
        nome:'Maquiagem'  
    }, 
}

function MalaItens({itemsMala, setItemsMala, removeItem}) {

    return(
        <>
            {itemsMala.length > 0 ? 
                itemsMala.map((itemMala) => (
                    <ItemMala
                        key={itemMala.item_id}
                        item_id={itemMala.item_id}
                        initial_qtd={itemMala.qtd}
                        removeItem={removeItem}
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
    
    const [itemsMala, setItemsMala] = useState([
        {item_id:0, qtd:1,},
        {item_id:1, qtd:5,},
        {item_id:2, qtd:10,},
        {item_id:3, qtd:11,},
        {item_id:4, qtd:1,},
        {item_id:5, qtd:1,},
        {item_id:6, qtd:3,},
        {item_id:7, qtd:1,},
    ])

    const removeItem = (item_id) => {
        for(var i=0; i<itemsMala.length; i++){
            let el = itemsMala[i]
            if (el.item_id == item_id){
                break
            }
        }
        itemsMala.splice(i, 1)
        setItemsMala([...itemsMala])
    }

    const addItem = (item_id) => {
        if (Object.keys(ALL_POSSIBLE_ITEMS).map((x) => parseInt(x)).includes(item_id)){
            var list = [...itemsMala]
            list.push({
                item_id: item_id,
                qtd: 1,
            })
            setItemsMala(list)
        } else {
            console.log('Select Inválido!')
            console.log(Object.keys(ALL_POSSIBLE_ITEMS))
            console.log(item_id)
        }
    }

    const notUsedItems = useMemo(() => {
        var usedIds = itemsMala.map((x) => x.item_id);
        var retorno = {}
        for(var i=0; i<Object.keys(ALL_POSSIBLE_ITEMS).length; i++){
            var el = ALL_POSSIBLE_ITEMS[i]
            if (!usedIds.includes(i))
                retorno[i] = el
        }
        console.log(usedIds)
        return retorno
    }, [itemsMala])

    return (
        <>
            <div className="top-title main-gradient">{routeParams.id_viagem}</div>
            <div id='main-mala'> 
                <div className="mala-question-title">Items</div>
                <div className="mala-question">
                    <MalaItens 
                        itemsMala={itemsMala} 
                        setItemsMala={setItemsMala}
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
                            console.log(el.value)
                            addItem(parseInt(el.value))
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
                <div className="mala-finish-button" onClick={() => navigate('/historico')}>Salvar</div>
            </div> 
        </>
    );
  }

export default Mala;