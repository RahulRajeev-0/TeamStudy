import React from 'react'
import './App.css'
// React Router Dom
import {BrowserRouter, Routes, Route } from 'react-router-dom';
// redux
import { Provider } from 'react-redux';
import userStore from './Redux/userStore'

// toastify ( for alerts )
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// user wrapper
import UserWrapper from './components/user/userWrapper';

function App() {
  

  return (
  
    <div className='App'>


      <BrowserRouter>
          <Provider store={userStore}>

              <Routes>

                  <Route path="/*" element={<UserWrapper/>}/>
                  
              </Routes>
      
          </Provider>
      </BrowserRouter>

      {/* for toastify alert */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition: Flip
      />
    </div>
   
  )
}

export default App
