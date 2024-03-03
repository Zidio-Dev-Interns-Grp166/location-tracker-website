import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Home from './pages/home';
import SignUp from "./signUp/SignUp";



function App() {

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
