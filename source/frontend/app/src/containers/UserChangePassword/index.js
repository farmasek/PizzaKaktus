import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as IngredientActionCreators from './actions';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import * as PropTypes from 'react/lib/ReactPropTypes';
import {
  Card,
  CardTitle,
  CardText,
  CardActions,
} from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import { Input } from 'react-toolbox/lib/input';

class UserPWDChange extends Component {

  render() {
    return (
      <Card >
        <CardTitle>Změnit heslo</CardTitle>
        <CardText>
          <Input
            type="text"
            label="login"
            value={this.props.username}
            onChange={(value) => this.props.actions.changeValue('username', value)}
          />
          <Input
            type="password"
            label="Staré heslo"
            value={this.props.pwOld}
            onChange={(value) => this.props.actions.changeValue('pwOld', value)}
          />
          <Input
            type="password"
            label="Nové heslo"
            value={this.props.pw1}
            onChange={(value) => this.props.actions.changeValue('pw1', value)}
          />
          <Input
            type="password"
            label="Nove heslo znova"
            value={this.props.pw2}
            onChange={(value) => this.props.actions.changeValue('pw2', value)}
          />
          {this.props.validationMessage}
        </CardText>
        <CardActions>
          <Button
            label="Změnit heslo" disabled={!!this.props.validationMessage}
            primary raised onClick={() => this.props.actions.confirmChange(
              this.props.username,
              this.props.pwOld,
              this.props.pw1,
            )}
          />
        </CardActions>
      </Card>
    );
  }
}
UserPWDChange.propTypes = {
  username: PropTypes.string,
  pwOld: PropTypes.string,
  pw1: PropTypes.string,
  pw2: PropTypes.string,
  validationMessage: PropTypes.string,
  actions: PropTypes.object,
};

const mapStateToProps = (state) => ({
  username: state.changePwdReducer.username,
  pwOld: state.changePwdReducer.pwOld,
  pw1: state.changePwdReducer.pw1,
  pw2: state.changePwdReducer.pw2,
  validationMessage: state.changePwdReducer.validationMessage,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    IngredientActionCreators,
    dispatch
  ),
});

const Container = cssModules(UserPWDChange, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
