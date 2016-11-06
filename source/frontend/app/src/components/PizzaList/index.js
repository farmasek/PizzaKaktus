import React, { PropTypes, Component } from 'react';

import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Table from 'react-toolbox/lib/table';


const TableModel = {
  name: { type: String, title: 'Název Pizzy' },
};

class PizzaList extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className={styles.pizzaList}>
        <h1>Seznam Pizz</h1>
        <Table
          model={TableModel}
          selectable={false}
          source={this.props.pizzas}
        />
      </div>);
  }
}


PizzaList.propTypes = {
  pizzas: PropTypes.object.isRequired,
};

export default cssModules(PizzaList, styles);
/**
 * Created by e-myslivost on 6.11.2016.
 */
