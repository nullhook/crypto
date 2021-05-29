import React from 'react';
import CryptoTabs from 'components/CryptoTabs';
import {
  Switch, Route, useRouteMatch, Redirect
} from 'react-router-dom';
import Portfolio from './Portfolio';

function Crypto() {
  let match = useRouteMatch();

  return (
    <div className="App-right-canvas">
      <div className="App-crypto-tabs">
        <CryptoTabs />
      </div>
      <Switch>
        <Route path={`${match.path}/portfolio`}>
          <Portfolio />
        </Route>
        <Route exact path={`${match.path}`}>
          <Redirect to={`${match.path}/portfolio`} />
        </Route>
      </Switch>
    </div>
  )
}

export default Crypto;