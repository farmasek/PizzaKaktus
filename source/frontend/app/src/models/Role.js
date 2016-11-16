import { Record } from 'immutable';

export const Role = new Record({
  id: null,
  role: '',
});

export const mapRole = (role) => new Role({
  id: role.id,
  role: role.role,
});

export const mapRoleData = (id, role) => new Role({
  id,
  role
});
