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
import { RecoilRoot } from "recoil"

ReactDOM.render(
  <Router>
    <RecoilRoot>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/:name" component={HeroDetail} />
        <Route path="*" component={NotFound} />
      </Switch>
    </RecoilRoot>
  </Router>,
  document.getElementById('root') as HTMLDivElement
)