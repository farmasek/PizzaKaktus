import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import { IconButton } from 'react-toolbox/lib/button';

class MenuList extends Component {

  componentWillMount() {
    this.props.fetchCart();
  }

  renderRow = (pizza) =>
    <tr key={pizza.id}>
      <td className={`${styles.columnLeft} ${styles.titleColumn}`}>{pizza.title}</td>
      <td className={`${styles.columnLeft} ${styles.ingredientsColumn}`}>
        <ul className={styles.ingredientsList}>
          {
            this.props.ingredients.size > 0
              ? pizza.ingredientsId.map(
              (ingredient) => <li className={styles.ingredient} key={ingredient}>
                { this.props.ingredients.get(ingredient).get('name') }
              </li>
            )
              : pizza.ingredientsId
          }
        </ul>
      </td>
      <td className={styles.smallColumn}>
        { pizza.price }
      </td>
      <td className={styles.smallColumn}>
        <IconButton
          icon="add_shopping_cart"
          onClick={() => this.props.addToCart(pizza)}
        />
      </td>
    </tr>;

  render() {
    const { menu } = this.props;
    return (
      <div>
        <table className={styles.menuListTable}>
          <thead>
          <tr>
            <th className={`${styles.columnLeft} ${styles.titleColumn}`}>Název</th>
            <th className={`${styles.columnLeft} ${styles.ingredientsColumn}`}>Ingredience</th>
            <th className={styles.smallColumn}>Cena</th>
            <th className={styles.smallColumn}>Vložit do košíku</th>
          </tr>
          </thead>
          <tbody>
          {
            menu.map(menuItem => this.renderRow(menuItem))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

MenuList.propTypes = {
  menu: ImmutablePropTypes.list,
  categories: ImmutablePropTypes.map.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
  addToCart: PropTypes.func.isRequired,
  fetchCart: PropTypes.func.isRequired,
};

export default cssModules(MenuList, styles);
