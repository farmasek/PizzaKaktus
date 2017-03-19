/**
 * Created by e-myslivost on 6.11.2016.
 */
import React from 'react';
import cssModules from 'react-css-modules';
import * as styles from './index.module.scss';
import HistoryContainer from '../../containers/HistoryContainer';
import CheckPermission from '../../containers/CheckPermission';

const ManagerHistoryPage = () => (
  <CheckPermission permissions={['ADMIN']} redirect>
    <div className={styles.container}>
      <HistoryContainer />
    </div>
  </CheckPermission>
);

export default cssModules(ManagerHistoryPage, styles);
