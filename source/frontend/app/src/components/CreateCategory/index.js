/**
 * Created by e-myslivost on 6.11.2016.
 */
import React, { PropTypes, Component } from 'react';

import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Input from 'react-toolbox/lib/input';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';


class CreateCategory extends Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    name: '',
    validation: {
      errName: '',
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
        validation: {
          errName: '',
        },
      });
    }
  }

  validateState() {
    const validation = {
      errName: '',
    };
    let valid = true;
    if (this.state.name === '') {
      validation.errName = 'Je nutné vyplnit';
      valid = false;
    } else {
      validation.errName = '';
    }
    this.setState({ validation });
    return valid;
  }


  render() {
    return (
      <Card >
        <CardTitle>Přidat Kategorii</CardTitle>
        <CardText>
          <Input
            type="text" label="Název" value={this.state.name}
            onChange={(value) => this.handleChange('name', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.state.validation.errName}
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
};

export default cssModules(CreateCategory, styles);
