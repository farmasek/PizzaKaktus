import React from 'react';
import cssModules from 'react-css-modules';
import * as styles from './index.module.scss';
import CategoryContainer from '../../containers/CategoryContainer';
import CheckPermission from '../../containers/CheckPermission';

const ManageCategoryPage = () => (
  <CheckPermission permissions={['ADMIN']} redirect>
    <div className={styles.container}>
      <CategoryContainer/>
    </div>
  </CheckPermission>
);

export default cssModules(ManageCategoryPage, styles);
