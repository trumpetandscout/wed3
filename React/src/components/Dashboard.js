// @flow

import React from 'react'
import LastTransactions from "./LastTransactions";
import NewTransaction from "./NewTransaction";

export type Props = {
  token: string,
}

class Dashboard extends React.Component {
  
  props: Props;

  constructor(props) {
    super(props);
    this.props = props;
  }
  
  render() {    

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <NewTransaction token={this.props.token} />
          </div>
          <div className="col-md-8">
            <LastTransactions token={this.props.token} />
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
