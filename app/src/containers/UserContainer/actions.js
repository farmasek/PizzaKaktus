import {
  FETCH_USER_LIST,
  USER_CHANGE_FORM_VALUE,
  USER_CREATE_NEW,
  USER_UPDATE_FIELD,
} from './constants';

import { doIt, hosts } from '../../network';
import { Observable } from 'rxjs';
import { fromJS } from 'immutable';

export const fetchUserList = () => ({
  type: FETCH_USER_LIST,
});

export const changeValue = (input, value) => ({
  type: USER_CHANGE_FORM_VALUE,
  input,
  value,
});

export const saveUser = () => ({
  type: USER_CREATE_NEW,
});

export const updateUser = (user, field, value) => {
  let userMap = fromJS(user);
  userMap = userMap.set(field, value);
  return {
    type: USER_UPDATE_FIELD,
    userMap,
  };
};
// TODO create model
export const saveUserListEpic = (action$, store$) =>
  action$.ofType(USER_CREATE_NEW)
    .switchMap(() =>
      Observable.ajax(doIt(hosts.pk, 'user/add', 'POST',
        JSON.stringify(store$.getState().userContainer.userForm)
        , true))
        .map(() => ({
          type: `${FETCH_USER_LIST}`,
        }))
        .catch(() =>
          Observable.of({
            type: `${USER_CREATE_NEW}_FAILED}`,
          }))
    );
// TODO better error handling
export const updateUserEpic = (action$) =>
  action$.ofType(USER_UPDATE_FIELD)
    .switchMap(({ userMap }) =>
      Observable.ajax(doIt(hosts.pk, 'user/update', 'PUT',
        userMap, true))
        .map(() => ({
          type: `${FETCH_USER_LIST}`,
        }))
        .catch(() =>
          Observable.of({
            type: `Noop, failed fetch`,
          }))
    );

export const fetchUserListEpic = action$ =>
  action$.ofType(FETCH_USER_LIST)
    .switchMap(() =>
      Observable.ajax(doIt(hosts.pk, 'user/all-users', 'GET', {}))
        .map(({ response }) => ({
          type: `${FETCH_USER_LIST}_FULFILLED`,
          response,
        }))
        .catch(() =>
          Observable.of({
            type: `${FETCH_USER_LIST}_FAILED}`,
          }))
    );
