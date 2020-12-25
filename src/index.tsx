import ReactDOM from 'react-dom'
import App from './App'
import { HeroDetail } from "./components/HeroDetail"
import { NotFound } from "./components/NotFound"
import "./style.css"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/:name" component={HeroDetail} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('root') as HTMLDivElement
)