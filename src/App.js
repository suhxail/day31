import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import './App.css'
import Dashboard from './components/Dashboard'
import { BrowserRouter } from 'react-router-dom'


function App() {

  return (
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>

  )
}

export default App