import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import styled from "styled-components"

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import { Grid } from "../elements";



function App() {
  return (
    <React.Fragment>
      <Wrapper>
        <Grid>
          <BrowserRouter>
            <Header></Header>
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </Grid>
      </Wrapper>
    </React.Fragment>
  );
}

const Wrapper = styled.div`
min-width: 200px;
max-width: 340px;
max-height: 93vh;
margin: auto;
border-radius: 5px;
border :1px solid black;
`
export default App