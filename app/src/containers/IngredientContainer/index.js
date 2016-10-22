import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as IngredientActionCreators from './actions';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import * as PropTypes from 'react/lib/ReactPropTypes';

class Ingredient extends Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.actions.fetchIngredientList();
  }

  render() {
    return (
      <div className={styles.ingredient}>
        {
          this.props.ingredients.ingredients.map(ingredient => <span>{ingredient.name}<br/></span>)
        }
      </div>
    );
  }
}
Ingredient.propTypes = {
  ingredients: PropTypes.object,
  actions: PropTypes.object,
};

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = (state) => ({
  ingredients: state.ingredientContainer,
});

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    IngredientActionCreators,
    dispatch
  ),
});

const Container = cssModules(Ingredient, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
