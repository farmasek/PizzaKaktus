import React, { PropTypes, Component } from 'react';

import styles from './index.module.scss';
import cssModules from 'react-css-modules';

class IngredientList extends Component { // eslint-disable-line react/prefer-stateless-function

  renderRow = (ingredient) =>
    <tr key={ingredient.id}>
      <td className={styles.columnLeft}>
        {ingredient.name}
      </td>
      <td>
        {ingredient.amount}
      </td>
      <td>
        {ingredient.cost}
      </td>
      <td>
        {ingredient.costCustom}
      </td>
    </tr>;

  render() {
    return (
      <div className={styles.ingredientList}>
        <h1>Seznam ingrediencí</h1>
        <table className={styles.ingredientListTable}>
          <thead>
          <tr>
            <th className={styles.columnLeft}>Název</th>
            <th>Množství</th>
            <th>Cena</th>
            <th>Cena přídavku</th>
          </tr>
          </thead>
          <tbody>
          { this.props.ingredients.toIndexedSeq().map(
            (ingredient) => this.renderRow(ingredient)) }
          </tbody>
        </table>
      </div>);
  }
}

IngredientList.propTypes = {
  ingredients: PropTypes.object.isRequired,
};

export default cssModules(IngredientList, styles);