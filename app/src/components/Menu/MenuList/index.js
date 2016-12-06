import React, { PropTypes, Component } from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';

class MenuList extends Component {

  render() {
    return (
      <table className={styles.menuList}>
        <tr>
          <th>Název</th>
          <th>Ingredience</th>
          <th>Cena</th>
          <th>Vložit do košíku</th>
        </tr>
      </table>);
  }
}

MenuList.propTypes = {
};

export default cssModules(MenuList, styles);
