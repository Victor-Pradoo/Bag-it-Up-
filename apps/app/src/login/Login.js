import React, { Children, useRef } from "react";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

/* Esse componente deve ser usado como um popup */

function Login({onClickOutside}) {

    const navigate = useNavigate();

    return (
        <>
            <div id='backgound-login' className='blurry-background' onClick={onClickOutside}>
            </div>
            <div id='login-popupdiv' className='vh-cen'>
                <div id='login-title'>Login</div>
                <div className='login-input-div'>
                    <span className='login-input-title'>Nickname</span>
                    <input className='login-input'></input>
                </div>
                <div className='login-input-div'>
                    <span className='login-input-title'>Password</span>
                    <input className='login-input' type='password'></input>
                </div>
                <div className='login-submit-div'>
                    <button className='login-submit' onClick={() => navigate('/create')}>Entrar</button>
                    <button className='login-submit' onClick={() => navigate('/create')}>Cadastrar</button>
                </div>
            </div>
        </>
    );
  }

export default Login;