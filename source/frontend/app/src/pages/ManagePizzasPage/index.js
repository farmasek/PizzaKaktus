/**
 * Created by e-myslivost on 6.11.2016.
 */
import React from 'react';
import cssModules from 'react-css-modules';
import * as styles from './index.module.scss';
import PizzaContainer from '../../containers/PizzaContainer';
import CheckPermission from '../../containers/CheckPermission';

const ManagePizzasPage = () => (
  <CheckPermission permissions={['ADMIN']} redirect>
    <div className={styles.container}>
      <PizzaContainer/>
    </div>
  </CheckPermission>
);

export default cssModules(ManagePizzasPage, styles);
