import React, { Component } from 'react';
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
          userForm={this.props.manageUser.userForm}
          confirmForm={this.props.actions.saveUser}
          formTitle={"Přidat uživatele"}
          snackbarText={"Uživatel byl přidán."}
          type={"manageUsers"}
        />

        <UserList
          users={this.props.manageUser.users}
          updateUser={this.props.actions.updateUser}
          updateRole={this.props.actions.updateRole}
        />
      </div>
    );
  }

}

User.propTypes = {
  manageUser: PropTypes.object,
  actions: PropTypes.object,
};

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = (state) => ({
  manageUser: state.userContainer,
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
