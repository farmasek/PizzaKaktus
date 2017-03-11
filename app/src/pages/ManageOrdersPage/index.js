/**
 * Created by e-myslivost on 6.11.2016.
 */
import React from 'react';
import cssModules from 'react-css-modules';
import * as styles from './index.module.scss';
import OrderContainer from '../../containers/OrderContainer';
import CheckPermission from '../../containers/CheckPermission';

const ManageOrdersPage = () => (
  <CheckPermission permissions={['ADMIN']} redirect>
    <div className={styles.container}>
      <OrderContainer/>
    </div>
  </CheckPermission>
);

export default cssModules(ManageOrdersPage, styles);
