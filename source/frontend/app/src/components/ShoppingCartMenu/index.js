import React from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import FontIcon from 'react-toolbox/lib/font_icon';
import { Link } from 'react-router';

const ShoppingCartMenu = () => (
  <div className={styles.shoppingCartMenu}>
    <Link to="/cart">
      <FontIcon value={"shopping_cart"} className={styles.cartIcon} />
      <div className={styles.caption}>Košík</div>
    </Link>
  </div>
);

export default cssModules(ShoppingCartMenu, styles);
