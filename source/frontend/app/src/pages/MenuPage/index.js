import React from 'react';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import MenuContainer from '../../containers/MenuContainer/index';

// Pages map directly to Routes, i.e. one page equals on Route

const MenuPage = () => (
  <div>
    <MenuContainer />
  </div>
);

export default cssModules(MenuPage, styles);
