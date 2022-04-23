const cookieName = "LongLifeCookie"

const getCookie = () => {
  let value = "; " + document.cookie;
  let parts = value.split(`; ${cookieName}=`);

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  else {
    return false
  }
};

const setCookie = ( value, exp = 365) => {
  let date = new Date();

  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = `${cookieName}=${value}; expires=${date.toUTCString()}`;
};

const deleteCookie = () => {
  let date = new Date("2020-01-01").toUTCString();

  document.cookie = cookieName + "=; expires=" + date;
};

export { getCookie, setCookie, deleteCookie };
