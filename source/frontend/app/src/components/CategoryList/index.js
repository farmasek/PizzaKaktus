import React, { PropTypes, Component } from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';

class CategoryList extends Component { // eslint-disable-line react/prefer-stateless-function

  renderRow = (category) =>
    <tr key={category.id}>
      <td>
        {category.name}
      </td>
    </tr>

  render() {
    return (
      <div className={styles.categoryList}>
        <h1>Seznam kategorií pizz</h1>
        <table className={styles.categoryListTable}>
          <thead>
          <tr>
            <th>Název</th>
          </tr>
          </thead>
          <tbody>
          { this.props.categories.toIndexedSeq().map(
            (category) => this.renderRow(category)) }
          </tbody>
        </table>
      </div>);
  }
}

CategoryList.propTypes = {
  categories: PropTypes.object.isRequired,
};

export default cssModules(CategoryList, styles);
