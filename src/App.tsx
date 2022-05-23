import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import Home from './components/Home';
import Lots from './components/Lots';
// import VehicleDetails from './components/VehicleDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/lots' element={<Lots/>}/>
        {/* <Route path='/VehicleDetails' element={<VehicleDetails/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
