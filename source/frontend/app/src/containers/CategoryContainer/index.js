/**
 * Created by e-myslivost on 6.11.2016.
 */
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
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
          {
            !(this.props.loading)
              ? <CategoryList
                categories={this.props.categories}
              />
              : null
          }
        </div>
        <div className={styles.flexChild}>
          <CreateCategory
            editValue={this.props.actions.changeValue}
            categoryForm={this.props.categoryForm}
            confirmForm={this.props.actions.saveCategory}
            categoryError={this.props.categoryError}
            categoryErrors={this.props.categoryErrors}
            categoryValidation={this.props.actions.categoryValidation}
          />
        </div>
      </div>
    );
  }
}
Category.propTypes = {
  categories: PropTypes.object,
  actions: PropTypes.object,
  categoryErrors: PropTypes.object,
  categoryError: PropTypes.string,
  categoryForm: ImmutablePropTypes.map,
  loading: PropTypes.bool,
};

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = (state) => ({
  categories: state.categoryContainer.categories,
  categoryForm: state.categoryContainer.categoryForm,
  categoryError: state.categoryContainer.categoryError,
  categoryErrors: state.categoryContainer.categoryErrors,
  loading: state.categoryContainer.loading,
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
