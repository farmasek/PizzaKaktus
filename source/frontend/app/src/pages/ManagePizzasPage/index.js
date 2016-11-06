/**
 * Created by e-myslivost on 6.11.2016.
 */
import React from 'react';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import PizzaContainer from '../../containers/PizzaContainer';

// Pages map directly to Routes, i.e. one page equals on Route

const ManagePizzasPage = () => (
  <div className={styles.container}>
    <PizzaContainer/>

  </div>
);

export default cssModules(ManagePizzasPage, styles);
