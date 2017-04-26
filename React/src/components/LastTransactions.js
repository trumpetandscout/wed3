/**
 * Created by Joel on 24.04.2017.
 */
// @flow

import React from 'react'

import type {getTransactions, Transaction} from '../api'

import { Link } from 'react-router-dom'

export type Props = {
  token: string,
}

function TransactionsTable({transactions}) {
  const tableEntry = (trans: Transaction) => <tr>
    <th scope="row">{trans.from}</th>
    <td>{trans.target}</td>
    <td>{trans.amount.toFixed(2)} CHF</td>
    <td>{trans.total.toFixed(2)} CHF</td>
  </tr>;
  return <table className="table table-striped table-responsive">
    <thead className="thead-inverse">
    <th>Von</th>
    <th>Zu</th>
    <th>Betrag</th>
    <th>Kontostand Neu</th>
    </thead>
    {transactions.map(tableEntry)}
  </table>
}

class LastTransactions extends React.Component {

  props: Props;

  state: {
    transactions: Array<Transaction>,
  };

  constructor(props) {
    super(props);
    this.props = props;
    getTransactions(props.token).then(result => this.setState({transactions: result}));
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