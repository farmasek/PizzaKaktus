import { Record } from 'immutable';

export const User = new Record({
  firstName: '',
  lastName: '',
  passwordHash: '',
  login: '',
  roles: {},
  phone: '',
});

export const mapUser = (user) => new User({
  firstName: user.firstName,
  lastName: user.lastName,
  passwordHash: user.passwordHash,
  login: user.login,
  roles: user.roles,
  phone: user.phone,
});

export const mapUserData = (firstName, lastName, passwordHash, login, roles, phone) => new User({
  firstName,
  lastName,
  passwordHash,
  login,
  roles,
  phone,
});
