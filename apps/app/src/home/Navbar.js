import React, { Children , useRef } from "react";
import {useState, useEffect, useMemo} from 'react';
import { useNavigate } from "react-router-dom";

import Add from '../component/Add.js'
import ListIcon from '../component/List.js'


function Navbar() {

    const navigate = useNavigate();
    const page_name = useMemo(() => window.location.pathname, [window.location.pathname])

    return (
        <div id='main-navbar' className="main-gradient"> 
            <Add
                className={'navbar-icon add '+ (page_name == '/home' && 'active')}
                onClick={() => navigate('/home')}
            />
                
            <ListIcon
                className={'navbar-icon list '+ (page_name == '/historico' && 'active')}
                onClick={() => navigate('/historico')}
            />
        </div>
    );
  }

export default Navbar;