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

  handleCancelOrder = (order) => {
    let changes = new List();
    changes = changes.push(order.set('orderStatus', statuses.CANCELLED));
    this.props.actions.changeOrderStatuses(changes);
  };

  render() {
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
};

const mapStateToProps = (state) => ({
  orders: state.orderContainer.orders,
  checkboxes: state.orderContainer.checkboxes,
  dialog: state.orderContainer.dialog,
  cancel: state.orderContainer.cancel,
  pizzas: state.pizzaContainer.pizzas,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    OrderActionCreators,
    dispatch
  ),
});

const Container = cssModules(OrderContainer, styles);

export default connect(mapStateToProps, mapDispatchToProps)(Container);
