import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PizzaActionCreators from './actions';
import * as IngredientActionCreators from '../IngredientContainer/actions';
import * as CategoryActionCreators from '../CategoryContainer/actions';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import * as PropTypes from 'react/lib/ReactPropTypes';
import CreatePizza from '../../components/CreatePizza';
import PizzaList from '../../components/PizzaList';

class Pizza extends Component {

  componentWillMount() {
    this.props.actions.fetchPizzaList();
    this.props.ingredientActions.fetchIngredientList();
    this.props.categoryActions.fetchCategoryList();
  }

  render() {
    return (
      <div className={styles.pizza}>
        <PizzaList
          pizzas={this.props.pizzas}
          categories={this.props.categories}
          ingredients={this.props.ingredients}
          updatePizza={this.props.actions.updatePizza}
          copyPizza={this.props.actions.copyPizza}
        />

        <CreatePizza
          editValue={this.props.actions.changeValue}
          pizzaForm={this.props.pizzaForm}
          confirmForm={this.props.actions.savePizza}
          categories={this.props.categories}
          ingredients={this.props.ingredients}
          pizzaErrors={this.props.pizzaErrors}
          pizzaValidation={this.props.actions.pizzaValidation}
          snackbar={this.props.snackbar}
          handleSnackbar={this.props.actions.handleSnackbar}
          pizzaError={this.props.pizzaError}
          copied={this.props.copied}
        />
      </div>
    );
  }
}
Pizza.propTypes = {
  pizzas: ImmutablePropTypes.map.isRequired,
  categories: ImmutablePropTypes.map.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.object,
  ingredientActions: PropTypes.object,
  categoryActions: PropTypes.object,
  pizzaForm: PropTypes.object,
  pizzaErrors: PropTypes.object,
  pizzaError: PropTypes.string,
  copied: PropTypes.bool,
  snackbar: ImmutablePropTypes.record,
};

const mapStateToProps = (state) => ({
  pizzas: state.pizzaContainer.pizzas,
  categories: state.categoryContainer.categories,
  ingredients: state.ingredientContainer.ingredients,
  pizzaForm: state.pizzaContainer.pizzaForm,
  pizzaErrors: state.pizzaContainer.pizzaErrors,
  snackbar: state.pizzaContainer.snackbar,
  pizzaError: state.pizzaContainer.pizzaError,
  copied: state.pizzaContainer.copied,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    PizzaActionCreators,
    dispatch
  ),
  ingredientActions: bindActionCreators(
    IngredientActionCreators,
    dispatch
  ),
  categoryActions: bindActionCreators(
    CategoryActionCreators,
    dispatch
  ),
});

const Container = cssModules(Pizza, styles);

export default connect(mapStateToProps, mapDispatchToProps)(Container);
