import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import * as styles from './index.module.scss';
import * as ShoppingCartActions from './actions';
import * as IngredientActions from '../IngredientContainer/actions';
import { Button } from 'react-toolbox/lib/button';
import ShoppingCartList from '../../components/ShoppingCartList/index';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import Dialog from 'react-toolbox/lib/dialog';
import CustomerForm from '../../components/CustomerForm';
import PizzaIngredientsDialog from '../../components/PizzaIngredientsDialog';

class ShoppingCartDetail extends Component {

  componentWillMount() {
    this.props.ingredientsActions.fetchIngredientList();
    this.props.actions.fetchShoppingCart();
  }

  validateState() {
    let valid = true;
    this.props.actions.editCustomerErrorField('resetator', 'done ');
    if (this.props.customer.get('name') === '') {
      this.props.actions.editCustomerErrorField('name', 'Je nutné vyplnit');
      valid = false;
    }
    if (this.props.customer.get('surname') === '') {
      this.props.actions.editCustomerErrorField('surname', 'Je nutné vyplnit');
      valid = false;
    }
    if (this.props.customer.get('email') === '') {
      this.props.actions.editCustomerErrorField('email', 'Je nutné vyplnit');
      valid = false;
    }
    if (this.props.customer.get('phone') === '') {
      this.props.actions.editCustomerErrorField('phone', 'Je nutné vyplnit');
      valid = false;
    }
    if (this.props.customer.get('city') === '') {
      this.props.actions.editCustomerErrorField('city', 'Je nutné vyplnit');
      valid = false;
    }
    if (this.props.customer.get('street') === '') {
      this.props.actions.editCustomerErrorField('street', 'Je nutné vyplnit');
      valid = false;
    }
    if (this.props.customer.get('zip') === '') {
      this.props.actions.editCustomerErrorField('zip', 'Je nutné vyplnit');
      valid = false;
    }
    return valid;
  }

  confirmDialog() {
    if (this.validateState()) {
      this.props.actions.sendOrder(this.props.cart, this.props.customer);
    }
  }

  handleConfirm = (event) =>
    event.key === 'Enter' ? this.confirmDialog() : null;

  render() {
    return (
      <div className={styles.emptyCart}>
        {
          this.props.cart.size > 0
            ?
            <div>
              <ShoppingCartList
                shoppingCart={this.props.cart}
                ingredients={this.props.ingredients}
                removeFromCart={(pizza) => this.props.actions.removeFromShoppingCart(pizza)}
                select={this.props.actions.selectPizzaToEditIngredients}
              />
              <CustomerForm
                isLoadingUser={this.props.isLoadingUser}
                editCustomerField={this.props.actions.editCustomerField}
                handleConfirm={(event) => this.handleConfirm(event)}
                customerError={this.props.customerError}
                customer={this.props.customer}
              />
              <Button
                className={styles.buttonRemove}
                label={"Vysypat košík"}
                onClick={() => this.props.actions.handleDialog(true)}
                raised
              />
              <Button
                className={styles.buttonConfirm}
                primary
                raised
                label={"Objednat"}
                onClick={() => this.confirmDialog()}
              />
              { this.props.sending && <ProgressBar type="circular" mode="indeterminate" /> }
              <PizzaIngredientsDialog
                editing
                ownPizza={this.props.ownPizza}
                index={this.props.selected}
                cart={this.props.cart}
                ingredients={this.props.ingredients}
                toggleDialog={this.props.actions.toggleDialog}
                active={this.props.active}
                changePizzaIngredients={(index, ingredientId) =>
                  this.props.actions.changePizzaIngredients(index, ingredientId)}
              />
              <Dialog
                actions={[
                  {
                    label: 'Zrušit', onClick: () =>
                    this.props.actions.handleDialog(false),
                  },
                  {
                    label: 'Potvrdit', onClick: () =>
                    this.props.actions.emptyShoppingCart(),
                  },
                ]}
                active={this.props.dialog.showDialog}
                onEscKeyDown={() => this.props.actions.handleDialog(false)}
                onOverlayClick={() => this.props.actions.handleDialog(false)}
                title={'Vysypat košík'}
              >
                <p>Opravdu chcete vysypat košík? Tato akce je nevratná.</p>
              </Dialog>
            </div>
            : <h2>Košík je prázdný.</h2>
        }
      </div>
    );
  }
}

ShoppingCartDetail.propTypes = {
  cart: ImmutablePropTypes.map.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
  ingredientsActions: PropTypes.object,
  actions: PropTypes.object,
  dialog: PropTypes.object,
  customer: PropTypes.any,
  isLoadingUser: PropTypes.bool,
  customerError: PropTypes.any,
  active: PropTypes.bool.isRequired,
  selected: PropTypes.number.isRequired,
  sending: PropTypes.bool.isRequired,
  ownPizza: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.shoppingCartContainer.cart,
  ingredients: state.ingredientContainer.ingredients,
  dialog: state.shoppingCartContainer.dialog,
  customer: state.shoppingCartContainer.customer,
  customerError: state.shoppingCartContainer.customerError,
  isLoadingUser: state.shoppingCartContainer.isLoading,
  active: state.shoppingCartContainer.active,
  selected: state.shoppingCartContainer.selected,
  sending: state.shoppingCartContainer.sending,
  ownPizza: state.shoppingCartContainer.ownPizza,
});

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
