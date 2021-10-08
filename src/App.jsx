import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PaymentPage from './pages/PaymentPage';
import Transactionhistory from './pages/TransactionHistory';
import { HOME, PAYMENT, TRANSACTION_HISTORY } from './services/routes';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={HOME} component={LandingPage} />
        <Route exact path={PAYMENT} component={PaymentPage} />
        <Route
          exact
          path={TRANSACTION_HISTORY}
          component={Transactionhistory}
        />
      </Switch>
    </Router>
  );
}

export default App;
