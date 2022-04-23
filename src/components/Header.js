import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import NotiBadge from "./NotiBadge";

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  if (isLogin) {
    return (
      <React.Fragment>
        <Grid bg="#efefef" isFlex position>
          <Grid>
            <Button
              width="150px"
              text="홈으로"
              _onClick={() => history.push("/")}
            ></Button>
          </Grid>
          <div style={{width:"100%", textAlign:"center", marginLeft:"10px"}}>
            <NotiBadge/>
          </div>
          <Grid>
            <Button
              width="150px"
              text="로그아웃"
              margin="0 0 0 10px"
              _onClick={() => {
                dispatch(userActions.logOutFB());
              }}
            ></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid isFlex position>
        <Button
          text="로그인"
          _onClick={() => {
            history.push("/login");
          }}
        ></Button>
        <Button
          text="회원가입"
          _onClick={() => {
            history.push("/signup");
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Header;
