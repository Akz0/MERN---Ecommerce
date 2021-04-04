import "./App.css";
import { } from "react-bootstrap";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Home from "./containers/home/home";
import SignIn from "./containers/signIn/signIn";
import SignUp from "./containers/signUp/signUp";

function App() {
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/signin" exact  component={SignIn}/>
          <Route path="/signup" exact  component={SignUp}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
