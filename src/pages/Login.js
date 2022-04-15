import React from "react";
import { Text, Input, Grid, Btn} from "../elements";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
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
            _onChange={() => {
              console.log("아이디 입력했어!");
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="패스워드"
            placeholder="패스워드 입력해주세요."
            _onChange={() => {
              console.log("패스워드 입력했어!");
            }}
          />
        </Grid>

        <Btn
          border="red"
          color="red"
          _onClick={() => {
            console.log("로그인 했어!");
          }}
        >Sign-In</Btn>
      </Grid>
    </React.Fragment>
  );
};

export default Login;