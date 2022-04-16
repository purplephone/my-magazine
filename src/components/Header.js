import React from "react";
import {Grid, Button} from "../elements";
import { useNavigate } from "react-router-dom";
import { getCookie, deleteCookie } from "../shared/Cookie";

const Header = () => {
    const naviagte = useNavigate();
    const handleLogin = () => {
        naviagte('/login')
    }
    const handleSignup = () => {
        naviagte('/signup')
    }
    const [is_login,setIsLogin] = React.useState(false)
    React.useEffect(() => {
        let cookie = getCookie("user_id");
        console.log(cookie)
        if(cookie) {
            setIsLogin(true);
        }else{
            setIsLogin(false);
        }
    })
    return (
        <React.Fragment>
            <Grid is_flex padding="4px 16px">
                <Grid is_flex>
                    <Button _onClick={() => handleLogin()} text="로그인"></Button>
                    <Button _onClick={() => handleSignup()} text="회원가입"></Button>
                    <Button _onClick={() => deleteCookie("user_id")} text="로그아웃"></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

Header.defaultProps = {}

export default Header;