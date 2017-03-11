import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PizzaActionCreators from './actions';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import * as PropTypes from 'react/lib/ReactPropTypes';
import CreatePizza from '../../components/CreatePizza';
import PizzaList from '../../components/PizzaList';
import Dialog from 'react-toolbox/lib/dialog';
import { initialPizzaForm } from './reducer';

class Pizza extends Component {

  componentWillMount() {
    if (this.props.pizzas.size === 0) {
      this.props.actions.fetchPizzaList();
    }
  }

  render() {
    const dialog = this.props.dialog;
    return (
      <div className={styles.pizza}>
        {
          this.props.pizzas
            ? <PizzaList
              pizzas={this.props.pizzas}
              categories={this.props.categories}
              ingredients={this.props.ingredients}
              updatePizza={this.props.actions.updatePizza}
              copyPizza={this.props.actions.copyPizza}
              pagination={this.props.pagination}
              changePagination={this.props.actions.changePaginationProperties}
              handleDialog={this.props.actions.handleDialog}
            />
            : <span>Žádné pizzy k zobrazení.</span>
        }
        <CreatePizza
          editValue={this.props.actions.changeValue}
          pizzaForm={this.props.pizzaForm}
          confirmForm={this.props.actions.savePizza}
          categories={this.props.categories}
          ingredients={this.props.ingredients}
          pizzaErrors={this.props.pizzaErrors}
          pizzaValidation={this.props.actions.pizzaValidation}
          pizzaError={this.props.pizzaError}
          copied={this.props.copied}
        />
        <Dialog
          actions={[
            { label: 'Zrušit', onClick: () =>
              this.props.actions.handleDialog(false, initialPizzaForm) },
            { label: 'Potvrdit', onClick: () =>
              this.props.actions.updatePizza(dialog.pizza, 'active', false) },
          ]}
          active={dialog.showDialog}
          onEscKeyDown={() => this.props.actions.handleDialog(false, initialPizzaForm)}
          onOverlayClick={() => this.props.actions.handleDialog(false, initialPizzaForm)}
          title={'Deaktivace pizzy'}
        >
          <p>Opravdu chcete deaktivovat pizzu s názvem {`${dialog.pizza.get('title')}`}?
            Tato akce je nevratná.</p>
        </Dialog>
      </div>
    );
  }
}
Pizza.propTypes = {
  pizzas: ImmutablePropTypes.map.isRequired,
  categories: ImmutablePropTypes.map.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.object,
  pizzaForm: PropTypes.object,
  pizzaErrors: PropTypes.object,
  pizzaError: PropTypes.string,
  copied: PropTypes.bool,
  loading: PropTypes.bool,
  pagination: ImmutablePropTypes.map,
  dialog: PropTypes.object,
};

const mapStateToProps = (state) => ({
  pizzas: state.pizzaContainer.pizzas,
  categories: state.categoryContainer.categories,
  ingredients: state.ingredientContainer.ingredients,
  pizzaForm: state.pizzaContainer.pizzaForm,
  pizzaErrors: state.pizzaContainer.pizzaErrors,
  pizzaError: state.pizzaContainer.pizzaError,
  copied: state.pizzaContainer.copied,
  pagination: state.pizzaContainer.pagination,
  loading: state.pizzaContainer.loading,
  dialog: state.pizzaContainer.dialog,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    PizzaActionCreators,
    dispatch
  ),
});

const Container = cssModules(Pizza, styles);

export default connect(mapStateToProps, mapDispatchToProps)(Container);
