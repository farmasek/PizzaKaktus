import React from 'react';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import UserContainer from '../../containers/UserContainer/index';
import CheckPermission from '../../containers/CheckPermission';

const ManageUsersPage = () => (
  <CheckPermission permissions={['ADMIN']} redirect>
    <div className={styles.container}>
      <UserContainer/>
    </div>
  </CheckPermission>
);

export default cssModules(ManageUsersPage, styles);
