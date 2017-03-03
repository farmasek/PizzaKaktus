import { Button } from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import Input from 'react-toolbox/lib/input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginActions from './actions';
import * as styles from './index.module.scss';

class LoginContainer extends React.Component {

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

  loginUser = () => {
    if (this.validate()) {
      this.props.actions.login(
        this.props.loginForm.get('username'), this.props.loginForm.get('password')
      );
    }
  };

  render() {
    return (
      <div className={styles.loginBtn}>
        <Button label="Přihlásit se" onClick={() => this.props.actions.toggleDialog()}/>
        <Dialog
          actions={this.actions}
          active={this.props.dialogState}
          onEscKeyDown={() => this.props.actions.toggleDialog()}
          onOverlayClick={() => this.props.actions.toggleDialog()}
        >
          <Input
            type="text" label="Přihlašovací jméno"
            value={this.props.loginForm.get('username')}
            onChange={ (value) => this.props.actions.loginChange('username', value) }
            error={this.props.loginErrors.get('username')}
          />
          <Input
            type="password" label="Heslo"
            value={this.props.loginForm.get('password')}
            onChange={ (value) => this.props.actions.loginChange('password', value) }
            error={this.props.loginErrors.get('password')}
          />
          {
            this.props.loginError
              ? <div className={styles.errText}>{this.props.loginError}</div>
              : null
          }
          <Button primary label="Přihlásit se" onClick={() => this.loginUser()} />
          <Button label="Zavřít" onClick={() => this.props.actions.toggleDialog()} />
        </Dialog>
      </div>
    );
  }

}

LoginContainer.propTypes = {
  actions: PropTypes.object,
  loginForm: ImmutablePropTypes.map.isRequired,
  loginErrors: ImmutablePropTypes.map.isRequired,
  dialogState: PropTypes.bool.isRequired,
  loginError: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  dialogState: state.loginReducer.dialogState,
  loginForm: state.loginReducer.loginForm,
  loginErrors: state.loginReducer.loginErrors,
  loginError: state.loginReducer.loginError,
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
