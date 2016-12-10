import React, { PropTypes } from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Checkbox from 'react-toolbox/lib/checkbox';
import { IconButton } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';

class PizzaList extends React.Component {

  renderRow = (pizza) =>
    <tr key={pizza.id}>
      <td className={styles.columnLeft} >{pizza.title}</td>
      <td className={styles.columnLeft}>
        {
          this.props.categories.size > 0
            ? this.props.categories.get(pizza.categoryId).get('name')
            : pizza.categoryId
        }
      </td>
      <td className={styles.columnLeft}>
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
              onChange={() => this.props.handleDialog(true, pizza)}
            />
            :
            <Checkbox checked={pizza.active} disabled={!pizza.active} className={styles.disabled}/>
        }
      </td>
      <td>
        <IconButton icon="input" onClick={() => this.props.copyPizza(pizza)}/>
      </td>
    </tr>;

  renderNumberLine = (numberOfPages) => {
    const numbers = [];
    const selectedPage = this.props.pagination.get('number');
    for (let i = 0; i < numberOfPages; i++) {
      numbers.push(<span
        className={i === selectedPage ? styles.paginationSelected : styles.paginationNormal}
        onClick={() => this.props.changePagination('number', i)}
      >
        {i + 1}
        </span>);
    }
    return numbers.map(n => n);
  };

  render() {
    const pagination = this.props.pagination;
    const arrow = pagination.get('sortDir') === 'ASC' ? '↑' : '↓';
    return (
      <div className={styles.pizzaList}>
        <h1>Seznam pizz</h1>
        <table className={styles.pizzaListTable}>
          <thead>
          <tr>
            <th
              className={styles.tableHeaderSortable}
              onClick={() => this.props.changePagination('sortBy', 'title')}
            >
              Název{pagination.get('sortBy') === 'title' ? arrow : null}
            </th>
            <th
              className={styles.tableHeaderSortable}
              onClick={() => this.props.changePagination('sortBy', 'category_id')}
            >
              Kategorie{pagination.get('sortBy') === 'category_id' ? arrow : null}
            </th>
            <th>
              Ingredience
            </th>
            <th
              className={styles.tableHeaderSortable}
              onClick={() => this.props.changePagination('sortBy', 'price')}
            >
              Cena{pagination.get('sortBy') === 'price' ? arrow : null}
            </th>
            <th
              className={styles.tableHeaderSortable}
              onClick={() => this.props.changePagination('sortBy', 'active')}
            >
              Aktivní{pagination.get('sortBy') === 'active' ? arrow : null}
            </th>
            <th>Kopírovat</th>
          </tr>
          </thead>
          <tbody>
          { this.props.pizzas.toIndexedSeq().map(
            (pizza) => this.renderRow(pizza)) }
          </tbody>
        </table>

        <div className={styles.paginationLane}>
          <Input
            className={styles.sortName}
            label="filtr"
            type="text" value={pagination.get('filterBy')}
            onChange={(val) => this.props.changePagination('filterBy', val)}
          />
          <Input
            className={styles.sortSize}
            label="počet"
            type="number" value={pagination.get('size')}
            onChange={(val) => this.props.changePagination('size', val)}
          />
          {
            pagination.get('totalPages') > 0 ? this.renderNumberLine(pagination.get('totalPages')) :
              pagination.get('totalPages')
          }
        </div>
      </div>);
  }
}

PizzaList.propTypes = {
  pizzas: ImmutablePropTypes.map.isRequired,
  categories: ImmutablePropTypes.map.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
  pagination: ImmutablePropTypes.map.isRequired,
  updatePizza: PropTypes.func.isRequired,
  copyPizza: PropTypes.func.isRequired,
  changePagination: PropTypes.func.isRequired,
  handleDialog: PropTypes.func.isRequired,
};

export default cssModules(PizzaList, styles);
