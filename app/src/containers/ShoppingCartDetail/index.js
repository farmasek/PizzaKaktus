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
import Dialog from 'react-toolbox/lib/dialog';
import CustomerForm from '../../components/CustomerForm';

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
      this.props.actions.sendOrder(this.props.shoppingCart, this.props.customer);
    }
  }

  handleConfirm = (event) =>
    event.key === 'Enter' ? this.confirmDialog() : null;

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
              />
              <CustomerForm
                editCustomerField={this.props.actions.editCustomerField}
                handleConfirm={(event) => this.handleConfirm(event)}
                customerError={this.props.customerError}
                customer={this.props.customer}
              />
              <Button label={"Vysypat košík"} onClick={() =>
                this.props.actions.handleDialog(true)}
              />
              <Button primary label={"Objednat"} onClick={() =>
                this.confirmDialog()}
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
  dialog: PropTypes.object,
  customer: PropTypes.any,
  customerError: PropTypes.any,
};

const mapStateToProps = (state) => ({
  shoppingCart: state.shoppingCartContainer.shoppingCart,
  ingredients: state.ingredientContainer.ingredients,
  dialog: state.shoppingCartContainer.dialog,
  customer: state.shoppingCartContainer.customer,
  customerError: state.shoppingCartContainer.customerError,
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
