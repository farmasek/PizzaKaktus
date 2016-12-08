import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import * as ShoppingCartActions from './actions';
import * as IngredientActions from '../IngredientContainer/actions';
import * as CategoryActions from '../CategoryContainer/actions';
import Menu from '../../components/Menu';

class MenuContainer extends Component {

  componentWillMount() {
    this.props.categoryActions.fetchCategoryList();
    this.props.ingredientsActions.fetchIngredientList();
    this.props.actions.fetchMenu();
  }

  render() {
    return (
      <div>
        <Menu
          menu={this.props.menu}
          categories={this.props.categories}
          ingredients={this.props.ingredients}
        />
      </div>
    );
  }
}

MenuContainer.propTypes = {
  menu: ImmutablePropTypes.list,
  categories: ImmutablePropTypes.map.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.object,
  ingredientsActions: PropTypes.object,
  categoryActions: PropTypes.object,
};

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = (state) => ({
  menu: state.menuContainer.menu,
  categories: state.categoryContainer.categories,
  ingredients: state.ingredientContainer.ingredients,
});

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    ShoppingCartActions,
    dispatch
  ),
  ingredientsActions: bindActionCreators(
    IngredientActions,
    dispatch
  ),
  categoryActions: bindActionCreators(
    CategoryActions,
    dispatch
  ),
});

const Container = cssModules(MenuContainer, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
