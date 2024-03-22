import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useState } from 'react'

import Home from './pages/home';
import SignUp from "./signUp/SignUp";
import LoginForm from "./signUp/login";
import Dashboard from "./signUp/dashboard";
import PhoneVerify from "./signUp/verification";
import History from "./pages/history";
import MapWithTracking from "./pages/map";



function App() {
  const [history, setHistory] = useState([]);


  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/verification' element={<PhoneVerify />} />
          <Route path="/history" element={<History  />}  />
          <Route path="/map"  element={<MapWithTracking />}   />
        </Routes>
      </Router>
    </div>
  )
}

export default App
