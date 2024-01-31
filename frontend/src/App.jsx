import React from 'react'
import Register from './components/user/auth/Register/Register'
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/user/auth/Login/Login';

function App() {
  

  return (
  
   
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/Login' element={ <Login/>} />
      </Routes>
     
     </BrowserRouter>
    
  )
}

export default App
