/**
 * Created by e-myslivost on 6.11.2016.
 */
import React, { PropTypes, Component } from 'react';

import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Input from 'react-toolbox/lib/input';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';


class CreatePizza extends Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    title: '',
    category_id: '',
    validation: {
      errTitle: '',
      errCategory_id: '',
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
        title: '',
        category_id: '',
        validation: {
          errTitle: '',
          errCategory_id: '',
        },
      });
    }
  }

  validateState() {
    const validation = {
      errTitle: '',
      errCategory_id: '',
    };
    let valid = true;
    if (this.state.title === '') {
      validation.errTitle = 'Je nutné vyplnit';
      valid = false;
    } else {
      validation.errTitle = '';
    }
    if (this.state.category_id === '') {
      validation.errCategory_id = 'Je nutné vyplnit';
      valid = false;
    } else {
      validation.errCategory_id = '';
    }
    this.setState({ validation });
    return valid;
  }


  render() {
    return (
      <Card >
        <CardTitle>Přidat Pizzu</CardTitle>
        <CardText>
          <Input
            type="text" label="Název Pizzy" value={this.state.title}
            onChange={(value) => this.handleChange('title', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.state.validation.errTitle}
          />
          <Input
            type="text" label="Kategorie" value={this.state.category_id}
            onChange={(value) => this.handleChange('category_id', value)}
            onKeyPress={(event) => this.handleConfirm(event)}
            error={this.state.validation.errCategory_id}
          />
        </CardText>
        <CardActions>
          <Button label="Přidat" primary raised onClick={() => this.confirmDialog()} />
        </CardActions>
      </Card>);
  }
}

CreatePizza.propTypes = {
  editValue: PropTypes.func.isRequired,
  confirmForm: PropTypes.func.isRequired,
  pizzaForm: PropTypes.object,
};

export default cssModules(CreatePizza, styles);
