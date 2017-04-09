import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import { Button } from 'react-toolbox/lib/button';
import * as styles from './index.module.scss';
import * as MenuActions from './actions';
import * as ShoppingCartActions from '../ShoppingCartDetail/actions';
import MenuList from '../../components/Menu';
import PizzaIngredientsDialog from '../../components/PizzaIngredientsDialog';

class MenuContainer extends Component {

  componentWillMount() {
    this.props.actions.fetchMenu();
  }

  customPizzaToCart = () => {
    this.props.shoppingCartActions.addToShoppingCart(this.props.customPizza);
    this.props.actions.toggleCustomPizzaForm();
  };

  render() {
    return (
      <div>
        <MenuList
          menu={this.props.menu}
          categories={this.props.categories}
          ingredients={this.props.ingredients}
          addToCart={(pizza) => this.props.shoppingCartActions.addToShoppingCart(pizza)}
          fetchCart={this.props.shoppingCartActions.fetchShoppingCart}
        />
        <PizzaIngredientsDialog
          editing={false}
          active={this.props.customActive}
          toggleDialog={this.props.actions.toggleCustomPizzaForm}
          editValue={this.props.actions.editCustomPizzaValue}
          confirmForm={() => this.customPizzaToCart()}
          pizza={this.props.customPizza}
          ingredients={this.props.ingredients}
          pizzaErrors={this.props.customPizzaErrors}
          pizzaValidation={this.props.actions.customPizzaValidation}
        />
        <Button
          className={styles.buttons}
          label={'Sestavit vlastní pizzu'}
          onClick={() => this.props.actions.toggleCustomPizzaForm()}
          raised primary
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
  shoppingCartActions: PropTypes.object,
  customPizza: ImmutablePropTypes.record.isRequired,
  customActive: PropTypes.bool.isRequired,
  customPizzaErrors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  menu: state.menuContainer.menu,
  categories: state.categoryContainer.categories,
  ingredients: state.ingredientContainer.ingredients,
  customPizza: state.menuContainer.customPizza,
  customActive: state.menuContainer.customActive,
  customPizzaErrors: state.menuContainer.customPizzaErrors,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    MenuActions,
    dispatch
  ),
  shoppingCartActions: bindActionCreators(
    ShoppingCartActions,
    dispatch
  ),
});

const Container = cssModules(MenuContainer, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
