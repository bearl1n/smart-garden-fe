import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePages";
import {DashBoardPage} from "./pages/DashBoardPages";
import {Navigation} from "./component/Navigation";

function App() {
  return (
      <>
          <Navigation/>
          <Routes>
              <Route path={"/"} element={ <HomePage /> } />
              <Route path={"/dashboard"} element={ <DashBoardPage /> } />
          </Routes>
      </>
  );
}

export default App;
