import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import * as ShoppingCartActions from './actions';
import { Button } from 'react-toolbox/lib/button';

class ShoppingCartDetail extends Component {

  render() {
    return (
      <div>
        shopping cart detail
        {
          // TODO stavové zobrazení divu? podle stavu se zobrazí div...
          // stav 1 přehled pizz v košíku, stav 2 zadání emailu, ...
          // nebo prostě odsud odkaz na stránku s objednáváním
        }
        <Button primary label={"Objednat"} />
      </div>
    );
  }
}

ShoppingCartDetail.propTypes = {
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

const Container = cssModules(ShoppingCartDetail, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
