import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route,Link,Switch,Redirect } from "react-router-dom";
import App from './App';
import Dashboard from './dashboard.js';
import DeleteByMail from './components/deleteByMail.js';
import * as serviceWorker from './serviceWorker';
import Register from './components/register.js';

ReactDOM.render(
  <Router>
  	<Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
    	<Route path="/remove">
    		<DeleteByMail />
    	</Route>
      <Route path="/register">
        <Register />
      </Route>
		<Route>

		</Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
