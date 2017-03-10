import React, {
  PropTypes,
  Component,
} from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import {
  Card,
  CardTitle,
  CardText,
} from 'react-toolbox/lib/card';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import Input from 'react-toolbox/lib/input';

class CustomerForm extends Component { // eslint-disable-line react/prefer-stateless-function

  handleChange = (name, value) => {
    this.props.editCustomerField(name, value);
  };

  render() {
    return (
      <Card >
        <CardTitle>Doručovací údaje</CardTitle>
        <CardText>
          <div className={styles.orderRow}>
            <Input
              type="text"
              label="Email"
              value={this.props.customer.get('email')}
              onChange={(value) => this.handleChange('email', value)}
              onKeyPress={(event) => this.props.handleConfirm(event)}
              error={this.props.customerError.get('email')}
            />
            {this.props.isLoadingUser && <ProgressBar type="circular" mode="indeterminate" />}
          </div>
          <div className={styles.orderRow}>
            <Input
              type="text"
              label="Jméno"
              value={this.props.customer.get('name')}
              onChange={(value) => this.handleChange('name', value)}
              onKeyPress={(event) => this.props.handleConfirm(event)}
              error={this.props.customerError.get('name')}
            />
            <Input
              type="text"
              label="Příjmení"
              value={this.props.customer.get('surname')}
              onChange={(value) => this.handleChange('surname', value)}
              onKeyPress={(event) => this.props.handleConfirm(event)}
              error={this.props.customerError.get('surname')}
            />
          </div>
          <div className={styles.orderRow}>
            <Input
              type="text"
              label="Telefon"
              value={this.props.customer.get('phone')}
              onChange={(value) => this.handleChange('phone', value)}
              onKeyPress={(event) => this.props.handleConfirm(event)}
              error={this.props.customerError.get('phone')}
            />
            <Input
              type="text"
              label="Ulice"
              value={this.props.customer.get('street')}
              onChange={(value) => this.handleChange('street', value)}
              onKeyPress={(event) => this.props.handleConfirm(event)}
              error={this.props.customerError.get('street')}
            />
          </div>
          <div className={styles.orderRow}>
            <Input
              type="text"
              label="Město"
              value={this.props.customer.get('city')}
              onChange={(value) => this.handleChange('city', value)}
              onKeyPress={(event) => this.props.handleConfirm(event)}
              error={this.props.customerError.get('city')}
            />
            <Input
              type="text"
              label="PSČ"
              value={this.props.customer.get('zip')}
              onChange={(value) => this.handleChange('zip', value)}
              onKeyPress={(event) => this.props.handleConfirm(event)}
              error={this.props.customerError.get('zip')}
            />
          </div>

        </CardText>
      </Card>);
  }
}

CustomerForm.propTypes = {

  editCustomerField: PropTypes.func.isRequired,
  customer: PropTypes.any.isRequired,
  customerError: PropTypes.any.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  isLoadingUser: PropTypes.bool,

};

export default cssModules(CustomerForm, styles);
