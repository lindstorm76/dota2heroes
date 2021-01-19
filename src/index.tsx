import ReactDOM from 'react-dom'
import {
  App,
  HeroDetail,
  NotFound
} from "./components"
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
      <Route path="/:name" component={HeroDetail} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('root') as HTMLDivElement
)