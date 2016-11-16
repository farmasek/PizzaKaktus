import React, { PropTypes, Component } from 'react';

import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Table from 'react-toolbox/lib/table';


const TableModel = {
  name: { type: String, title: 'Jméno' },
  amount: { type: String, title: 'Množství' },
  cost: { type: Number, title: 'Cena sam.' },
  costCustom: { type: Number, title: 'Cena dopl.' },
};

class IngredientList extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className={styles.ingredientList}>
        <h1>Seznam ingrediencí</h1>
        <Table
          model={TableModel}
          selectable={false}
          source={this.props.ingredients}
        />
      </div>);
  }
}


IngredientList.propTypes = {
  ingredients: PropTypes.object.isRequired,
};

export default cssModules(IngredientList, styles);
