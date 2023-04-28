import React, { Children, useRef } from "react";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    return (
        <div id='main-login'>
            <style>
               {`
                #main-navbar{
                    display: none !important; 
                }
               `}
            </style>
            <div 
                style={{
                    height: '60%',
                    width: '100%',
                }}
            >   
                <div className='vh-cen' style={{height:'auto',width:'100%', padding: '10%', boxSizing:'border-box'}}> 
                    <div id='login-logo' style={{borderRadius: '15px', backgroundColor:'#000', width: '60vw', aspectRatio: '1/1', margin: '0 auto'}}></div>
                </div>
            </div>
            <div 
                id='login-enterdiv'
                className='main-gradient'
            >
                <div className='vh-cen' style={{height:'auto',width:'100%', padding: '10%', boxSizing:'border-box'}}> 
                    <div 
                        className="login-button"
                        onClick={() => navigate('/create')}
                    >
                        Login
                    </div>
                    <div
                        className="login-button"
                        onClick={() => navigate('/create')}
                    >
                        Convidado
                    </div>
                </div>
            </div>
        </div>
    );
  }

export default Login;