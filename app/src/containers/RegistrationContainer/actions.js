import {
  REGISTRATION_CHANGE_FORM_VALUE,
  REGISTRATION_USER_CREATE_NEW,
} from './constants';
import { browserHistory } from 'react-router';
import { doIt, hosts } from '../../network';
import { Observable } from 'rxjs';

export const changeValue = (input, value) => ({
  type: REGISTRATION_CHANGE_FORM_VALUE,
  input,
  value,
});

export const saveUser = () => ({
  type: REGISTRATION_USER_CREATE_NEW,
});

export const saveUserRegistrationEpic = (action$, store$) =>
  action$.ofType(REGISTRATION_USER_CREATE_NEW)
    .switchMap(() =>
      Observable.ajax(doIt(hosts.pk, 'user/add', 'POST',
        JSON.stringify(store$.getState().registrationContainer.registrationForm)
        , true))
        .map(() => ({
          type: 'successfully added',
        }))
        .do(() => browserHistory.push('/manager/users'))
        .ignoreElements()
        .catch(() =>
          Observable.of({
            type: `${REGISTRATION_USER_CREATE_NEW}_FAILED}`,
          }))
    );
