/**
 * Created by e-myslivost on 6.11.2016.
 */
import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Input from 'react-toolbox/lib/input';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import Checkbox from 'react-toolbox/lib/checkbox';
import { Snackbar } from 'react-toolbox/lib/snackbar';

class CreatePizza extends Component { // eslint-disable-line react/prefer-stateless-function


  getPrice() {
    let price = 50; // work and stuff
    if (this.props.pizzaForm.get('ingredientsId')) {
      this.props.pizzaForm.get('ingredientsId').map((id) => {
        price += this.props.ingredients.get(id).get('cost');
      });
    }
    return price;
  }

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
    this.props.editValue(name, value);
  };

  handleConfirm = (event) =>
    event.key === 'Enter' ? this.confirmDialog() : null;

  createSelectItems() {
    const items = new Array();
    items.push({ value: '', label: 'Zvolte kategorii' });
    this.props.categories.forEach((category) => {
      items.push({ value: category.get('id'), label: category.get('name') });
    });
    return items;
  }

  listIngredients = () => {
    const ingredients = this.props.ingredients;
    return ingredients.forEach((value, key) =>
      <li key={key}>
        { value.name }
      </li>
    );
  };

  handleIngredientsChange = (ingredient, value) => {
    const ingredients = value
      ? this.props.pizzaForm.get('ingredientsId').push(ingredient)
      : this.props.pizzaForm.get('ingredientsId').delete(
        this.props.pizzaForm.get('ingredientsId').indexOf(ingredient)
      );
    this.props.editValue('ingredientsId', ingredients);
  };

  validateForm() {
    let valid = true;
    let titleErr = '';
    let categoryErr = '';
    let ingredientsErr = '';
    const emptyErr = 'Je nutné vyplnit!';
    if (this.props.pizzaForm.get('title') === '') {
      titleErr = emptyErr;
      valid = false;
    }
    if (this.props.pizzaForm.get('categoryId') === '') {
      categoryErr = emptyErr;
      valid = false;
    }
    if (this.props.pizzaForm.get('ingredientsId').size === 0) {
      ingredientsErr = 'Pizza musí obsahovat nějaké ingredience!';
      valid = false;
    }
    const pizzaErrors = {
      titleErr,
      categoryErr,
      ingredientsErr,
    };
    this.props.pizzaValidation(pizzaErrors);
    return valid;
  }

  confirmDialog() {
    if (this.validateForm()) {
      this.props.confirmForm();
    }
  }

  render() {
    return (
      <Card className={styles.createPizza}>
        <CardTitle>Vytvořit pizzu</CardTitle>
        <CardText>
          <Input
            type="text" label="Název pizzy"
            value={this.props.pizzaForm.get('title')}
            onChange={(value) => this.handleChange('title', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.props.pizzaErrors.titleErr}
          />
          <Dropdown
            auto
            onChange={ (value) => this.handleChange('categoryId', value) }
            source={ this.createSelectItems() }
            value={this.props.pizzaForm.get('categoryId')}
            error={this.props.pizzaErrors.categoryErr}
          />
          <h1>Ingredience</h1>
          <ul className={styles.ingredientsList}>
            { this.props.ingredients.toIndexedSeq().map((ingredient) =>
              <li className={styles.ingredientItem} key={ingredient.get('id')}>
                {
                  <Checkbox
                    checked={this.props.pizzaForm
                      .get('ingredientsId').includes(ingredient.get('id'))}
                    label={ingredient.get('name')}
                    onChange={this.handleIngredientsChange.bind(this, ingredient.get('id'))}
                  />
                }
              </li>
            )}
          </ul>
          {
            this.props.pizzaErrors.ingredientsErr.length > 0
              ? <div className={styles.err}>{ this.props.pizzaErrors.ingredientsErr }</div>
              : null
          }
          <br />
          {
            this.props.pizzaForm.get('ingredientsId').size > 0
              ? <div>Cena vytvořené pizzy: { this.getPrice() } Kč (základ je 50 Kč)</div>
              : null
          }
        </CardText>
        <CardActions>
          <Button label="Přidat" primary raised onClick={() => this.confirmDialog()} />
        </CardActions>
        <Snackbar
          active={ this.props.showSnackbar }
          icon="check_circle"
          label={ "Pizza úspěšně vytvořena." }
          onTimeout={ () => this.props.handleSnackbar(false) }
          timeout={ 3000 }
          ref="snackbar"
          type="accept"
        />
      </Card>);
  }
}

CreatePizza.propTypes = {
  editValue: PropTypes.func.isRequired,
  confirmForm: PropTypes.func.isRequired,
  pizzaForm: PropTypes.object,
  categories: ImmutablePropTypes.map.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
  pizzaErrors: PropTypes.object,
  pizzaValidation: PropTypes.func.isRequired,
  showSnackbar: PropTypes.bool.isRequired,
  handleSnackbar: PropTypes.func.isRequired,
};

export default cssModules(CreatePizza, styles);
