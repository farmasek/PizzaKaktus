import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActionCreators from './actions';
import cssModules from 'react-css-modules';
import * as styles from './index.module.scss';

class OrderContainer extends Component {

  componentWillMount() {
    this.props.actions.fetchOrderList();
  }

  render() {
    return (
      <div className={styles.pizza}>
      </div>
    );
  }
}
OrderContainer.propTypes = {
  orders: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orderContainer.orders,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    OrderActionCreators,
    dispatch
  ),
});

const Container = cssModules(OrderContainer, styles);

export default connect(mapStateToProps, mapDispatchToProps)(Container);
