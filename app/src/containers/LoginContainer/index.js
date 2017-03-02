import { Button } from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Input from 'react-toolbox/lib/input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginActions from './actions';
import * as styles from './index.module.scss';

class LoginContainer extends React.Component {
  state = { name: '' };
  actions = [
    { label: 'Zrušit', onClick: () => this.props.actions.toggleDialog() },
    { label: 'Přihlásit', onClick: () => this.props.actions.toggleDialog() },
  ];
  handleChange = (name, value) => {
    this.props.actions.changeValue(name, value);
  };

  render() {
    return (
      <div className={styles.loginBtn}>
        <Button label="Přihlásit se" onClick={() => this.props.actions.toggleDialog()} />
        <Dialog
          actions={this.actions}
          active={this.props.dialogState}
          onEscKeyDown={() => this.props.actions.toggleDialog()}
          onOverlayClick={() => this.props.actions.toggleDialog()}
          title="Přihlášení"
        >
          <Input
            type="text" label="Přihlašovací jméno" maxLength={ 20 }
            value={this.state.name}
            onChange={ (value) => this.handleChange('login', value) }
            onKeyPress={ (event) => this.handleConfirm(event) }
          />
          <Input
            type="password" label="Heslo" maxLength={ 20 }
            value={this.state.name}
            onChange={ (value) => this.handleChange('password', value) }
            onKeyPress={ (event) => this.handleConfirm(event) }
          />
        </Dialog>
      </div>
    );
  }

}

LoginContainer.propTypes = {
  actions: PropTypes.object,
  dialogState: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  dialogState: state.loginReducer.dialogState,
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
