
const getCookie = (name) => {

}

const setCookie = (name, value, exp=3) => {
    let date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000)
    document.cookie = `${name}=${value};expires=${date.toUTCString()}`
}

const deleteCookie = (name) => {

}

export {getCookie, setCookie, deleteCookie};