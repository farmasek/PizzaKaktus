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

class CreateCategory extends Component {

  handleChange = (name, value) =>
    this.props.editValue(name, value);

  handleConfirm = (event) =>
    event.key === 'Enter' ? this.confirmDialog() : null;

  confirmDialog() {
    if (this.validateState()) {
      this.props.confirmForm();
    }
  }

  validateState() {
    let valid = true;
    const categoryErrors = {
      nameErr: '',
    };
    if (this.props.categoryForm.get('name') === '') {
      categoryErrors.nameErr = 'Je nutné vyplnit.';
      valid = false;
    }
    this.props.categoryValidation(categoryErrors);
    return valid;
  }

  render() {
    return (
      <Card >
        <CardTitle>Přidat kategorii</CardTitle>
        <CardText>
          <Input
            type="text" label="Název"
            value={this.props.categoryForm.get('name')}
            onChange={(value) => this.handleChange('name', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.props.categoryErrors.nameErr}
          />
        </CardText>
        <CardActions>
          <Button label="Přidat" primary raised onClick={() => this.confirmDialog()} />
        </CardActions>

      </Card>);
  }
}

CreateCategory.propTypes = {
  editValue: PropTypes.func.isRequired,
  confirmForm: PropTypes.func.isRequired,
  categoryForm: PropTypes.object,
  categoryErrors: PropTypes.object,
  categoryError: PropTypes.string,
  categoryValidation: PropTypes.func.isRequired,
};

export default cssModules(CreateCategory, styles);
