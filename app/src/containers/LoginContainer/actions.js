import { LOGIN_DIALOG, LOGIN_FORM_CHANGE } from './constants';

export const toggleDialog = () => ({
  type: LOGIN_DIALOG,
});

export const loginChange = (name, value) => ({
  type: LOGIN_FORM_CHANGE,
  name,
  value,
});
