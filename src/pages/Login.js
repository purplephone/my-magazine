import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { setCookie } from "../shared/Cookie"
import { useNavigate } from "react-router-dom";

const Login = (props) => {

  const navigate = useNavigate()
  const id = React.useRef(null)
  const pwd = React.useRef(null)

  const handle = () => {
    // to server
    setCookie("user_id", id.current.value)
    navigate('/')
  }

  console.log("한지훈 존잘");
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            reff={id}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="패스워드"
            placeholder="패스워드 입력해주세요."
            reff={pwd}
          />
        </Grid>

        <Button
          text="로그인하기"
          _onClick={handle}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
