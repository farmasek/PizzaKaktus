import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navbar } from 'components';
import AppBar from 'react-toolbox/lib/app_bar';
import { NotificationStack } from 'react-notification';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import * as actionCreators from './actions';
import * as styles from './index.module.scss';
import LoginContainer from '../../containers/LoginContainer/index';

const Main = (props) => (
  <div>
    <AppBar fixed flat>
      <Navbar />
      <NotificationStack
        notifications={props.notifications.toArray()}
        onDismiss={(element) => props.actions.removeNotification(element)}
      />
      <LoginContainer />
    </AppBar>
    <div className={styles.content}>
      {React.cloneElement(props.children, props)}
    </div>
  </div>
);

Main.propTypes = {
  children: React.PropTypes.any,
  notifications: ImmutablePropTypes.orderedSet,
};

// Map the global state to global props here.
// See: https://egghead.io/lessons/javascript-redux-generating-containers-with-connect-from-react-redux-visibletodolist
// mapStateToProps :: {State} -> {Action}
const mapStateToProps = (state) => ({
  notifications: state.notificationReducer.get('notifications'),
});

// Map the dispatch and bind the action creators.
// See: http://redux.js.org/docs/api/bindActionCreators.html
// mapDispatchToProps :: Dispatch Func -> {Actions}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    actionCreators,
    dispatch
  ),
});

// Use connect both here and in your components.
// See: https://egghead.io/lessons/javascript-redux-generating-containers-with-connect-from-react-redux-visibletodolist
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default App;
