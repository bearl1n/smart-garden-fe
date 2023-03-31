import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePages";
import {DashBoardPage} from "./pages/DashBoardPages";
import {Navigation} from "./component/Navigation";
import {Divider, Layout, Slider} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

function App() {
  return (
      <>  <Layout>
          <Header className={"font-bold text-white bg-auto"}>Smart Garden</Header>
          <Navigation/>



          <Content>


                <Routes>
                    <Route path={"/"} element={ <HomePage /> } />
                    <Route path={"/dashboard"} element={ <DashBoardPage /> } />
                </Routes>
          </Content>
          <Footer className={"fixed bottom-1 w-full h-4 justify-items-end"}>By Best Company </Footer>
          </Layout>


      </>
  );
}

export default App;
