import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActionCreators from './actions';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import * as PropTypes from 'react/lib/ReactPropTypes';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import DatePicker from 'react-toolbox/lib/date_picker';
import { localeCS } from '../../components/OrderList/index';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import moment from 'moment';
class StatisticsContainer extends Component {
  componentWillMount() {
    this.props.actions.fetchStatsFields(
      this.props.stats.startDate,
      this.props.stats.endDate
    );
    this.props.actions.fetchStatsGraph(
      this.props.stats.startDate,
      this.props.stats.endDate
    );
  }

  formatDate = value => {
    const day = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate();
    const month = value.getMonth() + 1 < 10
      ? `0${value.getMonth() + 1}`
      : value.getMonth() + 1;
    const year = value.getFullYear();
    return `${day}.${month}.${year}`;
  };

  render() {
    return (
      <div className={styles.pizza}>
        <Card>
          <CardTitle>Statistiky</CardTitle>
          <CardText>
            <div className={styles.pickerz}>
              <h3>Období: </h3>
              <DatePicker
                label="Od"
                onChange={val => {
                  this.props.actions.changeDateRange('startDate', val);
                  this.props.actions.fetchStatsGraph(
                    moment(val),
                    this.props.stats.endDate
                  );
                }}
                value={this.props.stats.startDate.toDate()}
                style={{ width: '200px' }}
                locale={localeCS}
                inputFormat={value => this.formatDate(value)}
              />
              <DatePicker
                label="Do"
                onChange={val => {
                  this.props.actions.changeDateRange('endDate', val);
                  this.props.actions.fetchStatsGraph(
                    this.props.stats.startDate,
                    moment(val)
                  );
                }}
                value={this.props.stats.endDate.toDate()}
                style={{ width: '200px' }}
                locale={localeCS}
                inputFormat={value => this.formatDate(value)}
              />
            </div>
            <div className={styles.pickerz}>
              <h3>Počet prodaných pizz: </h3>
              <h3>{this.props.stats.soldPizzaCount}</h3>
            </div>
            <div className={styles.pickerz}>
              <h3>Celková tržba: </h3>
              <h3>{this.props.stats.soldPizzaMoney} Kč</h3>
            </div>
            <div className={styles.pickerz}>
              <h3>Nejprodávanější pizza: </h3>
              <h3>{this.props.stats.mostSoldPizza}</h3>
            </div>
          </CardText>
        </Card>
        <br />
        <Card>
          <CardTitle>Graf za období:</CardTitle>
          <CardText>
            <LineChart
              width={800}
              height={500}
              data={this.props.stats.ordersGraph.toJS()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="day" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                name="Prodáno"
                type="monotone"
                dataKey="sold"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </CardText>
        </Card>
      </div>
    );
  }
}
StatisticsContainer.propTypes = {
  actions: PropTypes.object,
  stats: ImmutablePropTypes.record,
};

const mapStateToProps = state => ({
  stats: state.statisticsReducer,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(OrderActionCreators, dispatch),
});

const Container = cssModules(StatisticsContainer, styles);

export default connect(mapStateToProps, mapDispatchToProps)(Container);
