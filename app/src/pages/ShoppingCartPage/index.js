import React from 'react';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import ShoppingCartDetail from '../../containers/ShoppingCartDetail/index';

// Pages map directly to Routes, i.e. one page equals on Route

const ShoppingCartPage = () => (
  <div>
    <ShoppingCartDetail />
  </div>
);

export default cssModules(ShoppingCartPage, styles);
