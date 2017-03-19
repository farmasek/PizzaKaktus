import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActionCreators from './actions';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import * as PropTypes from 'react/lib/ReactPropTypes';
import OrderList from '../../components/OrderList';

class HistoryContainer extends Component {

  componentWillMount() {
    this.props.actions.fetchOrderList();
  }

  render() {
    return (
      <div className={styles.pizza}>
        <OrderList
          orders={this.props.orders}
          pizzas={this.props.pizzas}
          pagination={this.props.pagination}
          changePagination={this.props.actions.changePaginationProperties}
          changeTime={this.props.actions.changeTime}
        />
      </div>
    );
  }
}
HistoryContainer.propTypes = {
  orders: ImmutablePropTypes.map.isRequired,
  pizzas: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.object,
  loading: PropTypes.bool,
  pagination: ImmutablePropTypes.map,
};

const mapStateToProps = (state) => ({
  orders: state.historyContainer.orders,
  pizzas: state.pizzaContainer.pizzas,
  pagination: state.historyContainer.pagination,
  loading: state.historyContainer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    OrderActionCreators,
    dispatch
  ),
});

const Container = cssModules(HistoryContainer, styles);

export default connect(mapStateToProps, mapDispatchToProps)(Container);
