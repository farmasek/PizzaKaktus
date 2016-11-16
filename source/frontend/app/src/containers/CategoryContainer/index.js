/**
 * Created by e-myslivost on 6.11.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CategoryActionCreators from './actions';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import * as PropTypes from 'react/lib/ReactPropTypes';
import CreateCategory from '../../components/CreateCategory';
import CategoryList from '../../components/CategoryList';

class Category extends Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.actions.fetchCategoryList();
  }

  render() {
    return (
      <div className={styles.category}>
        <div className={styles.flexChild}>
          <CategoryList category={this.props.categories.categories} />
        </div>
        <div className={styles.flexChild}>
          <CreateCategory
            editValue={this.props.actions.changeValue}
            categoryForm={this.props.categories.categoryForm}
            confirmForm={this.props.actions.saveCategory}
          />
        </div>
      </div>
    );
  }
}
Category.propTypes = {
  categories: PropTypes.object,
  actions: PropTypes.object,
};

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = (state) => ({
  categories: state.categoryContainer,
});

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    CategoryActionCreators,
    dispatch
  ),
});

const Container = cssModules(Category, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
