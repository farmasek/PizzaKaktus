import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActionCreators from './actions';
import * as PizzaActionCreators from '../PizzaContainer/actions';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import * as PropTypes from 'react/lib/ReactPropTypes';
import OrderList from '../../components/OrderList';

class OrderContainer extends Component {

  componentWillMount() {
    this.props.actions.fetchOrderList();
    this.props.pizzaActions.fetchPizzaList();
  }

  render() {
    return (
      <div className={styles.pizza}>
        <OrderList
          orders={this.props.orders}
          pizzas={this.props.pizzas}
          pagination={this.props.pagination}
          changePagination={this.props.actions.changePaginationProperties}
        />
      </div>
    );
  }
}
OrderContainer.propTypes = {
  orders: ImmutablePropTypes.map.isRequired,
  pizzas: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.object,
  pizzaActions: PropTypes.object,
  loading: PropTypes.bool,
  pagination: ImmutablePropTypes.map,
};

const mapStateToProps = (state) => ({
  orders: state.orderContainer.orders,
  pizzas: state.pizzaContainer.pizzas,
  pagination: state.orderContainer.pagination,
  loading: state.orderContainer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    OrderActionCreators,
    dispatch
  ),
  pizzaActions: bindActionCreators(
    PizzaActionCreators,
    dispatch
  ),
});

const Container = cssModules(OrderContainer, styles);

export default connect(mapStateToProps, mapDispatchToProps)(Container);
