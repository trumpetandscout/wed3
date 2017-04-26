// @flow

import React from 'react'

import type {getTransactions, Transaction, User} from '../api'

export type Props = {
  token: string,
  user: User,
}

function SelectElement(props) {
  const listOptions = (content) => <option>{content}</option>;
  return <div className="form-group">
    <label for={props.name}>props.label</label>
    <select id={props.name} name={props.name} className="form-control" onChange={props.onChange} selected={props.selected} >
      {props.options.map(listOptions)}
    </select>
  </div>;
}

function TransactionsTable({transactions}) {
  const tableEntry = (trans: Transaction) => <tr>
      <th scope="row">{new Date(Date.parse(trans.date)).toDateString()}</th>
      <td>{trans.from}</td>
      <td>{trans.target}</td>
      <td>{trans.amount.toFixed(2)} CHF</td>
      <td>{trans.total.toFixed(2)} CHF</td>
    </tr>;
  return <table className="table table-striped table-responsive">
    <thead className="thead-inverse">
      <th>Datum</th>
      <th>Von</th>
      <th>Zu</th>
      <th>Betrag</th>
      <th>Kontostand Neu</th>
    </thead>
    {transactions.map(tableEntry)}
  </table>
}

class AllTransactions extends React.Component {
  years: Array<number> = [2017, 2016, 2015];
  months: Array<string> = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  
  props: Props;

  state: {
    year: number,
    month: number,
    transactions: Array<Transaction>,
  } = {
    year: 0,
    month: 0,
    transactions: []
  };

  constructor(props) {
    super(props);
    this.props = props;
    this.setState({month: new Date(Date.now()).getMonth()});
    const fromDate = new Date(this.years[this.state.year], this.state.month, 1, 0, 0, 0, 0);
    let toDate;
    if (this.state.month === 11) {
      toDate = new Date(this.years[this.state.year] + 1, 0, 1, 0, 0, 0, 0);
    } else {
      toDate = new Date(this.years[this.state.year], this.state.month + 1, 1, 0, 0, 0, 0);
    }
    getTransactions(props.token, fromDate.toJSON(), toDate.toJSON()).then(result => this.setState({transactions: result}));
  }

  handleYearChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({year: event.target.value})
    }
  };

  handleMonthChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({month: event.target.value})
    }
  };
  
  render() {
    return (
      <div className="container">
        <div className="card">
          <h1 className="card-header">Konto Bewegungen</h1>
          <div className="card-block">
            <form>
              <SelectElement name="yearSelect" options={this.years} onChange={this.handleYearChanged.bind(this)}
                             selected={this.state.year} label="Wähle ein Jahr"/>
              <SelectElement name="monthSelect" options={this.months} onChange={this.handleMonthChanged.bind(this)}
                             selected={this.state.month} label="Wähle einen Monat"/>
            </form>
            <TransactionsTable transactions={this.state.transactions}/>
          </div>
        </div>
      </div>
    )
  }
}

export default AllTransactions
