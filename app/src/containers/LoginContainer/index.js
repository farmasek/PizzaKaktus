import { Button } from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import Input from 'react-toolbox/lib/input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isLoggedIn } from '../../network';
import * as LoginActions from './actions';
import * as styles from './index.module.scss';

class LoginContainer extends React.Component {

  componentWillMount() {
    if (isLoggedIn()) {
      this.props.actions.fetchMyself();
    }
  }

  validate = () => {
    let valid = true;
    let username = '';
    let password = '';
    if (!this.props.loginForm.get('username')) {
      valid = false;
      username = 'Přihlašovací jméno nesmí být prázdné.';
    }
    if (!this.props.loginForm.get('password')) {
      valid = false;
      password = 'Heslo nesmí být prázdné.';
    }
    if (!valid) {
      this.props.actions.setLoginErrors(new Map({ username, password }));
    }
    return valid;
  };

  handleConfirm = (event) =>
    event.key === 'Enter' ? this.loginUser() : null;

  loginUser = () => {
    if (this.validate()) {
      this.props.actions.login(
        this.props.loginForm.get('username'), this.props.loginForm.get('password')
      );
    }
  };

  loginDialog = () => (
    <Dialog
      active={this.props.dialogState}
      onEscKeyDown={() => this.props.actions.toggleDialog()}
      onOverlayClick={() => this.props.actions.toggleDialog()}
    >
      <Input
        type="text" label="Přihlašovací jméno"
        value={this.props.loginForm.get('username')}
        onChange={ (value) => this.props.actions.loginChange('username', value) }
        error={this.props.loginErrors.get('username')}
        onKeyPress={(event) => this.handleConfirm(event)}
      />
      <Input
        type="password" label="Heslo"
        value={this.props.loginForm.get('password')}
        onChange={ (value) => this.props.actions.loginChange('password', value) }
        error={this.props.loginErrors.get('password')}
        onKeyPress={(event) => this.handleConfirm(event)}
      />
      {
        this.props.loginError
          ? <div className={styles.errText}>{this.props.loginError}</div>
          : null
      }
      <Button primary label="Přihlásit se" onClick={() => this.loginUser()}/>
      <Button label="Zavřít" onClick={() => this.props.actions.toggleDialog()}/>
    </Dialog>
  );

  passwordChangeDialog = () => (
    <Dialog
      active={this.props.dialog}
      onEscKeyDown={() => this.props.actions.togglePasswordDialog()}
      onOverlayClick={() => this.props.actions.togglePasswordDialog()}
    >
      <Input
        type="password"
        label="Staré heslo"
        value={this.props.old}
        onChange={(value) => this.props.actions.changeValue('old', value)}
      />
      <Input
        type="password"
        label="Nové heslo"
        value={this.props.new}
        onChange={(value) => this.props.actions.changeValue('new', value)}
      />
      <Input
        type="password"
        label="Nové heslo znovu"
        value={this.props.newAgain}
        onChange={(value) => this.props.actions.changeValue('newAgain', value)}
      />
      {
        this.props.changeMessage
          ? <div className={styles.errText}>{this.props.changeMessage}</div>
          : null
      }
      <Button
        label="Změnit heslo" disabled={!!this.props.changeMessage || !this.props.newAgain}
        primary raised onClick={() => this.props.actions.confirmChange(
        this.props.user.get('login'),
        this.props.old,
        this.props.new,
      )}
      />
      <Button label="Zavřít" onClick={() => this.props.actions.togglePasswordDialog()}/>
    </Dialog>
  );

  render() {
    return (
      <div className={styles.loginBtn}>
        {
          this.props.user.login
            ? <div>
            <span>Přihlášený uživatel: {this.props.user.firstName} {this.props.user.lastName}</span>
            <Button label="Odhlásit se" onClick={() => this.props.actions.logout()}/>
            <Button label="Změnit heslo" onClick={() => this.props.actions.togglePasswordDialog()}/>
          </div>
            : <Button label="Přihlásit se" onClick={() => this.props.actions.toggleDialog()}/>
        }

        { this.loginDialog() }
        { this.passwordChangeDialog() }
      </div>
    );
  }

}

LoginContainer.propTypes = {
  actions: PropTypes.object,
  loginForm: ImmutablePropTypes.map.isRequired,
  loginErrors: ImmutablePropTypes.map.isRequired,
  dialogState: PropTypes.bool.isRequired,
  loginError: PropTypes.string,
  user: ImmutablePropTypes.record,
  old: PropTypes.string.isRequired,
  new: PropTypes.string.isRequired,
  newAgain: PropTypes.string.isRequired,
  changeMessage: PropTypes.string.isRequired,
  dialog: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  dialogState: state.loginReducer.dialogState,
  loginForm: state.loginReducer.loginForm,
  loginErrors: state.loginReducer.loginErrors,
  loginError: state.loginReducer.loginError,
  user: state.loginReducer.user,
  old: state.loginReducer.old,
  new: state.loginReducer.new,
  newAgain: state.loginReducer.newAgain,
  changeMessage: state.loginReducer.changeMessage,
  dialog: state.loginReducer.dialog,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    LoginActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(cssModules(LoginContainer, styles));
