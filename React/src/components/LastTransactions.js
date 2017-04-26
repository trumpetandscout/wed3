/**
 * Created by Joel on 24.04.2017.
 */
// @flow

import React from 'react'

import type {Transaction, User} from '../api'

import { Link } from 'react-router-dom'

export type Props = {
  token: string,
  user: User,
}

function TransactionsTable({transactions}) {
  const tableEntry = (trans: Transaction) => <tr>
    <td>{trans.from}</td>
    <td>{trans.target}</td>
    <td>{trans.amount}</td>
    <td>{trans.total}</td>
  </tr>;
  return <table>
    <thead>
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

  render() {
    return (
      <div>
        <h1>Letzte Bewegungen</h1>
        <TransactionsTable transactions={this.state.transactions}/>
        <Link class="btn btn-primary" to="/transactions">Alle Anzeigen</Link>
      </div>
    )
  }
}

export default LastTransactions