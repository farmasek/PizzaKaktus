/**
 * Created by e-myslivost on 6.11.2016.
 */
import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Input from 'react-toolbox/lib/input';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import Checkbox from 'react-toolbox/lib/checkbox';
import { Snackbar } from 'react-toolbox/lib/snackbar';
import scrollIntoView from 'scroll-into-view';

class CreatePizza extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidUpdate() {
    if (this.props.copied) {
      scrollIntoView(ReactDOM.findDOMNode(this.refs.pizzaForm));
    }
  }

  handleChange = (name, value) => {
    this.props.editValue(name, value);
  };

  handleConfirm = (event) =>
    event.key === 'Enter' ? this.confirmDialog() : null;

  createSelectItems() {
    const items = new Array();
    items.push({ value: '', label: 'Kategorie' });
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
    const pizzaErrors = {
      titleErr: '',
      categoryErr: '',
      priceErr: '',
      ingredientsErr: '',
    };
    const emptyErr = 'Je nutné vyplnit!';
    if (this.props.pizzaForm.get('title') === '') {
      pizzaErrors.titleErr = emptyErr;
      valid = false;
    }
    if (this.props.pizzaForm.get('categoryId') === '') {
      pizzaErrors.categoryErr = emptyErr;
      valid = false;
    }
    if (this.props.pizzaForm.get('ingredientsId').size === 0) {
      pizzaErrors.ingredientsErr = 'Pizza musí obsahovat nějaké ingredience!';
      valid = false;
    }
    if (this.props.pizzaForm.get('price') <= 0) {
      pizzaErrors.priceErr = 'Zadejte platnou cenu!';
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
    return (
      <Card className={styles.createPizza} ref="pizzaForm" >
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
          <Input
            type="number" label="Cena pizzy"
            value={this.props.pizzaForm.get('price')}
            onChange={(value) => this.handleChange('price', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.props.pizzaErrors.priceErr}
          />
        </CardText>
        <CardActions>
          <Button label="Přidat" primary raised onClick={() => this.confirmDialog()} />
        </CardActions>
        <Snackbar
          active={ this.props.snackbar.get('showSnackbar') }
          icon={ this.props.snackbar.get('icon') }
          label={ this.props.snackbar.get('label') }
          action={ "Zavřít" }
          onClick={ () => this.props.handleSnackbar(false) }
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
  snackbar: PropTypes.bool.isRequired,
  handleSnackbar: PropTypes.func.isRequired,
  pizzaError: PropTypes.string,
  copied: PropTypes.bool,
};

export default cssModules(CreatePizza, styles);
