import React from 'react';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import IngredientContainer from '../../containers/IngredientContainer';

// Pages map directly to Routes, i.e. one page equals on Route

const ManagerPage = () => (
  <div className={styles.container}>
    <IngredientContainer/>
  </div>
);

export default cssModules(ManagerPage, styles);
