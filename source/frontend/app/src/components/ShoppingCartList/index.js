import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import { IconButton } from 'react-toolbox/lib/button';

class ShoppingCartList extends Component {

  getTableRow = (pizza, index) =>
    <tr key={index}>
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
          icon="remove_shopping_cart"
          onClick={() => this.props.removeFromCart(pizza)}
        />
      </td>
    </tr>;

  getTotalPrice = () => {
    let total = 0;
    this.props.shoppingCart.map((pizza) => {
      total += pizza.price;
    });
    return total;
  };

  render() {
    let tableRows = new List();
    this.props.shoppingCart.map((pizza, index) => {
      tableRows = tableRows.push(this.getTableRow(pizza, index));
    });
    const totalPrice = this.getTotalPrice();
    return (
      <div className={styles.shoppingCartList}>
        <h1>Košík</h1>
        <table className={styles.shoppingCartTable}>
          <thead>
          <tr>
            <th className={`${styles.columnLeft} ${styles.titleColumn}`}>Název</th>
            <th className={`${styles.columnLeft} ${styles.ingredientsColumn}`}>Ingredience</th>
            <th className={styles.smallColumn}>Cena</th>
            <th className={styles.smallColumn}>Odebrat z košíku</th>
          </tr>
          </thead>
          <tbody>
          {
            tableRows.map(row => row)
          }
          </tbody>
        </table>
        <h2>Celková cena: { totalPrice } Kč</h2>
      </div>
    );
  }
}

ShoppingCartList.propTypes = {
  shoppingCart: PropTypes.array.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default cssModules(ShoppingCartList, styles);
