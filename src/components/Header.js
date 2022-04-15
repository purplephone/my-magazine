import React from "react";
import {Grid, Text, Btn} from "../elements";

const Header = (props) => {
    return (
        <React.Fragment>
            <Grid is_flex padding="4px 16px">
                <Grid is_flex>
                    <span></span>
                    <span>
                    <Btn>Sign-In</Btn>
                    <Btn>Sign-up</Btn>
                    </span>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

Header.defaultProps = {}

export default Header;