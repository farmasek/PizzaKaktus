import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import * as ShoppingCartActions from './actions';
import * as IngredientActions from '../IngredientContainer/actions';
import { Button } from 'react-toolbox/lib/button';
import ShoppingCartList from '../../components/ShoppingCartList/index';

class ShoppingCartDetail extends Component {

  componentWillMount() {
    this.props.ingredientsActions.fetchIngredientList();
    this.props.actions.fetchShoppingCart();
  }

  render() {
    return (
      <div>
        {
          this.props.shoppingCart.length > 0
            ?
            <div>
              <ShoppingCartList
                shoppingCart={this.props.shoppingCart}
                ingredients={this.props.ingredients}
                removeFromCart={(pizza) => this.props.actions.removeFromShoppingCart(pizza)}
                snackbar={this.props.snackbar}
                handleSnackbar={this.props.actions.handleSnackbar}
              />
              <Button primary label={"Objednat"} />
            </div>
            : <span>Košík je prázdný.</span>
        }
      </div>
    );
  }
}

ShoppingCartDetail.propTypes = {
  shoppingCart: PropTypes.array.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
  ingredientsActions: PropTypes.object,
  actions: PropTypes.object,
  snackbar: ImmutablePropTypes.record.isRequired,
};

const mapStateToProps = (state) => ({
  shoppingCart: state.shoppingCartContainer.shoppingCart,
  ingredients: state.ingredientContainer.ingredients,
  snackbar: state.shoppingCartContainer.snackbar,
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
});

const Container = cssModules(ShoppingCartDetail, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
