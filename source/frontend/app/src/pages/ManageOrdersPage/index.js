/**
 * Created by e-myslivost on 6.11.2016.
 */
import React from 'react';
import cssModules from 'react-css-modules';
import * as styles from './index.module.scss';
import OrderContainer from '../../containers/OrderContainer';

// Pages map directly to Routes, i.e. one page equals on Route

const ManageOrdersPage = () => (
  <div className={styles.container}>
    <OrderContainer/>
  </div>
);

export default cssModules(ManageOrdersPage, styles);
