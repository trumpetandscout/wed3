/**
 * Created by Joel on 24.04.2017.
 */
// @flow

import React from 'react'

import type { Transaction} from '../api'
import {getTransactions} from '../api'

import { Link } from 'react-router-dom'

export type Props = {
  token: string,
}

function TransactionsTable(props) {

  const tableEntry = (trans: Transaction, index) =>
    <tr key={index}>
      <th scope="row">{trans.from}</th>
      <td>{trans.target}</td>
      <td>{trans.amount.toFixed(2)} CHF</td>
      <td>{trans.total.toFixed(2)} CHF</td>
   </tr>;

  return (
  <table className="table table-striped table-responsive">
    <thead className="thead-inverse">
      <tr>
        <th>Von</th>
        <th>Zu</th>
        <th>Betrag</th>
        <th>Kontostand Neu</th>
      </tr>
    </thead>
    <tbody>
      {props.transactions.map(tableEntry)}
    </tbody>
  </table>
  )
}

class LastTransactions extends React.Component {

  props: Props;

  state: {
    transactions: Transaction[],
  };

  state = {
    transactions: [],
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    getTransactions(this.props.token).then(result => this.setState({transactions: result.result}) );
  }

  render() {
    return (
      <div className="card">
        <h1 className="card-header">Letzte Bewegungen</h1>
        <div className="card-block">
          <TransactionsTable transactions={this.state.transactions}/>
          <Link className="btn btn-primary" to="/transactions">Alle Anzeigen</Link>
        </div>
      </div>
    )
  }
}

export default LastTransactions