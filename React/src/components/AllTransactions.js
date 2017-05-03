// @flow

import React from 'react'

import type { Transaction, User} from '../api'
import {getTransactionsByDate} from '../api'


export type Props = {
  token: string,
  user: User,
}

function YearSelect(props) {
  const listOptions = (content, index) => <option key={index} value={index}>{content}</option>;
  return <div className="form-group">
    <label htmlFor="yearSelect">Wähle ein Jahr</label>
    <select id="yearSelect" name="yearSelect" className="form-control" onChange={props.handleYearChanged}>
      {props.years.map(listOptions)}
    </select>
  </div>;
}

function MonthSelect(props) {
  const listOptions = (content, index) => <option key={index} value={index}>{content}</option>;
  return <div className="form-group">
    <label htmlFor="monthSelect">Wähle einen Monat</label>
    <select id="monthSelect" name="monthSelect" className="form-control" onChange={props.handleMonthChanged} value={props.month}>
      {props.months.map(listOptions)}
    </select>
  </div>;
}

function TransactionsTable({transactions}) {
  const tableEntry = (trans: Transaction, index) => <tr key={index}>
      <th scope="row">{new Date(Date.parse(trans.date)).toDateString()}</th>
      <td>{trans.from}</td>
      <td>{trans.target}</td>
      <td>{trans.amount.toFixed(2)} CHF</td>
      <td>{trans.total.toFixed(2)} CHF</td>
    </tr>;
  return <table className="table table-striped table-responsive">
    <thead className="thead-inverse">
      <tr>
        <th>Datum</th>
        <th>Von</th>
        <th>Zu</th>
        <th>Betrag</th>
        <th>Kontostand Neu</th>
      </tr>
    </thead>
    <tbody>
     {transactions.map(tableEntry)}
    </tbody>
  </table>
}

class AllTransactions extends React.Component {
  years: Array<number> = [2017, 2016, 2015];
  months: Array<string> = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  
  props: Props;

  state: {
    year: number,
    month: number,
    transactions: Transaction[],
  };

  state = {
    year: 0,
    month: new Date().getMonth(),
    transactions: []
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  loadTransactions = () => {
    const fromDate = new Date(this.years[this.state.year], this.state.month, 1, 0, 0, 0, 0);
    let toDate;
    if (this.state.month === 11) {
      toDate = new Date(this.years[this.state.year] + 1, 0, 1, 0, 0, 0, 0);
    } else {
      toDate = new Date(this.years[this.state.year], this.state.month + 1, 1, 0, 0, 0, 0);
    }

    getTransactionsByDate(this.props.token, fromDate.toJSON(), toDate.toJSON()).then(result => this.setState({transactions: result.result}));
  };

  componentDidMount() {
    this.loadTransactions.bind(this)();
  }

  handleYearChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({year: event.target.value});
      this.loadTransactions.bind(this)();
    }
  };

  handleMonthChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({month: event.target.value});
      this.loadTransactions.bind(this)();
    }
  };
  
  render() {
    return (
      <div className="container">
        <div className="card">
          <h1 className="card-header">Konto Bewegungen</h1>
          <div className="card-block">
            <form>
              <YearSelect years={this.years} year={this.state.year}
                          handleYearChanged={this.handleYearChanged.bind(this)}/>
              <MonthSelect months={this.months} month={this.state.month}
                           handleMonthChanged={this.handleMonthChanged.bind(this)}/>
            </form>
            <TransactionsTable transactions={this.state.transactions}/>
          </div>
        </div>
      </div>
    )
  }
}

export default AllTransactions
