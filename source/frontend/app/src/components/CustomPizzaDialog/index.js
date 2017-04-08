/**
 * Created by e-myslivost on 6.11.2016.
 */
import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';
import * as styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import Checkbox from 'react-toolbox/lib/checkbox';
import Dialog from 'react-toolbox/lib/dialog';

class CreatePizza extends Component {

  getPizzaPrice = () => {
    let price = 40;
    const ingredients = fromJS(this.props.pizza.ingredientsId);
    if (this.props.ingredients.size > 0) {
      ingredients.map(ingredient => {
        price += this.props.ingredients.get(ingredient).costCustom;
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
    this.props.editValue('ingredientsId', ingredients, this.getPizzaPrice());
  };

  handleConfirm = (event) =>
    event.key === 'Enter' ? this.confirmDialog() : null;

  validateForm() {
    let valid = true;
    const pizzaErrors = {
      title: '',
      ingredientsId: '',
    };
    const emptyErr = 'Je nutné vyplnit!';
    if (this.props.pizza.get('title') === '') {
      pizzaErrors.title = emptyErr;
      valid = false;
    }
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
    const price = this.getPizzaPrice();
    return (
      <Dialog
        active={this.props.active}
        onEscKeyDown={() => this.props.toggleDialog()}
        onOverlayClick={() => this.props.toggleDialog()}
        title={'Sestavit pizzu'}
      >
        <Input
          type="text" label="Název pizzy"
          value={this.props.pizza.get('title')}
          onChange={(value) => this.props.editValue('title', value, this.getPizzaPrice())}
          onKeyPress={(event) => this.handleConfirm(event)}
          error={this.props.pizzaErrors.title}
        />
        <h2>Ingredience</h2>
        <ul className={styles.ingredientsList}>
          { this.props.ingredients.toIndexedSeq().map((ingredient) =>
            <li className={styles.ingredientItem} key={ingredient.get('id')}>
              {
                <Checkbox
                  checked={this.props.pizza
                  .get('ingredientsId').includes(ingredient.get('id'))}
                  label={ingredient.get('name')}
                  onChange={(checked) =>
                    this.handleIngredientsChange(ingredient.get('id'), checked)}
                />
              }
            </li>
          )}
        </ul>
        {
          this.props.pizzaErrors.ingredientsId.length > 0
            ? <div className={styles.err}>{ this.props.pizzaErrors.ingredientsId }</div>
            : null
        }
        <div>
          {
            price > 40
              ? <span>Cena pizzy: { price } Kč</span>
              : null
          }
          </div>
        <Button label="Zavřít" raised onClick={() => this.props.toggleDialog()}/>
        <Button label="Vložit do košíku" primary raised onClick={() => this.confirmDialog()}/>
      </Dialog>);
  }
}

CreatePizza.propTypes = {
  active: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  editValue: PropTypes.func.isRequired,
  confirmForm: PropTypes.func.isRequired,
  pizza: ImmutablePropTypes.record.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
  pizzaErrors: PropTypes.object.isRequired,
  pizzaValidation: PropTypes.func.isRequired,
};

export default cssModules(CreatePizza, styles);
