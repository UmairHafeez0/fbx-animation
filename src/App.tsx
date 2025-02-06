import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Component/Header";

const Background = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
`;

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Background>
        <h2 className="display-4 fw-bold">Welcome to Emperotech Solutions</h2>
        <p className="lead text-light">Crafting innovative software solutions for a digital future.</p>
      </Background>
    </>
  );
};

export default App;
