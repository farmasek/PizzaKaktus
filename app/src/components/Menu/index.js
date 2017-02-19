import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import MenuList from './MenuList/index';

class Menu extends Component {

  getPizzasFromCategory(category) {
    let pizzasFromCategory = new List();
    const menu = this.props.menu;
    menu.map(pizza => {
      if (this.props.categories.get(pizza.categoryId).get('name') === category) {
        pizzasFromCategory = pizzasFromCategory.push(pizza);
      }
    });
    return pizzasFromCategory;
  }

  render() {
    const categories = this.props.categories.toIndexedSeq();
    let categoriesWithItems = new List();
    categories.forEach(category => {
      if (this.getPizzasFromCategory(category.get('name')).size > 0) {
        categoriesWithItems = categoriesWithItems.push(<div key={category.get('id')}>
          <h2>{category.get('name')}</h2>
          <MenuList
            menu={this.getPizzasFromCategory(category.get('name'))}
            categories={this.props.categories}
            ingredients={this.props.ingredients}
            addToCart={this.props.addToCart}
            fetchCart={this.props.fetchCart}
          />
        </div>);
      }
    });
    return (
      <div>
        <h1>Nabídka</h1>
        {
          categoriesWithItems.map(category => category)
        }
      </div>);
  }
}

Menu.propTypes = {
  menu: ImmutablePropTypes.list.isRequired,
  categories: ImmutablePropTypes.map.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
  addToCart: PropTypes.func.isRequired,
  fetchCart: PropTypes.func.isRequired,
};

export default cssModules(Menu, styles);
