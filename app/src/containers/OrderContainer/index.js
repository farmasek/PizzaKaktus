import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActionCreators from './actions';
import cssModules from 'react-css-modules';
import * as styles from './index.module.scss';
import OrderTable from '../../components/ManageOrdersTable';

class OrderContainer extends Component {

  componentWillMount() {
    this.props.actions.fetchOrders();
  }

  render() {
    return (
      <div className={styles.pizza}>
        <OrderTable
          orders={this.props.orders}
          pizzas={this.props.pizzas}
          checkboxes={this.props.checkboxes}
          handleOrderCheckbox={this.props.actions.orderCheckboxChange}
          handleOrderStatuses={this.props.actions.changeOrderStatuses}
        />
      </div>
    );
  }
}
OrderContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  orders: ImmutablePropTypes.map.isRequired,
  checkboxes: ImmutablePropTypes.map.isRequired,
  pizzas: ImmutablePropTypes.map.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orderContainer.orders,
  checkboxes: state.orderContainer.checkboxes,
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
