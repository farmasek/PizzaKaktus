import { Observable } from 'rxjs';
import { browserHistory } from 'react-router';
import { hosts, doIt, setToken, removeToken } from '../../network';
import {
  LOGIN_DIALOG,
  LOGIN_FORM_CHANGE,
  LOGIN,
  LOGIN_FORM_ERRORS,
  SET_USER,
  LOGOUT,
  USERPWD_CHANGE_FORM_VALUE,
  USERPWD_CONFIRM_CHANGE,
  PASSWORD_CHANGE_DIALOG,
} from './constants';
import { FETCH_MENU } from '../MenuContainer/constants';

export const toggleDialog = () => ({
  type: LOGIN_DIALOG,
});

export const togglePasswordDialog = () => ({
  type: PASSWORD_CHANGE_DIALOG,
});

export const loginChange = (name, value) => ({
  type: LOGIN_FORM_CHANGE,
  name,
  value,
});

export const setLoginErrors = (loginErrors) => ({
  type: LOGIN_FORM_ERRORS,
  loginErrors,
});

export const login = (username, password) => ({
  type: LOGIN,
  body: {
    grant_type: 'password',
    username,
    password,
  },
});

export const loginEpic = action$ =>
  action$.ofType(LOGIN)
  .mergeMap(action => Observable.merge(
    Observable.ajax(doIt(hosts.pk, 'oauth/token', 'POST', action.body))
    .do((payload) => {
      setToken(payload.response);
      browserHistory.push('/');
    })
    .switchMap(payload => [
      {
        type: `${LOGIN}_FULFILLED`,
        login: action.body.username,
        payload: payload.response,
      },
      {
        type: `NOTIF_ADD`,
        notification: {
          message: 'Uživatel úspěšně přihlášen.',
        },
      },
    ])
    .catch(error => Observable.of({
      type: `${LOGIN}_REJECTED`,
      payload: error.xhr.response
        ? error.xhr.response.error_description
        : 'Could not establish connection.',
    })))
  .startWith({
    type: `${LOGIN}_PENDING`,
  }))
  .catch(error => Observable.of({
    type: `${LOGIN}_REJECTED`,
    payload: error.xhr.response
      ? error.xhr.response.error_description
      : 'Could not establish connection.',
  }));

export const loggedInEpic = action$ =>
  action$.ofType(`${LOGIN}_FULFILLED`)
  .mergeMap((action) => Observable.ajax(doIt(hosts.pk, `user/by-login/${action.login}`, 'GET', {}))
  .switchMap(payload => [
    {
      type: SET_USER,
      user: payload.response,
    },
    {
      type: FETCH_MENU,
    },
  ]));

export const logout = () => ({
  type: LOGOUT,
});

export const loggedOutEpic = action$ =>
  action$.ofType(LOGOUT)
  .do(() => {
    removeToken();
    browserHistory.push('/');
  })
  .switchMap(() => [
    {
      type: `NOTIF_ADD`,
      notification: {
        message: 'Uživatel úspěšně odhlášen.',
      },
    },
    {
      type: `${LOGOUT}_FULFILLED`,
    },
  ]);

export const changeValue = (input, value) => ({
  type: USERPWD_CHANGE_FORM_VALUE,
  input,
  value,
});

export const confirmChange = (username, old, newPass) => ({
  type: USERPWD_CONFIRM_CHANGE,
  login: username,
  old,
  newPass,
});

export const userpwdConfirmChange = action$ =>
  action$.ofType(USERPWD_CONFIRM_CHANGE)
  .switchMap((action) =>
    Observable.ajax(doIt(hosts.pk, 'user/changePassword', 'POST',
      {
        login: action.login,
        userOldPassword: action.old,
        userNewPassword: action.newPass,
      }
      , true))
    .switchMap(() => [
      {
        type: `${USERPWD_CONFIRM_CHANGE}_FULFILLED`,
      },
      {
        type: `NOTIF_ADD`,
        notification: {
          message: 'Heslo změněno.',
        },
      },
    ])
    .catch(error =>
      Observable.of({
        type: `NOTIF_ADD`,
        notification: {
          message: error.xhr.response && error.xhr.response.message,
          barStyle: { color: '#e57373' },
        },
      }))
  );
