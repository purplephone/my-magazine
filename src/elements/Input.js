import React from "react";
import styled from "styled-components";

const Input = (props) => {
    const styles = {
        label:props.label,
        placeholder:props.placeholder
    }
    return(
        <MyInput style={styles} onChange={props._onChange}>{props.children}</MyInput>
    )
}
const MyInput = styled.input`
`

export default Input