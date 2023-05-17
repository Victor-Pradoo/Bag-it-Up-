import React, { Children , useRef } from "react";
import {useState, useEffect, useMemo} from 'react';
import { useNavigate } from "react-router-dom";

import Add from '../icons/Add.js'
import ListIcon from '../icons/List.js'
import HomeIcon from '../icons/Home.js'


function Navbar() {

    const navigate = useNavigate();
    const page_name = useMemo(() => window.location.pathname, [window.location.pathname])

    return (
        <div id='main-navbar' className="main-gradient"> 
            <Add
                className={'navbar-icon add '+ (page_name == '/create' && 'active')}
                onClick={() => navigate('/create')}
            />
                
            <HomeIcon
                className={'navbar-icon home '+ (page_name == '/home' && 'active')}
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