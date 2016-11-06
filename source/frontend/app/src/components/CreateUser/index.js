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
  { value: ['ADMIN'], label: 'Majitel' },
  { value: ['EMPLOYEE'], label: 'Zaměstnanec' },
];

class CreateUser extends Component {

  state = {
    firstName: '',
    lastName: '',
    password: '',
    login: '',
    roles: '',
    phone: '',
    validation: {
      errFirstName: '',
      errLastName: '',
      errPassword: '',
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

  handleSnackbarTimeout = () => {
    this.setState({ snackbar: false });
  };

  handleConfirm = (event) =>
    event.key === 'Enter' ? this.confirmDialog() : null;

  validateState() {
    const validation = {
      errFirstName: '',
      errLastName: '',
      errPassword: '',
      errLogin: '',
      errPhone: '',
      errRole: '',
    };
    let valid = true;
    if (this.state.firstName === '') {
      validation.errFirstName = 'Je nutné vyplnit. ';
      valid = false;
    } else {
      validation.errFirstName = '';
    }
    if (this.state.lastName === '') {
      validation.errLastName = 'Je nutné vyplnit. ';
      valid = false;
    } else {
      validation.errLastName = '';
    }
    if (this.state.password.length < 6) {
      validation.errPassword = 'Heslo musí mít 6 a více znaků. ';
      valid = false;
    } else {
      validation.errPassword = '';
    }
    if (this.state.login === '') {
      validation.errLogin = 'Je nutné vyplnit. ';
      valid = false;
    } else {
      validation.errLogin = '';
    }
    if (this.props.type !== 'registration') {
      if (this.state.roles === '') {
        validation.errRole = 'Je nutné vyplnit. ';
        valid = false;
      } else {
        validation.errRole = '';
      }
    }
    if (this.state.phone === '') {
      validation.errPhone = 'Je nutné vyplnit. ';
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
        firstName: '',
        lastName: '',
        password: '',
        login: '',
        roles: '',
        phone: '',
        validation: {
          errFirstName: '',
          errLastName: '',
          errPassword: '',
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
          <CardTitle>{ this.props.formTitle }</CardTitle>
          <CardText className={styles.regBody}>
            <div>
              <Input
                type="text" label="Jméno" maxLength={ 50 }
                value={ this.state.firstName }
                onChange={ (value) => this.handleChange('firstName', value) }
                error={ this.state.validation.errFirstName }
                onKeyPress={ (event) => this.handleConfirm(event) }
              />
              <Input
                type="text" label="Příjmení" maxLength={ 50 }
                value={ this.state.lastName }
                onChange={ (value) => this.handleChange('lastName', value) }
                error={ this.state.validation.errLastName }
                onKeyPress={ (event) => this.handleConfirm(event) }
              />
              <Input
                type="text" label="Login" maxLength={ 20 }
                value={ this.state.login}
                onChange={ (value) => this.handleChange('login', value) }
                error={ this.state.validation.errLogin }
                onKeyPress={ (event) => this.handleConfirm(event) }
              />
            </div>
            <div>
              <Input
                type="password" label="Heslo" maxLength={ 20 } minLength={ 6 }
                value={ this.state.password}
                onChange={ (value) => this.handleChange('password', value) }
                error={ this.state.validation.errPassword }
                onKeyPress={ (event) => this.handleConfirm(event) }
              />
              {
                this.props.type !== 'registration' ?
                  <Dropdown
                    auto
                    onChange={ (value) => this.handleChange('roles', value) }
                    source={ roles }
                    value={ this.state.roles }
                    error={ this.state.validation.errRole }
                  />
                  : null
              }
              <Input
                type="text" label="Telefon" maxLength={ 15 }
                value={ this.state.phone }
                onChange={ (value) => this.handleChange('phone', value) }
                error={ this.state.validation.errPhone }
                onKeyPress={ (event) => this.handleConfirm(event) }
              /></div>
          </CardText>
          <CardActions>
            <Button label="Přidat" primary raised onClick={ () => this.confirmDialog() }/>
          </CardActions>
        </Card>
        <Snackbar
          active={ this.state.snackbar }
          icon="person_add"
          label={ this.props.snackbarText }
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
  formTitle: PropTypes.string.isRequired,
  snackbarText: PropTypes.string.isRequired,
  type: PropTypes.string,
};


export default cssModules(CreateUser, styles);
