import React, { PropTypes, Component } from 'react';
import styles from './index.module.scss';
import ImmutablePropTypes from 'react-immutable-proptypes';
import cssModules from 'react-css-modules';
import Input from 'react-toolbox/lib/input';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import { Snackbar } from 'react-toolbox/lib/snackbar';

class CreateIngredient extends Component {

  handleChange = (name, value) => {
    this.props.editValue(name, value);
  };
  handleConfirm = (event) =>
    event.key === 'Enter' ? this.confirmDialog() : null;

  confirmDialog() {
    if (this.validateState()) {
      this.props.confirmForm();
    }
  }

  validateState() {
    const validation = {
      errName: '',
      errAmount: '',
      errCost: '',
      errCostCustom: '',
    };
    let valid = true;
    if (this.props.ingredientForm.get('name') === '') {
      validation.errName = 'Je nutné vyplnit';
      valid = false;
    }
    if (this.props.ingredientForm.get('amount') === '') {
      validation.errAmount = 'Je nutné vyplnit';
      valid = false;
    }
    if (this.props.ingredientForm.get('cost') === '') {
      validation.errCost = 'Je nutné vyplnit';
      valid = false;
    }
    if (this.props.ingredientForm.get('costCustom') === '') {
      validation.errCostCustom = 'Je nutné vyplnit';
      valid = false;
    }
    this.props.ingredientValidation(validation);
    return valid;
  }

  render() {
    return (
      <Card >
        <CardTitle>Přidat ingredienci</CardTitle>
        <CardText>
          <Input
            type="text"
            label="Jméno"
            value={this.props.ingredientForm.get('name')}
            onChange={(value) => this.handleChange('name', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.props.ingredientErrors.errName}
          />
          <Input
            type="text"
            label="Množství"
            value={this.props.ingredientForm.get('amount')}
            onChange={(value) => this.handleChange('amount', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.props.ingredientErrors.errAmount}
          />
          <div className={styles.insideNumbers}>
            <Input
              type="number"
              label="Cena"
              value={this.props.ingredientForm.get('cost')}
              onChange={(value) => this.handleChange('cost', value)}
              maxLength={10}
              onKeyPress={(event) => this.handleConfirm(event)}
              error={this.props.ingredientErrors.errCost}
            />
            <Input
              type="number"
              label="Cena přídavku"
              value={this.props.ingredientForm.get('costCustom')}
              onChange={(value) => this.handleChange('costCustom', value)}
              maxLength={10}
              onKeyPress={(event) => this.handleConfirm(event)}
              error={this.props.ingredientErrors.errCostCustom}
            />
          </div>
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

CreateIngredient.propTypes = {
  editValue: PropTypes.func.isRequired,
  confirmForm: PropTypes.func.isRequired,
  ingredientForm: PropTypes.object,
  snackbar: ImmutablePropTypes.record,
  ingredientErrors: PropTypes.object,
  ingredientError: PropTypes.string,
  handleSnackbar: PropTypes.func.isRequired,
  ingredientValidation: PropTypes.func,
};

export default cssModules(CreateIngredient, styles);
