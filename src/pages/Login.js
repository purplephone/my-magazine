import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import {setCookie} from "../shared/Cookie"
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
  const email = React.useRef(null)
  const pwd = React.useRef(null)
  const dispatch = useDispatch()
  const login = () => {
    if (email.current.value === "" || pwd.current.value === ""){
      alert("아이디 혹은 비밀번호가 공란입니다.")
      return
    }
    console.log(email.current.value, pwd.current.value)
    dispatch(userActions.loginFB(email.current.value, pwd.current.value))
  }
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요."
            reff={email}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="패스워드"
            type="password"
            placeholder="패스워드 입력해주세요."
            reff={pwd}
          />
        </Grid>

        <Button
          text="로그인하기"
          _onClick={login}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
