/**
 * Created by e-myslivost on 6.11.2016.
 */
import React from 'react';
import cssModules from 'react-css-modules';
import * as styles from './index.module.scss';
import StatisticsContainer from '../../containers/StatisticsContainer';
import CheckPermission from '../../containers/CheckPermission';

const ManagerStatisticsPage = () => (
  <CheckPermission permissions={['ADMIN']} redirect>
    <div className={styles.container}>
      <StatisticsContainer />
    </div>
  </CheckPermission>
);

export default cssModules(ManagerStatisticsPage, styles);
