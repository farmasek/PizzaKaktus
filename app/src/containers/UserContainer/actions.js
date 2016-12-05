import {
  FETCH_USER_LIST,
  USER_CHANGE_FORM_VALUE,
  USER_CREATE_NEW,
  USER_UPDATE_FIELD,
  USER_DELETE,
  USER_SNACKBAR,
  USER_VALIDATION,
} from './constants';
import { doIt, hosts } from '../../network';
import { Observable } from 'rxjs';
import { fromJS } from 'immutable';

export const userValidation = (userErrors) => ({
  type: USER_VALIDATION,
  userErrors,
});

export const handleSnackbar = (value) => ({
  type: USER_SNACKBAR,
  value,
});

export const fetchUserList = () => ({
  type: FETCH_USER_LIST,
});

export const changeValue = (input, value) => ({
  type: USER_CHANGE_FORM_VALUE,
  input,
  value,
});

export const deleteUser = (id) => ({
  type: USER_DELETE,
  id,
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

export const updateRole = (user, role) => {
  let userMap;
  let modRoles;
  const roles = fromJS(user.roles);
  const indexOfRole = roles.indexOf(role);
  if (indexOfRole > -1) {
    modRoles = roles.splice(indexOfRole, 1);
  } else {
    user.roles.push(role);
    modRoles = user.roles;
  }
  userMap = user;
  userMap.roles = modRoles;
  return {
    type: USER_UPDATE_FIELD,
    userMap,
  };
};

export const saveUserListEpic = (action$, store$) =>
  action$.ofType(USER_CREATE_NEW)
    .switchMap(() =>
      Observable.ajax(doIt(
        hosts.pk,
        'user/add',
        'POST',
        JSON.stringify(store$.getState().userContainer.userForm),
        true))
        .map(() => ({
          type: `${FETCH_USER_LIST}`,
          created: true,
        }))
        .catch(error =>
          Observable.of({
            type: `${USER_CREATE_NEW}_FAILED`,
            userError: error.xhr.response,
          }))
    );

export const updateUserEpic = (action$) =>
  action$.ofType(USER_UPDATE_FIELD)
    .switchMap(({ userMap }) =>
      Observable.ajax(doIt(hosts.pk, 'user/update', 'PUT',
        userMap, true))
        .map(() => ({
          type: `${FETCH_USER_LIST}`,
        }))
        .catch(error =>
          Observable.of({
            type: `${USER_UPDATE_FIELD}_FAILED`,
            userError: error.xhr.response,
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
        .catch(error =>
          Observable.of({
            type: `${FETCH_USER_LIST}_FAILED`,
            userError: error.xhr.response,
          }))
    );

export const deleteUserEpic = action$ =>
  action$.ofType(USER_DELETE)
  .switchMap((action) =>
    Observable.ajax(doIt(hosts.pk, `user/delete/${action.id}`, 'DELETE', {}))
      .map(() => ({
        type: FETCH_USER_LIST,
      }))
      .catch(error =>
        Observable.of({
          type: `${USER_DELETE}_FAILED`,
          userError: error.xhr.response,
        }))
  );
