export const isLogin = () => {
    const token = sessionStorage.getItem('token')
    if(token){
        return token
    } else {
        return null
    }
}