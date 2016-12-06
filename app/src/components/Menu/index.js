import React, { PropTypes, Component } from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import MenuList from './MenuList/index';

class Menu extends Component {

  render() {
    return (
      <div>
        <MenuList />
      </div>);
  }
}

Menu.propTypes = {
};

export default cssModules(Menu, styles);
