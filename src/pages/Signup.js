import React, { useRef } from "react";
import { Grid, Text, Input, Button } from "../elements";

const Signup = (props) => {
  const nickname = useRef(null)
  const pwd = useRef(null)
  const pwd2 = useRef(null)
  const email = useRef(null)
  const handleSignup = () => {
    // Email
    let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // password 8~16 영문 숫자
    let regPwd = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}/;
    // ID 6~20 영문 숫자 (영어로 시작해야할 껄? 껄? 껄?)
    let regNickname = /^[a-z]+[a-z0-9]{5,19}/g;

    if (!regEmail.test(email.current.value)) {
      alert("이메일 형식이 잘못되었습니다.")
      return
    }

    if (!regNickname.test(nickname.current.value)) {
      alert("닉네임은 6~20자리의 영문과 숫자 조합입니다.")
      return
    }

    if (!regPwd.test(pwd.current.value)) {
      alert("비밀번호는 9~16자리의 영문과 숫자 조합입니다.")
      return
    }

    if(pwd.current.value === pwd2.current.value){
      alert("비밀번호가 일치하지 않습니다.")
      return
    }

  }
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px">
          <Input
            reff={email}
            label="이메일"
            placeholder="이메일을 입력해주세요."
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            reff={nickname}
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            reff={pwd}
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            reff={pwd2}
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
          />
        </Grid>

        <Button _onClick={() =>handleSignup()}>회원가입하기</Button>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;