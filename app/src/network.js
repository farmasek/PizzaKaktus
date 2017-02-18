/**
 * Created by Farmas on 21.10.2016.
 */
export const hosts = {
  // dev
  pk: `http://${window.location.hostname}:6080`,
  // prod
  // pk: `https://pizzak.herokuapp.com`

};
export const getToken = () => {
  // get token from local storrage
  try {
    return (window.localStorage.getItem('token'));
  } catch (ex) {
    return null;
  }
};
export const isAuthorized = () => {
  // Authorization rules
  return true;
};

export const removeToken = () => {
  window.localStorage.removeItem('token');
};
export const setToken = (token) => {
  window.localStorage.setItem('token', "Hello" + token);
};

const defaultHeader = (json) => ({
  async: true,
  crossDomain: false,
  headers: {
    'cache-control': 'no-cache',
    'Content-Type': `${json ?
      'application/json'
      :
      'application/x-www-form-urlencoded; charset=UTF-8'}`,
  },
  processData: false,
  contentType: false,
  mimeType: 'multipart/form-data',
});

export const doIt = (host, path, methodString, body = {}, json = false) => {
  const received = {
    url: `${host}/${path}`,
    method: methodString,
    body,
  };
  const header = defaultHeader(json);
  return Object.assign(
    received,
    header,
  );
};
