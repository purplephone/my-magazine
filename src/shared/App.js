import {BrowserRouter, Route, Routes} from "react-router-dom";
import Post from "../components/Post";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import React from "react";

import Header from "../components/Header";
import {Grid} from "../elements";

function App() {
  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Post/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </BrowserRouter>
      </Grid>
    </React.Fragment>
  );
}
export default App