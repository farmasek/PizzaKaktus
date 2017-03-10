import React from 'react';
import { connect } from 'react-redux';
import { Navbar } from 'components';
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
    return (
      <div>
        {
          this.hasPermissions()
            ? React.cloneElement(props.children, props)
            : null
        }
      </div>
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
