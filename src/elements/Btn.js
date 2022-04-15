import React from "react";
import {Button} from "@material-ui/core"


const Btn = (props) => {
    const styles = {
        margin: props.margin,
        padding : props.padding,
        width:props.width,
        height:props.height,
        color: props.color,
        fontSize: props.font,
        backgroundColor: props.bg,
        border: `1px solid ${props.border}`
    }
    return(
        <Button variant={props.variant} style={styles} onClick={props._onClick}>{props.children}</Button>
    )
}
Btn.defaultProps = {
    variant: "text"
}
export default Btn