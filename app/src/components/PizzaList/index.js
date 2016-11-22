import React, { PropTypes } from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Checkbox from 'react-toolbox/lib/checkbox';
import { IconButton } from 'react-toolbox/lib/button';

class PizzaList extends React.Component {

  renderRow = (pizza) =>
    <tr key={pizza.id}>
      <td>{pizza.title}</td>
      <td>
        {
          this.props.categories.size > 0
            ? this.props.categories.get(pizza.categoryId).get('name')
            : pizza.categoryId
        }
      </td>
      <td>
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
      <td>
        { pizza.get('price') }
      </td>
      <td>
        {
          pizza.active.toString() === 'true'
            ?
            <Checkbox
              checked={pizza.active}
              onChange={() => this.props.updatePizza(pizza, 'active', false)}
            />
            :
            <Checkbox checked={pizza.active} disabled={!pizza.active} className={styles.disabled} />
        }
      </td>
      <td>
        <IconButton icon="input" onClick={() => this.props.copyPizza(pizza)} />
      </td>
    </tr>;

  render() {
    return (
      <div className={styles.pizzaList}>
        <h1>Seznam pizz</h1>
        <table className={styles.pizzaListTable}>
          <thead>
          <tr>
            <th>Název</th>
            <th>Kategorie</th>
            <th>Ingredience</th>
            <th>Cena</th>
            <th>Aktivní</th>
            <th>Kopírovat</th>
          </tr>
          </thead>
          <tbody>
          { this.props.pizzas.toIndexedSeq().map(
            (pizza) => this.renderRow(pizza)) }
          </tbody>
        </table>
      </div>);
  }
}

PizzaList.propTypes = {
  pizzas: ImmutablePropTypes.map.isRequired,
  categories: ImmutablePropTypes.map.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
  updatePizza: PropTypes.func.isRequired,
  copyPizza: PropTypes.func.isRequired,
};

export default cssModules(PizzaList, styles);
