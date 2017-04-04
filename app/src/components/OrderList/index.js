import React, { PropTypes, Component } from 'react';
import cssModules from 'react-css-modules';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from 'react-toolbox/lib/input';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import DatePicker from 'react-toolbox/lib/date_picker';
import TimePicker from 'react-toolbox/lib/time_picker';
import styles from './index.module.scss';

const localeCS = {
  months: 'Leden_Únor_Březen_Duben_Květen_Červen_Červenec_Srpen_Září_Říjen_Listopad_Prosinec'
  .split('_'),
  monthsShort: 'led_úno_bře_dub_kvě_čer_čec_srp_zář_říj_lis_pro'.split('_'),
  weekdays: 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
  weekdaysShort: 'ne_po_út_st_čt_pá_so'.split('_'),
  weekdaysLetter: 'N_P_Ú_S_Č_P_S'.split('_'),
};

class OrderList extends Component {

  getOrdersPizzas = (orderCart) => {
    const titles = [];
    if (this.props.pizzas.size > 0) {
      orderCart.map((item, index) => {
        titles.push(<span key={index}>
          { this.props.pizzas.get(item.pizzaId)
            ? this.props.pizzas.get(item.pizzaId).title
            : 'Vlastní' }
          { index !== item.pizzaId.length - 1 ? <span>, </span> : null }
        </span>);
      });
    }
    return titles.length > 0 ? titles : '';
  };

  formatDate = (value) => {
    const day = (value.getDate() < 10) ? `0${value.getDate()}` : value.getDate();
    const month = (value.getMonth() + 1 < 10) ? `0${value.getMonth() + 1}` : value.getMonth() + 1;
    const year = value.getFullYear();
    return `${day}.${month}.${year}`;
  };

  renderRow = (order) =>
    <tr key={`order-${order.id}`}>
      <td>{order.dateCreated}</td>
      <td>{order.dateModified}</td>
      <td>{order.orderStatus}</td>
      <td className={styles.columnLeft}>{order.customer.email}</td>
      <td className={styles.columnLeft}>{this.getOrdersPizzas(order.orderCart)}</td>
    </tr>;

  renderNumberLine = (numberOfPages) => {
    const numbers = [];
    const selectedPage = this.props.pagination.get('number');
    for (let i = 0; i < numberOfPages; i++) {
      numbers.push(<span
        className={i === selectedPage ? styles.paginationSelected : styles.paginationNormal}
        onClick={() => this.props.changePagination('number', i)}
        key={i}
      >
        {i + 1}
        </span>);
    }
    return numbers.map(n => n);
  };

  render() {
    const pagination = this.props.pagination;
    const arrow = pagination.get('sortDir') === 'ASC'
      ? <i className={`${styles.sortIcon} material-icons`}>arrow_upward</i>
      : <i className={`${styles.sortIcon} material-icons`}>arrow_downward</i>;
    return (
      <div className={styles.orderList}>
        <Card >
          <CardTitle>Historie objednávek</CardTitle>
          <CardText>
            <div className={styles.paginationLane}>
              <Input
                className={styles.sortName}
                label="Filtr stavu a emailu" type="text"
                value={pagination.get('filterPhrase')}
                onChange={(val) => this.props.changePagination('filterPhrase', val)}
              />
              <DatePicker
                label="Od"
                onChange={(val) => this.props.changePagination('startDate', val)}
                value={pagination.get('startDate').toDate()}
                inputFormat={(value) => this.formatDate(value)}
                locale={localeCS}
                style={{ width: '100px' }}
              />
              <TimePicker
                label=""
                onChange={(val) => this.props.changeTime('startDate', val)}
                value={pagination.get('startDate').toDate()}
                style={{ width: '100px' }}
              />
              <DatePicker
                label="Do"
                onChange={(val) => this.props.changePagination('endDate', val)}
                value={pagination.get('endDate').toDate()}
                inputFormat={(value) => this.formatDate(value)}
                locale={localeCS}
                style={{ width: '100px' }}
              />
              <TimePicker theme={styles}
                label=""
                onChange={(val) => this.props.changeTime('endDate', val)}
                value={pagination.get('endDate').toDate()}
                style={{ width: '100px' }}
              />
              <Input
                className={styles.sortSize}
                label="Počet"
                type="number" value={pagination.get('size')}
                onChange={(val) => this.props.changePagination('size', val)}
              />
              {
                pagination.get('totalPages') > 0
                  ? this.renderNumberLine(pagination.get('totalPages')) :
                  pagination.get('totalPages')
              }
            </div>
            {
              this.props.orders.size > 0
                ? <table className={styles.orderListTable}>
                  <thead>
                  <tr>
                    <th
                      className={`${styles.tableHeaderSortable} ${styles.dateColumn}`}
                    >
                  <span
                    onClick={() => this.props.changePagination('sortBy', 'dateCreated')}
                  >Vytvořeno</span>
                      {pagination.get('sortBy') === 'dateCreated' ? arrow : null}
                    </th>
                    <th
                      className={`${styles.tableHeaderSortable} ${styles.dateColumn}`}
                    >
                  <span
                    onClick={() => this.props.changePagination('sortBy', 'dateModified')}
                  >Změněno</span>
                      {pagination.get('sortBy') === 'dateModified' ? arrow : null}
                    </th>
                    <th
                      className={`${styles.tableHeaderSortable} ${styles.orderStatusColumn}`}
                    >
                  <span
                    onClick={() => this.props.changePagination('sortBy', 'orderStatus')}
                  >Stav</span>
                      {pagination.get('sortBy') === 'orderStatus' ? arrow : null}
                    </th>
                    <th
                      className={styles.tableHeaderSortable}
                    >
                  <span
                    onClick={() => this.props.changePagination('sortBy', 'customer.email')}
                  >Email</span>
                      {pagination.get('sortBy') === 'customer.email' ? arrow : null}
                    </th>
                    <th>Pizzy</th>
                  </tr>
                  </thead>
                  <tbody>
                  { this.props.orders.toIndexedSeq().map(
                    (order) => this.renderRow(order)) }
                  </tbody>
                </table>
                : <h2>Na základě vybraných filtrů nebyly nalezeny žádné objednávky.</h2>
            }
          </CardText>
        </Card>
      </div>
    );
  }

}

OrderList.propTypes = {
  orders: ImmutablePropTypes.map.isRequired,
  pizzas: ImmutablePropTypes.map.isRequired,
  pagination: ImmutablePropTypes.map.isRequired,
  changePagination: PropTypes.func.isRequired,
  changeTime: PropTypes.func.isRequired,
};

export default cssModules(OrderList, styles);
