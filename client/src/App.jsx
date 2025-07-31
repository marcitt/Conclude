import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'

import Dashboard from './pages/Dashboard';
import AccountIdentification from './pages/AccountIdentification';

function App() {

  return (
    <>
      <BrowserRouter>

          <nav>
            <h6>conclude.</h6>
            <Link to="/">Dashboard</Link>
            <Link to="/accounts">Account Scanning</Link>
          </nav>

        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/accounts" element={<AccountIdentification />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App