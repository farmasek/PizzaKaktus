import {
  USERPWD_CHANGE_FORM_VALUE,
  USERPWD_CONFIRM_CHANGE,
} from './constants';
import {
  doIt,
  hosts,
} from '../../network';
import { Observable } from 'rxjs';

export const changeValue = (input, value) => ({
  type: USERPWD_CHANGE_FORM_VALUE,
  input,
  value,
});

export const confirmChange = (login, oldPw, newPw) => ({
  type: USERPWD_CONFIRM_CHANGE,
  login,
  oldPw,
  newPw,
});

export const userpwdConfirmChange = action$ =>
  action$.ofType(USERPWD_CONFIRM_CHANGE)
    .switchMap((action) =>
      Observable.ajax(doIt(hosts.pk, 'user/changePassword', 'POST',
        {
          login: action.login,
          userOldPassword: action.oldPw,
          userNewPassword: action.newPw,
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
