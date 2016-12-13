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
              <CustomerForm
                editCustomerField={this.props.actions.editCustomerField}
                editCustomerErrorField={this.props.actions.editCustomerErrorField}
                customerError={this.props.customerError}
                customer={this.props.customer}
              />

              <Button label={"Vysypat košík"} onClick={() =>
                this.props.actions.handleDialog(true)}
              />
              <Button primary label={"Objednat"}/>
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
  snackbar: ImmutablePropTypes.record.isRequired,
  dialog: PropTypes.object,
  customer: PropTypes.any,
  customerError: PropTypes.any,
};

const mapStateToProps = (state) => ({
  shoppingCart: state.shoppingCartContainer.shoppingCart,
  ingredients: state.ingredientContainer.ingredients,
  snackbar: state.shoppingCartContainer.snackbar,
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
