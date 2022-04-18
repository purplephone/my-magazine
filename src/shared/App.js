import React from "react";

import {  Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import styled from "styled-components"

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";

import Header from "../components/Header";
import { Grid} from "../elements";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { apiKey } from "./firebase";

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true:false
  React.useEffect(() => {
    if(is_session){
      dispatch(userActions.loginCheckFB())
    }
  },[])
  return (
    <React.Fragment>
      <Wrapper>
        <Grid>
          <Header></Header>
          <ConnectedRouter history={history}>
            <Route path="/" exact component={PostList} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup}/>
            <Route path="/write" exact component={PostWrite}/>
            <Route path="/post/:id" exact component={PostDetail}/>
          </ConnectedRouter>
        </Grid>
      </Wrapper>
    </React.Fragment>
  );
}

const Wrapper = styled.div`
min-width: 200px;
max-width: 340px;
max-height: 98vh;
margin: auto;
border-radius: 5px;
border :1px solid black;
position: relative;
overflow: scroll;
`
export default App