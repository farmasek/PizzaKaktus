import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import { isLoggedIn } from '../../network';

class CheckPermissions extends React.Component {

  componentWillMount() {
    if (!isLoggedIn()) {
      if (this.props.redirect) browserHistory.push('/');
    } else if (!this.props.user.login) {
      return null;
    } else if (!this.hasPermissions()) {
      if (this.props.redirect) browserHistory.push('/');
    }
  }

  hasPermissions = () => {
    let has = false;
    const userPermissions = this.props.user.get('roles');
    this.props.permissions.map((permission) => {
      if (userPermissions.indexOf(permission) !== -1) {
        has = true;
      }
    });
    return has;
  };

  render() {
    if (!isLoggedIn()) {
      return null;
    } else if (!this.props.user.login) {
      return null;
    } else if (!this.hasPermissions()) {
      return null;
    }
    return (
      <span>
        { React.cloneElement(this.props.children) }
      </span>
    );
  }

}

CheckPermissions.propTypes = {
  children: React.PropTypes.any,
  user: ImmutablePropTypes.record,
  permissions: React.PropTypes.array,
  redirect: React.PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.loginReducer.get('user'),
});

export default connect(mapStateToProps)(CheckPermissions);
