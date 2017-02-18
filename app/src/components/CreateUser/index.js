import React, { PropTypes, Component } from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Input from 'react-toolbox/lib/input';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import { Checkbox } from 'react-toolbox/lib/checkbox';

const roles = [
  { value: 'ADMIN', label: 'Majitel' },
  { value: 'EMPLOYEE', label: 'Zaměstnanec' },
];

class CreateUser extends Component {

  handleChange = (name, value) => {
    this.props.editValue(name, value);
  };

  handleConfirm = (event) =>
    event.key === 'Enter' ? this.confirmDialog() : null;

  handleRolesChange = (role, value) => {
    const userRoles = value
      ? this.props.userForm.get('roles').push(role)
      : this.props.userForm.get('roles').delete(
      this.props.userForm.get('roles').indexOf(role)
    );
    this.props.editValue('roles', userRoles);
  };

  validateState() {
    const validation = {
      firstNameErr: '',
      lastNameErr: '',
      passwordErr: '',
      loginErr: '',
      phoneErr: '',
      rolesErr: '',
    };
    let valid = true;
    if (this.props.userForm.get('firstName') === '') {
      validation.firstNameErr = 'Je nutné vyplnit. ';
      valid = false;
    }
    if (this.props.userForm.get('lastName') === '') {
      validation.lastNameErr = 'Je nutné vyplnit. ';
      valid = false;
    }
    if (this.props.userForm.get('password').length < 6) {
      validation.passwordErr = 'Heslo musí mít 6 a více znaků. ';
      valid = false;
    }
    if (this.props.userForm.get('login') === '') {
      validation.loginErr = 'Je nutné vyplnit. ';
      valid = false;
    }
    if (this.props.userForm.get('roles').size === 0) {
      validation.rolesErr = 'Je nutné vybrat alespoň jednu roli. ';
      valid = false;
    }
    if (this.props.userForm.get('phone') === '') {
      validation.phoneErr = 'Je nutné vyplnit. ';
      valid = false;
    }
    this.props.userValidation(validation);
    return valid;
  }

  confirmDialog() {
    if (this.validateState()) {
      this.props.confirmForm();
    }
  }

  render() {
    return (
      <div>
        <Card>
          <CardTitle>Vytvořit uživatele</CardTitle>
          <CardText className={styles.createUser}>
            <div>
              <Input
                type="text" label="Jméno" maxLength={ 50 }
                value={ this.props.userForm.get('firstName') }
                onChange={ (value) => this.handleChange('firstName', value) }
                error={ this.props.userErrors.firstNameErr }
                onKeyPress={ (event) => this.handleConfirm(event) }
              />
              <Input
                type="text" label="Příjmení" maxLength={ 50 }
                value={ this.props.userForm.get('lastName') }
                onChange={ (value) => this.handleChange('lastName', value) }
                error={ this.props.userErrors.lastNameErr }
                onKeyPress={ (event) => this.handleConfirm(event) }
              />
              <Input
                type="text" label="Login" maxLength={ 20 }
                value={ this.props.userForm.get('login') }
                onChange={ (value) => this.handleChange('login', value) }
                error={ this.props.userErrors.loginErr }
                onKeyPress={ (event) => this.handleConfirm(event) }
              />
            </div>
            <div>
              <Input
                type="password" label="Heslo" maxLength={ 20 } minLength={ 6 }
                value={ this.props.userForm.get('password') }
                onChange={ (value) => this.handleChange('password', value) }
                error={ this.props.userErrors.passwordErr }
                onKeyPress={ (event) => this.handleConfirm(event) }
              />
              <Input
                type="text" label="Telefon" maxLength={ 15 }
                value={ this.props.userForm.get('phone') }
                onChange={ (value) => this.handleChange('phone', value) }
                error={ this.props.userErrors.phoneErr }
                onKeyPress={ (event) => this.handleConfirm(event) }
              />
              <h1>Role</h1>
              {
                roles.map(role =>
                  <Checkbox
                    key={role.value}
                    checked={this.props.userForm
                    .get('roles').includes(role.value)}
                    label={role.label}
                    onChange={(checked) => this.handleRolesChange(`${role.value}`, checked)}
                    className={styles.roleCheckbox}
                  />
                )
              }
              {
                this.props.userErrors.rolesErr !== ''
                  ? <span className={styles.err}>{ this.props.userErrors.rolesErr }</span>
                  : null
              }
            </div>
          </CardText>
          <CardActions>
            <Button label="Přidat" primary raised onClick={ () => this.confirmDialog() }/>
          </CardActions>

        </Card>
      </div>
    );
  }
}

CreateUser.propTypes = {
  editValue: PropTypes.func.isRequired,
  confirmForm: PropTypes.func.isRequired,
  userForm: PropTypes.object,
  userErrors: PropTypes.object,
  userError: PropTypes.string,
  userValidation: PropTypes.func.isRequired,
};

export default cssModules(CreateUser, styles);
