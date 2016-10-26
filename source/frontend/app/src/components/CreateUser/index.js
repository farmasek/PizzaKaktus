import React, { PropTypes, Component } from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Input from 'react-toolbox/lib/input';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import { Dropdown } from 'react-toolbox/lib/dropdown';
import { Snackbar } from 'react-toolbox/lib/snackbar';

const roles = [
  { value: '', label: 'Zvolte roli' },
  { value: 'admin', label: 'Majitel' },
  { value: 'employee', label: 'Zaměstnanec' },
];

class CreateUser extends Component {

  state = {
    name: '',
    login: '',
    role: '',
    phone: '',
    validation: {
      errName: '',
      errLogin: '',
      errPhone: '',
      errRole: '',
    },
    snackbar: false,
  };

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
    this.props.editValue(name, value);
  };

  handleSnackbarTimeout = (event, instance) => {
    this.setState({ snackbar: false });
  };

  handleConfirm = (event) =>
    event.key === 'Enter' ? this.confirmDialog() : null;

  validateState() {
    const validation = {
      errName: '',
      errLogin: '',
      errPhone: '',
      errRole: '',
    };
    let valid = true;
    if (this.state.name === '') {
      validation.errName = 'Je nutné vyplnit';
      valid = false;
    } else {
      validation.errName = '';
    }
    if (this.state.login === '') {
      validation.errLogin = 'Je nutné vyplnit';
      valid = false;
    } else {
      validation.errLogin = '';
    }
    if (this.state.role === '') {
      validation.errRole = 'Je nutné vyplnit';
      valid = false;
    } else {
      validation.errRole = '';
    }
    if (this.state.phone === '') {
      validation.errPhone = 'Je nutné vyplnit';
      valid = false;
    } else {
      validation.errPhone = '';
    }
    this.setState({ validation });
    return valid;
  }

  confirmDialog() {
    // TODO better validation

    if (this.validateState()) {
      this.props.confirmForm();
      this.setState({
        name: '',
        login: '',
        role: '',
        phone: '',
        validation: {
          errName: '',
          errLogin: '',
          errPhone: '',
          errRole: '',
        },
      });
      this.setState({ snackbar: true });
    }
  }

  render() {
    return (
      <div>
        <Card>
          <CardTitle>Přidat uživatele</CardTitle>
          <CardText>
            <Input
              type="text" label="Jméno a příjmení" maxLength={ 50 }
              value={ this.state.name }
              onChange={ (value) => this.handleChange('name', value) }
              error={ this.state.validation.errName }
              onKeyPress={ (event) => this.handleConfirm(event) }
            />
            <Input
              type="text" label="Uživatelské jméno" maxLength={ 20 }
              value={ this.state.login}
              onChange={ (value) => this.handleChange('login', value) }
              error={ this.state.validation.errLogin }
              onKeyPress={ (event) => this.handleConfirm(event) }
            />
            <Dropdown
              auto
              onChange={ (value) => this.handleChange('role', value) }
              source={ roles }
              value={ this.state.role }
              error={ this.state.validation.errRole }
            />
            <Input
              type="text" label="Telefon" maxLength={ 15 }
              value={ this.state.phone }
              onChange={ (value) => this.handleChange('phone', value) }
              error={ this.state.validation.errPhone }
              onKeyPress={ (event) => this.handleConfirm(event) }
            />
          </CardText>
          <CardActions>
            <Button label="Přidat" primary raised onClick={ () => this.confirmDialog() }/>
          </CardActions>
        </Card>
        <Snackbar
          active={ this.state.snackbar }
          icon="person_add"
          label="Uživatel byl přidán."
          onTimeout={ this.handleSnackbarTimeout }
          timeout={ 3000 }
          ref="snackbar"
          type="accept"
        />
      </div>
    );
  }

}

CreateUser.propTypes = {
  editValue: PropTypes.func.isRequired,
  confirmForm: PropTypes.func.isRequired,
  userForm: PropTypes.object,
};


export default cssModules(CreateUser, styles);
