import React, { Children, useRef } from "react";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Globals from "../Globals"

/* Esse componente deve ser usado como um popup */

function Login({onClickOutside}) {

    const navigate = useNavigate();

    function login(user_id){
        Globals['USER_ID'] = user_id
        navigate('/create')
    }

    const [data, setData] = useState(null);

    function connect(){

        if(data == null | !Object.keys(data).includes('pwd')){
            return 
        }

        fetch('http://localhost:5000/login/'+data['user']+'/'+data['pwd'])
        .then(response => response.text())
        .then(text => {
            console.log(text)
            if(text !== '0'){
                login(text)
            }
        });
    }

    function register(){

        if(data == null || !Object.keys(data).includes('pwd')){
            return 
        }

        fetch('http://localhost:5000/register/'+data['user']+'/'+data['pwd'])
        .then(response => response.text())
        .then(text => {
            if(text !== '0'){
                login(text)
                console.log('Usuario cadastrado!')
            } else {
                console.log('Usuario já estava cadastrado!')
            }
        });
    }

    return (
        <>
            <div id='backgound-login' className='blurry-background' onClick={onClickOutside}>
            </div>
            <div id='login-popupdiv' className='vh-cen'>
                <div id='login-title'>Login</div>
                <div className='login-input-div'>
                    <span className='login-input-title'>Nickname</span>
                    <input className='login-input'
                        onChange={(e) => setData({...data, 'user':e.target.value})}
                    ></input>
                </div>
                <div className='login-input-div'>
                    <span className='login-input-title'>Password</span>
                    <input className='login-input' type='password'
                        onChange={(e) => setData({...data, 'pwd':e.target.value})}
                    ></input>
                </div>
                <div className='login-submit-div'>
                    <button className='login-submit entrar' onClick={() => connect()}>Entrar</button>
                    <button className='login-submit cadastrar' onClick={() => register()}>Cadastrar</button>
                </div>
            </div>
        </>
    );
  }

export default Login;
