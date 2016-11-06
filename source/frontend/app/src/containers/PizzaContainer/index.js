/**
 * Created by e-myslivost on 6.11.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PizzaActionCreators from './actions';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import * as PropTypes from 'react/lib/ReactPropTypes';
import CreatePizza from '../../components/CreatePizza';
import PizzaList from '../../components/PizzaList';

class Pizza extends Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.actions.fetchPizzaList();
  }

  render() {
    return (
      <div className={styles.pizza}>
        <div className={styles.flexChild}>
          <PizzaList pizzas={this.props.pizzas.pizzas}/>
        </div>
        <div className={styles.flexChild}>
          <CreatePizza
            editValue={this.props.actions.changeValue}
            pizzaForm={this.props.pizzas.pizzaForm}
            confirmForm={this.props.actions.savePizza}
          />
        </div>
      </div>
    );
  }
}
Pizza.propTypes = {
  pizzas: PropTypes.object,
  actions: PropTypes.object,
};

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = (state) => ({
  pizzas: state.pizzaContainer,
});

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    PizzaActionCreators,
    dispatch
  ),
});

const Container = cssModules(Pizza, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
