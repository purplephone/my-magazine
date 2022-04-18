import React from "react";
import styled from "styled-components";

import {Text, Grid} from "./index";

const Input = (props) => {
    const {label, placeholder, _onChange, reff, type, multiLine} = props;
    if(multiLine){
      return (
        <Grid>
          {label && <Text margin="0px">{label}</Text>}
          <ElTextarea
            ref={reff}
            rows={10}
            placeholder={placeholder}
            onChange={_onChange}
          ></ElTextarea>
        </Grid>
      );
    }
    
    return (
      <React.Fragment>
        <Grid>
          {label && <Text margin="0px">{label}</Text>}
          <ElInput ref={reff} type={type} placeholder={placeholder} onChange={_onChange} />
        </Grid>
      </React.Fragment>
    );
  };

Input.defaultProps = {
  multiLine: false,
    type: "text",
    label: '텍스트',
    placeholder: '텍스트를 입력해주세요.',
    _onChange: () => {}
}

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  resize: none;
`;

const ElInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

export default Input;