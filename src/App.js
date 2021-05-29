import Sidenav from 'components/Sidenav';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Crypto from 'pages/Crypto';
import Cards from 'pages/Cards';
import Rewards from 'pages/Rewards';

/*
* TODO: Private routes
* TODO: Port to route config rather than manual import process
* TODO: Handle routes that does not match path i.e 404
*/

function App() {
  return (
    <div className="App">
    <Router>
      <div className="App-sidebox">
        <Sidenav />
      </div>
      <Switch>
        <Route path="/cards">
          <Cards />
        </Route>
        <Route path="/rewards">
          <Rewards />
        </Route>
        <Route path="/crypto">
          <Crypto />
        </Route>
        <Route path="/">
          <Redirect to="/crypto" />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
