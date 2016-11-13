import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as IngredientActionCreators from './actions';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import * as PropTypes from 'react/lib/ReactPropTypes';
import CreateIngredient from '../../components/CreateIngredient';
import IngredientList from '../../components/IngredientList';

class Ingredient extends Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.actions.fetchIngredientList();
  }

  render() {
    return (
      <div className={styles.ingredient}>
        <div className={styles.flexChild}>
          {this.props.isLoading ?
            <IngredientList ingredients={this.props.ingredients.ingredients}/>
            : null}
        </div>
        <div className={styles.flexChild}>
          <CreateIngredient
            editValue={this.props.actions.changeValue}
            ingredientForm={this.props.ingredients.ingredientForm}
            confirmForm={this.props.actions.saveIngredient}
          />
        </div>
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
