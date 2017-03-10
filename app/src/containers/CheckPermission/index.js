import React from 'react';
import { connect } from 'react-redux';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

class CheckPermissions extends React.Component {

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
    if (!this.props.user.login) {
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
};

const mapStateToProps = (state) => ({
  user: state.loginReducer.get('user'),
});

export default connect(mapStateToProps)(CheckPermissions);
