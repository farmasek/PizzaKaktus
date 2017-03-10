import React from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Navigation from 'react-toolbox/lib/navigation';
import { Link } from 'react-router';
import ShoppingCartMenu from '../ShoppingCartMenu/index';
import CheckPermissions from '../../containers/CheckPermission';

const Navbar = () => (
  <div>
    <Navigation type="vertical">

      {/* ZÁKAZNÍK  */}
      <Link to="/menu">Menu</Link>
      <ShoppingCartMenu />

      {/* ZAMĚSTNANEC */}
      <CheckPermissions permissions={['EMPLOYEE', 'ADMIN']}>
        <Link to="/">Správa objednávek</Link>
      </CheckPermissions>

      {/* MAJITEL */}
      <CheckPermissions permissions={['ADMIN']}>
        <Link to="/manager/ingredients">Správa ingrediencí</Link>
      </CheckPermissions>
      <CheckPermissions permissions={['ADMIN']}>
        <Link to="/manager/users">Správa uživatelů</Link>
      </CheckPermissions>
      <CheckPermissions permissions={['ADMIN']}>
        <Link to="/manager/category">Správa kategorií</Link>
      </CheckPermissions>
      <CheckPermissions permissions={['ADMIN']}>
        <Link to="/manager/pizzas">Správa pizz</Link>
      </CheckPermissions>
      <CheckPermissions permissions={['ADMIN']}>
        <Link to="/manager/orders/history">Historie objednávek</Link>
      </CheckPermissions>

    </Navigation>
  </div>
);

export default cssModules(Navbar, styles);
