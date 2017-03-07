import React from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Navigation from 'react-toolbox/lib/navigation';
import { Link } from 'react-router';
import ShoppingCartMenu from '../ShoppingCartMenu/index';

const Navbar = () => (
  <div>
    <Navigation type="horizontal">
      <span>Menu uživatele&nbsp;&nbsp;</span>
      <Link to="/menu">Menu</Link>&nbsp;
      <ShoppingCartMenu />
      <span>Menu majitele&nbsp;&nbsp;</span>
      <Link to="/manager/ingredients">Správa ingrediencí</Link>&nbsp;
      <Link to="/manager/users">Správa uživatelů</Link>&nbsp;
      <Link to="/manager/category">Správa kategorií</Link>&nbsp;
      <Link to="/manager/pizzas">Správa pizz</Link>&nbsp;
      <Link to="/manager/orders/history">Historie objednávek</Link>&nbsp;
      <Link to="/manager/change-pw">změna hesla</Link>&nbsp;
    </Navigation>
  </div>
);

export default cssModules(Navbar, styles);
