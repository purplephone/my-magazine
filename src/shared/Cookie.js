import { Cookies } from "react-cookie";
const cookies = new Cookies()
const cookieName = "LongLifeCookie"

const getCookie = () => {
  return cookies.get(cookieName)
};

const setCookie = ( value, exp = 365) => {
  let expires = new Date();
  expires.setDate(expires.getDate() + exp)
  return cookies.set(cookieName, value, {
    path:'/',
    expires,
  })
};

const deleteCookie = () => {
  return cookies.remove(cookieName, {
    path: '/',
  });
};

export { getCookie, setCookie, deleteCookie };
