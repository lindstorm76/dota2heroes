import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import HeroDetail from "./components/HeroDetail"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App}>
      </Route>
      <Route path="/:name" component={HeroDetail}>
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
)