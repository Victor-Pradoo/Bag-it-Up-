import React, { Children, useRef } from "react";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import Login from './Login'

function FirstScreen() {

    const navigate = useNavigate();
    const [loginPopupOpen, SetLoginPopupOpen] = useState(false)

    return (
        <div id='main-firstscreen'>
            <style>
               {`
                #main-navbar{
                    display: none !important; 
                }
               `}
            </style>
            {loginPopupOpen &&
                <Login
                    onClickOutside={() => SetLoginPopupOpen(false)}
                />
            }
            <div 
                style={{
                    height: '60%',
                    width: '100%',
                }}
            >   
                <div className='vh-cen' style={{height:'auto',width:'100%', padding: '10%', boxSizing:'border-box'}}> 
                    <div id='firstscreen-logo' style={{borderRadius: '15px', backgroundColor:'#000', width: '60vw', aspectRatio: '1/1', margin: '0 auto'}}></div>
                </div>
            </div>
            <div 
                id='firstscreen-enterdiv'
                className='main-gradient'
            >
                <div className='vh-cen' style={{height:'auto',width:'100%', padding: '10%', boxSizing:'border-box'}}> 
                    <div 
                        className="firstscreen-button"
                        onClick={() => SetLoginPopupOpen(true)}
                    >
                        Login
                    </div>
                    <div
                        className="firstscreen-button"
                        onClick={() => navigate('/create')}
                    >
                        Convidado
                    </div>
                </div>
            </div>
        </div>
    );
  }

export default FirstScreen;