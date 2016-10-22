import React from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Navigation from 'react-toolbox/lib/navigation';
import { Link } from 'react-router';

const Navbar = () => (
  <div>
    <Navigation type="horizontal">
      <Link to="/manager">Manager page</Link>
      <Link to="#">Second page</Link>
    </Navigation>
  </div>
);

export default cssModules(Navbar, styles);
