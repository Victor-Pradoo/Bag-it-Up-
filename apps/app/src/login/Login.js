import React, { Children, useRef } from "react";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

/* Esse componente deve ser usado como um popup */

function Login({onClickOutside}) {

    const navigate = useNavigate();

    const [data, setData] = useState(null);

    useEffect(() => {
      
    }, []);



    function connect(){
        fetch('http://localhost:5000/login/'+data['user']+'/'+data['pwd'])
        .then(response => response.text())
        .then(text => {
            console.log(text)
            if(text == '1'){
                navigate('/create')
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
                    <button className='login-submit' onClick={() => connect()}>Entrar</button>
                    <button className='login-submit' onClick={() => ''}>Cadastrar</button>
                </div>
            </div>
        </>
    );
  }

export default Login;