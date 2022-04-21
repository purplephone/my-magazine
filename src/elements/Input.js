import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = ({ label, placeholder, type, multiLine, onSubmit, _onChange, reff, children, value }) => {
  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea value={value} ref={reff} rows={10} onChange={_onChange} placeholder={placeholder}> </ElTextarea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElInput
          type={type}
          ref={reff}
          placeholder={placeholder}
          onChange={_onChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSubmit(e);
            }
          }}
        ></ElInput>
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  multiLine: false,
  value:"",
  onSubmit: () => {},
  onChange: () => {},
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
