import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Text, Input, Grid, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  // const isLogin = useSelector((state) => state.user.isLogin);

  const id = useRef("");
  const pwd = useRef("");

  // useEffect(() => {
  //   if (isLogin) {
  //     history.replace("/");
  //   }
  // }, [history, isLogin]);

  const login = () => {
    const ID = id.current.value;
    const PWD = pwd.current.value;

    if (!ID && !PWD) {
      alert("아이디 혹은 비밀번호를 입력해주세요!");
      return;
    }

    // if (!emailCheck(ID)) {
    //   alert("이메일 형식이 맞지 않습니다!");
    //   return;
    // }

    dispatch(userActions.loginFB(ID, PWD));
  };

  return (
    <React.Fragment>
      <Grid bg="white" height="calc(100vh - 46px)" padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid>
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            reff={id}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            reff={pwd}
            onSubmit={login}
          />
        </Grid>

        <Button
          text="로그인하기"
          _onClick={() => {
            login();
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
