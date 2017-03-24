import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as IngredientActionCreators from './actions';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import * as PropTypes from 'react/lib/ReactPropTypes';
import CreateIngredient from '../../components/CreateIngredient';
import IngredientList from '../../components/IngredientList';

class Ingredient extends Component {

  componentWillMount() {
    if (this.props.ingredients.size === 0) {
      this.props.actions.fetchIngredientList();
    }
  }

  render() {
    return (
      <div className={styles.ingredient}>
        <div className={styles.flexChild}>
          {!this.props.isLoading ?
            <IngredientList
              ingredients={this.props.ingredients}
              copyIngredient={this.props.actions.copyIngredient}
            />
            : null}
        </div>
        <div className={styles.flexChild}>
          <CreateIngredient
            editValue={this.props.actions.changeValue}
            ingredientForm={this.props.ingredientForm}
            confirmForm={this.props.actions.saveIngredient}
            ingredientErrors={this.props.ingredientErrors}
            ingredientValidation={this.props.actions.ingredientValidation}
            ingredientError={this.props.ingredientError}
            confirmUpdate={this.props.actions.updateIngredient}
            copied={this.props.copied}
          />
        </div>
      </div>
    );
  }
}
Ingredient.propTypes = {
  ingredients: PropTypes.object,
  ingredientForm: PropTypes.object,
  actions: PropTypes.object,
  isLoading: PropTypes.bool,
  ingredientErrors: PropTypes.object,
  ingredientError: PropTypes.string,
  copied: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  ingredients: state.ingredientContainer.ingredients,
  isLoading: state.ingredientContainer.isLoading,
  ingredientForm: state.ingredientContainer.ingredientForm,
  ingredientError: state.ingredientContainer.ingredientError,
  ingredientErrors: state.ingredientContainer.ingredientErrors,
  copied: state.ingredientContainer.copied,
});

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
