import { Button } from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginActions from './actions';
import * as styles from './index.module.scss';

class LoginContainer extends React.Component {

  actions = [
    { label: "Cancel", onClick: () => this.props.actions.toggleDialog() },
    { label: "Save", onClick: () => this.props.actions.toggleDialog() },
  ];

  render() {
    return (
      <div className={styles.loginBtn}>
        <Button label='Přihlásit se' onClick={() => this.props.actions.toggleDialog()} />
        <Dialog
          actions={this.actions}
          active={this.props.dialogState}
          onEscKeyDown={() => this.props.actions.toggleDialog()}
          onOverlayClick={() => this.props.actions.toggleDialog()}
          title='Přihlášení'
        >
          <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
        </Dialog>
      </div>
    );
  }

}

LoginContainer.proptypes = {
  actions: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(LoginContainer, styles));
