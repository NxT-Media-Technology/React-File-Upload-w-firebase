import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route,Link,Switch } from "react-router-dom";
import App from './App';
import Adminpanel from './Adminpanel.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
  	<Switch>
  	 	<Route path="/app">
    		<App />
    	</Route>
    	<Route path="/adminpanel">
    		<Adminpanel />
    	</Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
