import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import CreateUser from '../../components/CreateUser/index';
import * as PropTypes from 'react/lib/ReactPropTypes';
import * as RegistrationActionCreators from './actions';

class Registration extends Component {

  render() {
    return (
      <div className={styles.user}>
        <div className={styles.flexChild}>
          <CreateUser
            editValue={this.props.actions.changeValue}
            userForm={this.props.registration.registrationForm}
            confirmForm={this.props.actions.saveUser}
            formTitle={"Registrace"}
            snackbarText={"Uživatel byl úspěšně registrován."}
            type={"registration"}
          />
        </div>
      </div>
    );
  }

}

Registration.propTypes = {
  registration: PropTypes.object,
  actions: PropTypes.object,
};

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = (state) => ({
  registration: state.registrationContainer,
});

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    RegistrationActionCreators,
    dispatch
  ),
});

const Container = cssModules(Registration, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
