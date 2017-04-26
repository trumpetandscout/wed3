// @flow

import React from 'react'

import type {Transaction, User} from '../api'

export type Props = {
  token: string,
  user: User,
}

function SelectElement(props) {
  const listOptions = (content) => <option>{content}</option>;
  return <div class="form-group">
    <label for={props.name}>props.label</label>
    <select id={props.name} name={props.name} class="form-control" onChange={props.onChange} selected={props.selected} >
      {props.options.map(listOptions)}
    </select>
  </div>;
}

function TransactionsTable({transactions}) {
  const tableEntry = (trans: Transaction) => <tr>
      <th>{trans.date}</th>
      <td>{trans.from}</td>
      <td>{trans.target}</td>
      <td>{trans.amount}</td>
      <td>{trans.total}</td>
    </tr>;
  return <table>
    <thead>
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
        <div>
          <h1>Konto Bewegungen</h1>
          <div>
            <form>
              <SelectElement name="yearSelect" options={this.years} onChange={this.handleYearChanged}
                             selected={this.state.year} label="Wähle ein Jahr"/>
              <SelectElement name="monthSelect" options={this.months} onChange={this.handleMonthChanged}
                             selected={this.state.month} label="Wähle einen Monat"/>
            </form>
          </div>
          <TransactionsTable transactions={this.state.transactions}/>
        </div>
    )
  }
}

export default AllTransactions
