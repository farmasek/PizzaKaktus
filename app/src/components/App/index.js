import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions';
import { Navbar } from 'components';
import styles from './index.module.scss';
import AppBar from 'react-toolbox/lib/app_bar';

const Main = (props) => (
  <div>
    <AppBar fixed flat>
      <a href="/home">React Toolbox Docs</a>
      <Navbar />
    </AppBar>
    <div className={styles.content}>
      {React.cloneElement(props.children, props)}
    </div>
  </div>
);

Main.propTypes = {
  children: React.PropTypes.any,
};

// Map the global state to global props here.
// See: https://egghead.io/lessons/javascript-redux-generating-containers-with-connect-from-react-redux-visibletodolist
// mapStateToProps :: {State} -> {Action}
const mapStateToProps = (state) => ({
  messages: state.messages,
  errors: state.errors,
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
