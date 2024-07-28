import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Jobs from './Pages/Jobs';
import Login from './Pages/Login';
import Register from './Pages/Register';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Licensing from './Pages/Licensing';
import Privacy from './Pages/Privacy';
import Create from './Pages/Jobs/Create';
import View from './Pages/Jobs/View';
import Edit from './Pages/Jobs/Edit';
import { useContext, useEffect, useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AuthContext from './Context/AuthContext';

function App() {

  let context = useContext(AuthContext);

  return (
    <>

      <Header />
      <Routes>
        <Route path='/' element={<Jobs />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/licensing' element={<Licensing />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/jobs/create' element={context.isLogged ? <Create /> : <Navigate to="/" />} />
        <Route path='/jobs/view/:id' element={<View isLogged={context.isLogged} />} />
        <Route path='/jobs/edit/:id' element={context.isLogged ? <Edit /> : <Navigate to="/" />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
