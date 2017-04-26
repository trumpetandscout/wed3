/**
 * Created by Joel on 24.04.2017.
 */
// @flow

import React from 'react'

import type { User } from '../api'

export type Props = {
    token: string,
    user: User,
}

class NewTransaction extends React.Component {

    props: Props;

    render() {
        return (
            <div>
                <h1>Neue Bewegung</h1>
                <form>
                <div class="form-group">
                    <label for="fromAccount">Von</label>
                    <select id="fromAccount" class="form-control" disabled>
                        <option>{{accountDetails.accountNr}} [{{accountDetails.amount | number: '1.2-2'}}]</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="toAccount">Zu</label>
                    <input type="number" class="form-control" id="toAccount" name="toAccountNr" placeholder="Ziel Konto Nummer" aria-describedby="toAccountHelp" ngModel>
                        <span id="toAccountHelp" class="help-block">{{getValidationTextToAccount()}}</span>
                </div>
                <div class="form-group">
                    <label class="sr-only" for="amount">Betrag (in Schweizerfranken)</label>
                    <div class="input-group">
                        <div class="input-group-addon">CHF</div>
                        <input type="number" class="form-control" id="amount" name="amount" placeholder="Betrag" ngModel>
                    </div>
                </div>
                <button class="btn btn-primary">Zahlen</button>
            </form>
            </div>
        )
    }
}

export default NewTransaction