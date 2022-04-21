import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Input, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const Signup = ({ history }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  const pwd = useRef("");
  const pwdCheck = useRef("");
  const userName = useRef("");

  useEffect(() => {
    if (isLogin) {
      alert("이미 로그인이 되어있습니다!");
      history.replace("/");
    }
  }, [history, isLogin]);

  const signup = () => {
    const PWD = pwd.current.value;
    const PWDCHECK = pwdCheck.current.value;
    const USERNAME = userName.current.value;

    if (!PWD && !USERNAME) {
      return;
    }

    if (PWD !== PWDCHECK) {
      alert("비밀번호를 확인해주세요!");
      return;
    }
    dispatch(userActions.signupFB(USERNAME, PWD, PWDCHECK));
  };

  return (
    <React.Fragment>
      <Grid height="calc(100vh - 46px)" bg="white" padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            reff={userName}
          />
        </Grid>

        <Grid>
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            reff={pwd}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            type="password"
            reff={pwdCheck}
          />
        </Grid>

        <Button text="회원가입하기" _onClick={signup}></Button>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;
