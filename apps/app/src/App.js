import React, {Component} from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// CSS
import './generic.css'
import './App.css'
import './login/FirstScreen.css'
import './login/Login.css'
import './mala/Create.css'
import './mala/Historico.css'
import './mala/Mala.css'
import './login/Background.css'
import './home/Home.css'
import './component/navbar/Navbar.css'

// JSX
// import NavBar from './Nav';
import FirstScreen from './login/FirstScreen'
import Create from './mala/Create'
import Historico from './mala/Historico'
import Mala from './mala/Mala'
import Background from './login/Background';
import Home from './home/Home'
import Navbar from './component/navbar/Navbar.js'

class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <Navbar/>
        <Background/>
        <Routes>
          <Route path="/bag-it-up/" element={<FirstScreen/>}/>
          <Route path="/" element={<FirstScreen/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/historico" element={<Historico/>}/>
          <Route path="/historico/:id_viagem" element={<Mala/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
