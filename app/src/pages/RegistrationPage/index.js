import React from 'react';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import RegistrationContainer from '../../containers/RegistrationContainer';

// Pages map directly to Routes, i.e. one page equals on Route

const RegistrationPage = () => (
  <div>
    <RegistrationContainer />
  </div>
);

export default cssModules(RegistrationPage, styles);
