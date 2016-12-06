import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import * as ShoppingCartActions from './actions';
import Menu from '../../components/Menu';

class MenuContainer extends Component {

  render() {
    return (
      <div>
        <Menu />
      </div>
    );
  }
}

MenuContainer.propTypes = {
};

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = (state) => ({
});

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    ShoppingCartActions,
    dispatch
  ),
});

const Container = cssModules(MenuContainer, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
