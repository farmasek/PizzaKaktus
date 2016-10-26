import React from 'react';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import UserContainer from '../../containers/UserContainer/index';

// Pages map directly to Routes, i.e. one page equals on Route

const ManageUsersPage = () => (
  <div>
    <UserContainer />
  </div>
);

export default cssModules(ManageUsersPage, styles);
