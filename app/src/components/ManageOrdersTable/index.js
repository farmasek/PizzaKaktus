import React, { PropTypes, Component } from 'react';
import cssModules from 'react-css-modules';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import Checkbox from 'react-toolbox/lib/checkbox';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import * as styles from './index.module.scss';
import { statuses } from '../../models/Order';

class OrderList extends Component {

  getOrdersPizzas = (orderCart) => {
    const titles = [];
    if (this.props.pizzas.size > 0) {
      orderCart.map((item, index) => {
        titles.push(<span key={index}>
          { this.props.pizzas.get(item.pizzaId)
            ? this.props.pizzas.get(item.pizzaId).title
            : 'Vlastní' }
          { index !== orderCart.length - 1 ? <span>, </span> : null }
        </span>);
      });
    }
    return titles.length > 0 ? titles : '';
  };

  handleChangeClick = () => {
    let changes = new List();
    this.props.checkboxes.forEach((value, key) => {
      if (value) {
        const orderStatus = this.props.orders.get(key).orderStatus === statuses.CREATED
          ? statuses.OPENED
          : statuses.CLOSED;
        changes = changes.push({ id: key, orderStatus });
      }
    });
    this.props.handleOrderStatuses(changes);
  };

  renderRow = (order) =>
    <tr key={`order-${order.id}`}>
      <td>{order.dateCreated}</td>
      <td>{order.dateModified}</td>
      <td className={styles.columnLeft}>{order.customer.email}</td>
      <td className={styles.columnLeft}>{this.getOrdersPizzas(order.orderCart)}</td>
      <td>{order.orderStatus}</td>
      <td>
        <Checkbox
          checked={this.props.checkboxes.get(order.id)}
          label={order.orderStatus === statuses.CREATED ? statuses.OPENED : statuses.CLOSED}
          onChange={(checked) => this.props.handleOrderCheckbox(order.get('id'), checked)}
        />
      </td>
      <td className={styles.stornoButton}>
        <Button
          label={'Stornovat'}
          flat
          disabled={order.orderStatus !== statuses.CREATED}
          className={ order.orderStatus !== statuses.CREATED ? styles.disabled : null}
          onClick={() => this.props.orderCancel(order)}
        />
      </td>
    </tr>;

  render() {
    return (
      <div className={styles.orderList}>
        <Card >
          <CardTitle>Správa objednávek</CardTitle>
          <CardText>
        <table className={styles.orderListTable}>
          <thead>
          <tr>
            <th
              className={styles.dateColumn}
            >
              <span>Vytvořeno</span>
            </th>
            <th
              className={styles.dateColumn}
            >
              <span>Změněno</span>
            </th>
            <th>
              <span>Email</span>
            </th>
            <th>Pizzy</th>
            <th
              className={styles.orderStatusColumn}
            >
              <span>Stav</span>
            </th>
            <th>Změnit stav</th>
            <th>Stornovat</th>
          </tr>
          </thead>
          <tbody>
          { this.props.orders.toIndexedSeq().map(
            (order) => this.renderRow(order)) }
          </tbody>
        </table>
          </CardText>
          <CardActions>
        <Button
          label={'Změnit stavy vybraných objednávek'}
          onClick={() => this.handleChangeClick()}
          primary raised
        />
          </CardActions>
        </Card>
      </div>
    );
  }

}

OrderList.propTypes = {
  orders: ImmutablePropTypes.map.isRequired,
  checkboxes: ImmutablePropTypes.map.isRequired,
  pizzas: ImmutablePropTypes.map.isRequired,
  handleOrderCheckbox: PropTypes.func.isRequired,
  handleOrderStatuses: PropTypes.func.isRequired,
  orderCancel: PropTypes.func.isRequired,
};

export default cssModules(OrderList, styles);
