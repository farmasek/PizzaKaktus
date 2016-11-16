import React, { PropTypes, Component } from 'react';

import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Input from 'react-toolbox/lib/input';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';


class CreateIngredient extends Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    name: '',
    amount: '',
    cost: '',
    costCustom: '',
    validation: {
      errName: '',
      errAmount: '',
      errCost: '',
      errCostCustom: '',
    },
  };

  handleChange = (name, value) => {
    // Input probably cant work with props, sad.
    this.setState({ ...this.state, [name]: value });
    this.props.editValue(name, value);
  };
  handleConfirm = (event) =>
    event.key === 'Enter' ? this.confirmDialog() : null;

  handleErrorChange = (name, value = 'Je nutné vyplnit') =>
    this.setState({ ...this.state, [name]: value });


  confirmDialog() {
    // TODO better validation

    if (this.validateState()) {
      this.props.confirmForm();
      this.setState({
        name: '',
        amount: '',
        cost: '',
        costCustom: '',
        validation: {
          errName: '',
          errAmount: '',
          errCost: '',
          errCostCustom: '',
        },
      });
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
    if (this.state.name === '') {
      validation.errName = 'Je nutné vyplnit';
      valid = false;
    } else {
      validation.errName = '';
    }
    if (this.state.amount === '') {
      validation.errAmount = 'Je nutné vyplnit';
      valid = false;
    } else {
      validation.errAmount = '';
    }
    if (this.state.cost === '') {
      validation.errCost = 'Je nutné vyplnit';
      valid = false;
    } else {
      validation.errCost = '';
    }
    if (this.state.costCustom === '') {
      validation.errCostCustom = 'Je nutné vyplnit';
      valid = false;
    } else {
      validation.errCostCustom = '';
    }
    this.setState({ validation });
    return valid;
  }


  render() {
    return (
      <Card >
        <CardTitle>Přidat ingredienci</CardTitle>
        <CardText>
          <Input
            type="text" label="Jméno" value={this.state.name}
            onChange={(value) => this.handleChange('name', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.state.validation.errName}
          />
          <Input
            type="text" label="Množství" value={this.state.amount}
            onChange={(value) => this.handleChange('amount', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.state.validation.errAmount}
          />
          <div className={styles.insideNumbers}>
            <Input
              type="number" label="Cena jednotná" value={this.state.cost}
              onChange={(value) => this.handleChange('cost', value)} maxLength={10}
              onKeyPress={(event) => this.handleConfirm(event)}
              error={this.state.validation.errCost}
            />
            <Input
              type="number" label="Cena samostatná" value={this.state.costCustom}
              onChange={(value) => this.handleChange('costCustom', value)} maxLength={10}
              onKeyPress={(event) => this.handleConfirm(event)}
              error={this.state.validation.errCostCustom}
            />
          </div>
        </CardText>
        <CardActions>
          <Button label="Přidat" primary raised onClick={() => this.confirmDialog()} />
        </CardActions>
      </Card>);
  }
}

CreateIngredient.propTypes = {
  editValue: PropTypes.func.isRequired,
  confirmForm: PropTypes.func.isRequired,
  ingredientForm: PropTypes.object,
};

export default cssModules(CreateIngredient, styles);
