import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import CreateUser from '../../components/CreateUser/index';
import * as PropTypes from 'react/lib/ReactPropTypes';
import * as UserActionCreators from './actions';
import UserList from '../../components/UserList/index';
import Dialog from 'react-toolbox/lib/dialog';

class User extends Component {

  componentWillMount() {
    this.props.actions.fetchUserList();
  }

  render() {
    const dialog = this.props.dialog;
    return (
      <div className={styles.user}>
        <CreateUser
          editValue={this.props.actions.changeValue}
          userForm={this.props.userForm}
          confirmForm={this.props.actions.saveUser}
          userErrors={this.props.userErrors}
          userValidation={this.props.actions.userValidation}
          userError={this.props.userError}
        />
        <UserList
          users={this.props.users}
          updateUser={this.props.actions.updateUser}
          updateRole={this.props.actions.updateRole}
          deleteUser={this.props.actions.deleteUser}
          dialog={this.props.dialog}
          handleDialog={this.props.actions.handleDialog}
        />
        <Dialog
          actions={[
            {
              label: 'Zrušit', onClick: () =>
              this.props.actions.handleDialog(false, null, '', ''),
            },
            {
              label: 'Potvrdit', onClick: () =>
              this.props.actions.deleteUser(dialog.id),
            },
          ]}
          active={dialog.showDialog}
          onEscKeyDown={() => this.props.actions.handleDialog(false, null, '', '')}
          onOverlayClick={() => this.props.actions.handleDialog(false, null, '', '')}
          title={'Smazání uživatele'}
        >
          <p>Opravdu chcete smazat uživatele {`${dialog.firstName} ${dialog.lastName}`}?
            Tato akce je nevratná.</p>
        </Dialog>
      </div>
    );
  }

}

User.propTypes = {
  actions: PropTypes.object,
  userForm: PropTypes.object,
  userErrors: PropTypes.object,
  userError: PropTypes.string,
  users: ImmutablePropTypes.list,
  loading: PropTypes.bool,
  dialog: PropTypes.object.isRequired,
};

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = (state) => ({
  userForm: state.userContainer.userForm,
  userErrors: state.userContainer.userErrors,
  userError: state.userContainer.userError,
  users: state.userContainer.users,
  loading: state.userContainer.loading,
  dialog: state.userContainer.dialog,
});

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    UserActionCreators,
    dispatch
  ),
});

const Container = cssModules(User, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
