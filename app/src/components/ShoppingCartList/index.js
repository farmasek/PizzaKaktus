import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import { Snackbar } from 'react-toolbox/lib/snackbar';
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

  render() {
    let tableRows = new List();
    this.props.shoppingCart.map((pizza, index) => {
      tableRows = tableRows.push(this.getTableRow(pizza, index));
    });
    return (
      <div>
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
        <Snackbar
          active={ this.props.snackbar.get('showSnackbar') }
          icon={ this.props.snackbar.get('icon') }
          label={ this.props.snackbar.get('label') }
          action={ "Zavřít" }
          onClick={ () => this.props.handleSnackbar(false) }
          ref="snackbar"
          type="accept"
        />
      </div>
    );
  }
}

ShoppingCartList.propTypes = {
  shoppingCart: PropTypes.array.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  snackbar: ImmutablePropTypes.record.isRequired,
  handleSnackbar: PropTypes.func.isRequired,
};

export default cssModules(ShoppingCartList, styles);
