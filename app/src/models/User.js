import { Record } from 'immutable';

export const User = new Record({
  firstName: '',
  lastName: '',
  login: '',
  roles: {},
  phone: '',
  active: true,
});

export const mapUser = (user) => new User({
  firstName: user.firstName,
  lastName: user.lastName,
  login: user.login,
  roles: user.roles,
  phone: user.phone,
  active: user.active,
});
