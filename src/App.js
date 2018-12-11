import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomeContainer from './containers/HomeContainer';
import CustomersContainers from './containers/CustomersContainers';
import CustomerConteiner from './containers/CustomerConteiner';
import NewCustomerContainer from './containers/NewCustomerContainer';
import './App.css';






class App extends Component {
  renderCustomerContainer = () => <h1>Customer Container</h1>;

  renderCustomerListContainer = () => <h1>Customers List Container</h1>;
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={HomeContainer} />
          <Route exact path='/customers' component={CustomersContainers} />
          <Switch>
            <Route path='/customers/new' component={NewCustomerContainer} />
            <Route path='/customers/:dni' render={props => <CustomerConteiner dni={props.match.params.dni} />} />
          </Switch>

        </div>
      </Router>

    );
  }
}

export default App;
