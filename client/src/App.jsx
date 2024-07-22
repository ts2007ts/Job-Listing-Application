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
import { useEffect, useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {

  const [isLogged, setIsLogged] = useState(false);

  function checkLocalStorage() {
    if (!localStorage.getItem('token')) {
      setIsLogged(false);
    }
    if (localStorage.getItem('token')) {
      setIsLogged(true);
    }
  }

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const updateStatus = (status) => {
    setIsLogged(status);
  }

  return (
    <>
      <BrowserRouter>
        <Header updateStatus={updateStatus} />
        <Routes>
          <Route path='/' element={<Jobs />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/login' element={<Login updateStatus={updateStatus} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/licensing' element={<Licensing />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/jobs/create' element={isLogged ? <Create /> : <Navigate to="/" />} />
          <Route path='/jobs/view/:id' element={<View isLogged={isLogged} />} />
          <Route path='/jobs/edit/:id' element={isLogged ? <Edit /> : <Navigate to="/" />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
