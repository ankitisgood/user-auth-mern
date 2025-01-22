import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPopup from './components/LoginPopup';
import { ToastContainer } from 'react-toastify';


const App = () => {

  const [showLogin,setShowLogin] = useState(false); 

  return (
    <>
    <ToastContainer/>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App