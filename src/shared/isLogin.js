import { getCookie } from "./Cookie"

export const isLogin = () => {
    const token = getCookie()
    if(token){
        return token
    } else {
        return false
    }
}