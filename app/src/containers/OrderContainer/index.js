import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActionCreators from './actions';
import cssModules from 'react-css-modules';
import Dialog from 'react-toolbox/lib/dialog';
import { List } from 'immutable';
import * as styles from './index.module.scss';
import OrderTable from '../../components/ManageOrdersTable';
import { statuses } from '../../models/Order';

class OrderContainer extends Component {

  componentWillMount() {
    this.props.actions.fetchOrders();
  }

  getIngredientsList = (orderItem) => {
    const list = [];
    if (this.props.ingredients && this.props.pizzas) {
      const orderIngredients = orderItem.ingredientsIds.length > 0
        ? orderItem.ingredientsIds
        : this.props.pizzas.get(orderItem.pizzaId).ingredientsId;
      orderIngredients.map((ingredientId) => list.push(
        <li key={ingredientId} className={styles.ingredient}>
          { this.props.ingredients.get(ingredientId).name }
        </li>
      ));
    }
    return list;
  };

  handleCancelOrder = (order) => {
    let changes = new List();
    changes = changes.push(order.set('orderStatus', statuses.CANCELLED));
    this.props.actions.changeOrderStatuses(changes);
  };

  render() {
    const detailOrder = this.props.detailOrder;
    const detailPizzas = [];
    let orderPrice = 0;
    detailOrder.orderCart.map((orderItem, index) => {
      const pizzaPrice = this.props.pizzas.get(orderItem.pizzaId).price;
      orderPrice += pizzaPrice;
      return detailPizzas.push(<div key={index} className={styles.orderDetailWrapper}>
      <span>{
        this.props.pizzas.get(orderItem.pizzaId)
          ? this.props.pizzas.get(orderItem.pizzaId).title
          : ''
      } - </span>
        <ul className={styles.ingredientsList}>
          { this.getIngredientsList(orderItem) }
        </ul>
        &nbsp;({ pizzaPrice } Kč)
      </div>);
    });
    return (
      <div>
        {
          this.props.orders.size > 0
            ? <OrderTable
              orders={this.props.orders}
              pizzas={this.props.pizzas}
              checkboxes={this.props.checkboxes}
              handleOrderCheckbox={this.props.actions.orderCheckboxChange}
              handleOrderStatuses={this.props.actions.changeOrderStatuses}
              orderCancel={this.props.actions.orderCancel}
              showDetail={this.props.actions.toggleOrderDetail}
            />
            : <h2>Nebyly nalezeny žádné objednávky k vyřízení.</h2>
        }
        <Dialog
          actions={[
            { label: 'Zrušit', onClick: () =>
              this.props.actions.handleDialog() },
            { label: 'Potvrdit', onClick: () =>
              this.handleCancelOrder(this.props.cancel) },
          ]}
          active={this.props.dialog}
          onEscKeyDown={() => this.props.actions.handleDialog()}
          onOverlayClick={() => this.props.actions.handleDialog()}
          title={'Storno objednávky'}
        >
          <p>Opravdu chcete stornovat vybranou objednávku? Tato akce je nevratná.</p>
        </Dialog>
        <Dialog
          className={styles.orderDetails}
          actions={[
            { label: 'Zavřít', onClick: () =>
              this.props.actions.toggleOrderDetail() },
          ]}
          active={this.props.detail}
          onEscKeyDown={() => this.props.actions.toggleOrderDetail()}
          onOverlayClick={() => this.props.actions.toggleOrderDetail()}
          title={`Detail objednávky ${detailOrder.id}`}
        >
          <div>
            <label>Datum vytvoření:</label>
            <span>{ detailOrder.dateCreated }</span>
          </div>
          <div>
            <label>Datum změny:</label>
            <span>{ detailOrder.dateModified }</span>
          </div>
          <div>
            <label>Stav objednávky:</label>
            <span>{ detailOrder.orderStatus }</span>
          </div>
          <div>
            <label>Zákazník:</label>
            <span>{ detailOrder.customer.name }{ detailOrder.customer.surname }</span>
            <span>{ detailOrder.customer.street }, { detailOrder.customer.city } &nbsp;
              { detailOrder.customer.zip }</span>
          </div>
          <div>
            <label>Kontakt:</label>
            <span>{ detailOrder.customer.email }</span>
            <span>{ detailOrder.customer.phone }</span>
          </div>
          <div>
            <label>Položky objednávky:</label>
            { detailPizzas }
          </div>
          <div>
            <label>Celková cena objednávky:</label>
            <span>{ orderPrice } Kč</span>
          </div>
        </Dialog>
      </div>
    );
  }
}
OrderContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  orders: ImmutablePropTypes.map.isRequired,
  checkboxes: ImmutablePropTypes.map.isRequired,
  pizzas: ImmutablePropTypes.map.isRequired,
  dialog: PropTypes.bool.isRequired,
  cancel: ImmutablePropTypes.record.isRequired,
  detail: PropTypes.bool.isRequired,
  detailOrder: ImmutablePropTypes.record.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orderContainer.orders,
  checkboxes: state.orderContainer.checkboxes,
  dialog: state.orderContainer.dialog,
  cancel: state.orderContainer.cancel,
  pizzas: state.pizzaContainer.pizzas,
  detail: state.orderContainer.detail,
  detailOrder: state.orderContainer.detailOrder,
  ingredients: state.ingredientContainer.ingredients,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    OrderActionCreators,
    dispatch
  ),
});

const Container = cssModules(OrderContainer, styles);

export default connect(mapStateToProps, mapDispatchToProps)(Container);
