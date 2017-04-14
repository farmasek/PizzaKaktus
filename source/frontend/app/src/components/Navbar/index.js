import React from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Navigation from 'react-toolbox/lib/navigation';
import { Link } from 'react-router';
import ShoppingCartMenu from '../ShoppingCartMenu/index';
import CheckPermissions from '../../containers/CheckPermission';
import FontIcon from 'react-toolbox/lib/font_icon';

const Navbar = () => (
  <div>
    <Navigation type="horizontal">

      {/* ZÁKAZNÍK  */}
      <div className={styles.categories}>
        <Link to="/menu">
          <FontIcon value={"import_contacts"} className={styles.icon} />
          <div className={styles.caption}>Nabídka</div>
        </Link>
      </div>
      <ShoppingCartMenu />

      {/* ZAMĚSTNANEC */}
      <CheckPermissions permissions={['EMPLOYEE', 'ADMIN']}>
        <div className={styles.categories}>
          <Link to="/manage/orders">
            <FontIcon value={"indeterminate_check_box"} className={styles.icon} />
            <div className={styles.caption}>Správa objednávek</div>
          </Link>
        </div>
      </CheckPermissions>

      {/* MAJITEL */}
      <CheckPermissions permissions={['ADMIN']}>
        <div className={styles.categories}>
          <Link to="/manager/ingredients">
            <FontIcon value={"restaurant"} className={styles.icon} />
            <div className={styles.caption}>Správa ingrediencí</div>
          </Link>
        </div>
      </CheckPermissions>
      <CheckPermissions permissions={['ADMIN']}>
        <div className={styles.categories}>
          <Link to="/manager/users">
            <FontIcon value={"account_box"} className={styles.icon} />
            <div className={styles.caption}>Správa uživatelů</div>
          </Link>
        </div>
      </CheckPermissions>
      <CheckPermissions permissions={['ADMIN']}>
        <div className={styles.categories}>
          <Link to="/manager/category">
            <FontIcon value={"description"} className={styles.icon} />
            <div className={styles.caption}>Správa kategorií</div>
          </Link>
        </div>
      </CheckPermissions>
      <CheckPermissions permissions={['ADMIN']}>
        <div className={styles.categories}>
          <Link to="/manager/pizzas">
            <FontIcon value={"local_pizza"} className={styles.icon} />
            <div className={styles.caption}>Správa pizz</div>
          </Link>
        </div>
      </CheckPermissions>
      <CheckPermissions permissions={['ADMIN']}>
        <div className={styles.categories}>
          <Link to="/manager/orders/history">
            <FontIcon value={"check_box"} className={styles.icon} />
            <div className={styles.caption}>Historie objednávek</div>
          </Link>
        </div>
      </CheckPermissions>
      <CheckPermissions permissions={['ADMIN']}>
        <div className={styles.categories}>
          <Link to="/manager/orders/statistics">
            <FontIcon value={"dashboard"} className={styles.icon} />
            <div className={styles.caption}>Statistiky</div>
          </Link>
        </div>
      </CheckPermissions>

    </Navigation>
  </div>
);

export default cssModules(Navbar, styles);
