import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List, fromJS } from 'immutable';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import { IconButton } from 'react-toolbox/lib/button';

class ShoppingCartList extends Component {

  getPizzaPrice = (pizza, index) => {
    let price = pizza.price;
    const pizzaIngredients = fromJS(pizza.ingredientsId);
    const editIngredients = this.props.ingredientsCart.get(index);
    if (this.props.ingredients.size > 0) {
      editIngredients.map(ingredient => {
        if (!pizzaIngredients.includes(ingredient)) {
          price += this.props.ingredients.get(ingredient).cost;
        }
      });
      pizzaIngredients.map(ingredient => {
        if (!editIngredients.includes(ingredient)) {
          price -= this.props.ingredients.get(ingredient).cost;
        }
      });
    }
    return price;
  };

  getTableRow = (pizza, index, price) =>
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
        { price }
      </td>
      <td className={styles.smallColumn}>
        <IconButton
          icon="compare_arrows"
          onClick={() => this.props.select(index)}
        />
      </td>
      <td className={styles.smallColumn}>
        <IconButton
          icon="remove_shopping_cart"
          onClick={() => this.props.removeFromCart(index)}
        />
      </td>
    </tr>;

  getTotalPrice = () => {
    let total = 0;
    this.props.shoppingCart.forEach((value, key) => {
      total += this.getPizzaPrice(value, key);
    });
    return total;
  };

  render() {
    let tableRows = new List();
    this.props.shoppingCart.forEach((value, key) => {
      tableRows = tableRows.push(this.getTableRow(value, key, this.getPizzaPrice(value, key)));
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
            <th>Editovat ingredience</th>
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
  shoppingCart: ImmutablePropTypes.map.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
  ingredientsCart: ImmutablePropTypes.map.isRequired,
};

export default cssModules(ShoppingCartList, styles);
