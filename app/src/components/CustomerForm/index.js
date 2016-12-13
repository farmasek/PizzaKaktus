import React, { PropTypes, Component } from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

class CustomerForm extends Component { // eslint-disable-line react/prefer-stateless-function
  handleChange = (name, value) => {
    this.props.editCustomerField(name, value);
  };
  handleConfirm = (event) =>
    event.key === 'Enter' ? this.confirmDialog() : null;

  confirmDialog() {
    if (this.validateState()) {
      // this.props.confirmForm();
    }
  }

  validateState() {
    let valid = true;
    this.props.editCustomerErrorField('resetator', 'done ');
    if (this.props.customer.get('name') === '') {
      this.props.editCustomerErrorField('name', 'Je nutné vyplnit');
      valid = false;
    }
    if (this.props.customer.get('surname') === '') {
      this.props.editCustomerErrorField('surname', 'Je nutné vyplnit');
      valid = false;
    }
    if (this.props.customer.get('email') === '') {
      this.props.editCustomerErrorField('email', 'Je nutné vyplnit');
      valid = false;
    }
    if (this.props.customer.get('city') === '') {
      this.props.editCustomerErrorField('city', 'Je nutné vyplnit');
      valid = false;
    }
    if (this.props.customer.get('street') === '') {
      this.props.editCustomerErrorField('street', 'Je nutné vyplnit');
      valid = false;
    }
    if (this.props.customer.get('zip') === '') {
      this.props.editCustomerErrorField('zip', 'Je nutné vyplnit');
      valid = false;
    }
    return valid;
  }

  render() {
    return (
      <Card >
        <CardTitle>Doručovací údaje</CardTitle>
        <CardText>
          <Input
            type="text"
            label="Jméno"
            value={this.props.customer.get('name')}
            onChange={(value) => this.handleChange('name', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.props.customerError.get('name')}
          />
          <Input
            type="text"
            label="Příjmení"
            value={this.props.customer.get('surname')}
            onChange={(value) => this.handleChange('surname', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.props.customerError.get('surname')}
          />
          <Input
            type="text"
            label="Email"
            value={this.props.customer.get('email')}
            onChange={(value) => this.handleChange('email', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.props.customerError.get('email')}
          />
          <Input
            type="text"
            label="Město"
            value={this.props.customer.get('city')}
            onChange={(value) => this.handleChange('city', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.props.customerError.get('city')}
          />
          <Input
            type="text"
            label="Ulice"
            value={this.props.customer.get('street')}
            onChange={(value) => this.handleChange('street', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.props.customerError.get('street')}
          />
          <Input
            type="text"
            label="PSČ"
            value={this.props.customer.get('zip')}
            onChange={(value) => this.handleChange('zip', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.props.customerError.get('zip')}
          />

        </CardText>
        <CardActions>
          <Button label="Přidat" primary raised onClick={() => this.confirmDialog()}/>
        </CardActions>
      </Card>);
  }
}

CustomerForm.propTypes = {

  editCustomerField: PropTypes.func.isRequired,
  editCustomerErrorField: PropTypes.func.isRequired,
  customer: PropTypes.any.isRequired,
  customerError: PropTypes.any.isRequired,

};

export default cssModules(CustomerForm, styles);
