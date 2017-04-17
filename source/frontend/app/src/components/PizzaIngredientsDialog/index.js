import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import cssModules from 'react-css-modules';
import { fromJS } from 'immutable';
import Dialog from 'react-toolbox/lib/dialog';
import Checkbox from 'react-toolbox/lib/checkbox';
import { Button } from 'react-toolbox/lib/button';
import { DOUGH_PRICE } from '../../models/Ingredient';
import * as styles from './index.module.scss';

class PizzaIngredientsDialog extends Component {

  getCheckboxes = () =>
    this.props.ingredients.toIndexedSeq().map((ingredient) => {
      const checkboxes = [];
      const cost = this.props.ownPizza ? ingredient.get('costCustom') : ingredient.get('cost');
      if (this.props.editing) {
        if (this.props.cart.get(this.props.index)) {
          checkboxes.push(
            <li className={styles.ingredientItem} key={ingredient.get('id')}>
              <Checkbox
                checked={(this.props.cart
                .get(this.props.index)
                .ingredientsIds
                .indexOf(ingredient.get('id')) > -1)}
                label={`${ingredient.get('name')} (${ cost } Kč)`}
                onChange={() =>
                  this.props.changePizzaIngredients(this.props.index, ingredient.get('id'))}
              />
            </li>
          );
        }
      } else {
        checkboxes.push(<li className={styles.ingredientItem} key={ingredient.get('id')}>
          <Checkbox
            checked={this.props.pizza
            .get('ingredientsId').includes(ingredient.get('id'))}
            label={`${ingredient.get('name')} (${ cost } Kč)`}
            onChange={(checked) =>
              this.handleIngredientsChange(ingredient.get('id'), checked)}
          />
        </li>);
      }
      return checkboxes;
    });

  getPizzaPrice = (ingredients = fromJS(this.props.pizza.ingredientsId)) => {
    let price = DOUGH_PRICE;
    if (this.props.ingredients.size > 0) {
      ingredients.map(ingredient => {
        if (this.props.ownPizza) {
          price += this.props.ingredients.get(ingredient).get('costCustom');
        } else {
          price += this.props.ingredients.get(ingredient).get('cost');
        }
      });
    }
    return price;
  };

  handleIngredientsChange = (ingredient, value) => {
    const ingredients = value
      ? this.props.pizza.get('ingredientsId').push(ingredient)
      : this.props.pizza.get('ingredientsId').delete(
        this.props.pizza.get('ingredientsId').indexOf(ingredient)
      );
    this.props.editValue('ingredientsId', ingredients, this.getPizzaPrice(ingredients));
  };

  validateForm() {
    let valid = true;
    const pizzaErrors = {
      ingredientsId: '',
    };
    if (this.props.pizza.get('ingredientsId').size === 0) {
      pizzaErrors.ingredientsId = 'Pizza musí obsahovat nějaké ingredience!';
      valid = false;
    }
    this.props.pizzaValidation(pizzaErrors);
    return valid;
  }

  confirmDialog() {
    if (this.validateForm()) {
      this.props.confirmForm();
    }
  }

  render() {
    const checkboxes = this.getCheckboxes();
    return (
      <div>
        <Dialog
          active={this.props.active}
          onEscKeyDown={() => this.props.toggleDialog()}
          onOverlayClick={() => this.props.toggleDialog()}
          title={ this.props.editing ? 'Zvolte ingredience' : 'Sestavit pizzu' }
        >
          <ul className={styles.ingredientsList}>
            { checkboxes }
          </ul>
          <Button
            className={styles.buttonerClose}
            label={this.props.editing ? 'OK' : 'Zavřít'}
            onClick={() => this.props.toggleDialog()}
            raised
          />
          {
            !this.props.editing
              ? <Button
                className={styles.buttoner}
                label={'Vložit do košíku'}
                onClick={() => this.confirmDialog()}
                raised
                primary
              />
              : null
          }
        </Dialog>
      </div>
    );
  }

}

PizzaIngredientsDialog.propTypes = {
  editing: PropTypes.bool.isRequired,
  ownPizza: PropTypes.bool.isRequired,

  index: PropTypes.number,
  cart: ImmutablePropTypes.map,
  ingredients: ImmutablePropTypes.map,
  toggleDialog: PropTypes.func,
  active: PropTypes.bool,
  changePizzaIngredients: PropTypes.func,

  editValue: PropTypes.func,
  confirmForm: PropTypes.func,
  pizza: ImmutablePropTypes.record,
  pizzaErrors: PropTypes.object,
  pizzaValidation: PropTypes.func,
};

export default cssModules(PizzaIngredientsDialog);
