import { Route } from "react-router-dom";
import { Grid } from "../elements";
import Login from "../pages/Login";
import PostList from "../pages/PostList";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import styled from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
// import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import PostWrite from "../pages/PostWrite";
import Notification from "../pages/Notification";
import PostDetail from "../pages/PostDetail";

function App() {
  const dispatch = useDispatch();

  // const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // const isSession = sessionStorage.getItem(_session_key) ? true : false;

  // useEffect(() => {
  //   if (isSession) {
  //     dispatch(userActions.loginCheckFB());
  //   }
  // }, [isSession, dispatch]);

  useEffect(() => {
    dispatch(postActions.getPostFB())
    if (sessionStorage.getItem('token')){
      dispatch(userActions.loginCheckFB())
    }
  })

  return (
    <AppWrap>
      <Grid height="calc(100% - 44px)">
        <ConnectedRouter history={history}>
          <Header />
          <Route exact path="/" component={PostList} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/write" component={PostWrite} />
          <Route exact path="/write/:postId" component={PostWrite} />
          <Route exact path="/post/:postId" component={PostDetail} />
          <Route exact path="/noti" component={Notification} />
        </ConnectedRouter>
      </Grid>
    </AppWrap>
  );
}

const AppWrap = styled.div`
  background-color: rgb(239, 246, 255);
  height: 100%;
  width: 100%;
  max-width: 500px;

  @media screen and (min-width: 480px) {
    width: 50vw;
    margin: auto;
    border: 1px solid #ddd;
    border-top: none;
  }
`;

export default App;
