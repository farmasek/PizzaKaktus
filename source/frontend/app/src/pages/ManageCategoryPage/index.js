import React from 'react';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import CategoryContainer from '../../containers/CategoryContainer';

// Pages map directly to Routes, i.e. one page equals on Route

const ManageCategoryPage = () => (
  <div className={styles.container}>
    <CategoryContainer/>
  </div>
);

export default cssModules(ManageCategoryPage, styles);
