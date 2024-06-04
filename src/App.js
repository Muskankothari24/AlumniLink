import React from "react";
import { Route, Routes } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Ssignin from './components/Ssignin'
import Navbar from './components/Navbar'
import Sidebar from "./components/Sidebar"
import Main from "./components/Main"
import Connection from './components/Connection'
import Invitation from './components/Invitation'
import Network from './components/Network'
import Message from './components/Message'
function App() {
  return (
    <div className="App">
    
    <Routes>
        <Route path='/' element={<Ssignin/>}/>
        <Route path='/main' element={<Main/>}/>
        <Route path='/connect' element={<Connection/>}/>
        <Route path="/invite" element={<Invitation/>}/>
        <Route path="/network" element={<Network/>}/>
        <Route path='/message' element={<Message/>}/>
        </Routes>
 </div>
  );
}

export default App;
