/**
 * Created by Joel on 24.04.2017.
 */
// @flow

import React from 'react'

import type {AccountDetails, TransferResult} from '../api'
import {getAccountDetails, transfer} from '../api'


export type Props = {
    token: string,
}

function NewTransactionForm(props) {

  let ownAD = props.ownAD ? props.ownAD : { accountNr: 0, amount: 0 };

  return <div className="card">
    <h1 className="card-header">Neue Bewegung</h1>
    <div className="card-block">
      <form>
        <div className="form-group">
          <label htmlFor="fromAccount">Von</label>
          <select id="fromAccount" className="form-control" disabled>
            <option>{ownAD.accountNr} [{ownAD.amount.toFixed(2)} CHF]</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="toAccount">Zu</label>
          <input type="text" className="form-control" id="toAccount" name="toAccountNr" pattern="[0-9]{7}" value={props.target}
                 placeholder="Ziel Konto Nummer" aria-describedby="toAccountHelp" required onChange={props.handleTargetChange}/>
          <small id="toAccountHelp" className="help-block">{props.checkResponse}</small>
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="amount">Betrag (in Schweizerfranken)</label>
          <div className="input-group">
            <div className="input-group-addon">CHF</div>
            <input type="text" className="form-control" id="amount" name="amount" placeholder="Betrag"
                   pattern="[0-9]+(\.[0-9][05]?)?" required value={props.amount} onChange={props.handleAmountChange}/>
          </div>
        </div>
        { props.enableButton
          ? <button onClick={props.handleSubmit} className="btn btn-primary">Zahlen</button>
          : <button onClick={props.handleSubmit} className="btn btn-primary" disabled>Zahlen</button> }
      </form>
    </div>
  </div>
}

function NewTransactionSubmit(props) {
  return <div className="card">
    <h1 className="card-header">Bestätigung</h1>
    <div className="card-block">
      <div className="row">
        Transaktion zu {props.targetName} war erfolgreich!
      </div>
      <div className="row">
        Neuer Kontostand: {props.total.toFixed(2)} CHF
      </div>
      <div className="row">
        <button onClick={props.handleSubmit} className="btn btn-primary">Weitere Zahlung</button>
      </div>
    </div>
  </div>
}

class NewTransaction extends React.Component {

    props: Props;

  state: {
    ownAD: AccountDetails,
    target: string,
    amount: string,
    checkResponse: string,
    transferResult: TransferResult,
    submitted: boolean,
    isProcessing: boolean,
    error: string,
  } = {
    ownAD: null,
    target: "",
    amount: "",
    checkResponse: 'Bitte geben Sie die Ziel Konto Nummer ein.',
    transferResult: null,
    submitted: false,
    isProcessing: false,
    error: null,
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    getAccountDetails(this.props.token).then(result => this.setState({ownAD: result}));
  }

  handleTargetChange = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({target: event.target.value})
    }
  };

  handleAmountChange = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({amount: event.target.value})
    }
  };

  handlePaySubmit = (event: Event) => {
    event.preventDefault();
    const { target, amount } = this.state;
    this.setState({isProcessing: true})
    transfer(target, amount, this.props.token).then(result => {
      this.setState({transferResult: result, error: null, isProcessing: false, submitted: true})
    }).catch(error =>
      this.setState({error, isProcessing: false})
    )
  };

  handleNewSubmit = (event: Event) => {
    event.preventDefault();
    this.setState({submitted: false});
  };

    render() {
        return ( this.state.submitted
          ? <NewTransactionSubmit targetName={this.state.transferResult.target} total={this.state.transferResult.total}
                                  handleSubmit={this.handleNewSubmit.bind(this)}/>
                  : <NewTransactionForm ownAD={this.state.ownAD} checkResponse={this.state.checkResponse} enableButton={true}
                                        target={this.state.target} amount={this.state.amount}
                                        handleTargetChange={this.handleTargetChange.bind(this)}
                                        handleAmountChange={this.handleAmountChange.bind(this)}
                                        handleSubmit={this.handlePaySubmit.bind(this)}/>)}
}

export default NewTransaction