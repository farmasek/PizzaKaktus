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

class User extends Component {

  componentWillMount() {
    this.props.actions.fetchUserList();
  }

  render() {
    return (
      <div className={styles.user}>
        <CreateUser
          editValue={this.props.actions.changeValue}
          userForm={this.props.userForm}
          confirmForm={this.props.actions.saveUser}
          userErrors={this.props.userErrors}
          userValidation={this.props.actions.userValidation}
          snackbar={this.props.snackbar}
          handleSnackbar={this.props.actions.handleSnackbar}
          userError={this.props.userError}
        />
        {
          !(this.props.loading)
            ? <UserList
              users={this.props.users}
              updateUser={this.props.actions.updateUser}
              updateRole={this.props.actions.updateRole}
              deleteUser={this.props.actions.deleteUser}
            />
            : null
        }
      </div>
    );
  }

}

User.propTypes = {
  actions: PropTypes.object,
  userForm: PropTypes.object,
  userErrors: PropTypes.object,
  userError: PropTypes.string,
  snackbar: ImmutablePropTypes.record,
  users: ImmutablePropTypes.list,
  loading: PropTypes.bool,
};

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = (state) => ({
  userForm: state.userContainer.userForm,
  userErrors: state.userContainer.userErrors,
  userError: state.userContainer.userError,
  snackbar: state.userContainer.snackbar,
  users: state.userContainer.users,
  loading: state.userContainer.loading,
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
