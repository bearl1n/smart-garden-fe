import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./page/Home";
import {useAppDispatch} from "./hooks/redux";
import DashBoard from "./page/DashBoard";

function App() {

  const dispatch = useAppDispatch()
  const token = JSON.parse(localStorage.getItem("token") || "{}")

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/dashboard" element={<DashBoard />}/>
        </Routes>
      </Router>

  );
}

export default App;
