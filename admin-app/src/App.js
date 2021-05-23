import "./App.css";
import { } from "react-bootstrap";
import {Route,Switch} from 'react-router-dom'
import Home from "./containers/home/home";
import SignIn from "./containers/signIn/signIn";
import SignUp from "./containers/signUp/signUp";
import PrivateRoute from "./components/hoc/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getInitialData, isUserLoggedIn } from "./actions";
import Products from "./containers/products/products";
import Orders from "./containers/orders/orders";
import Category from './containers/category/category'
function App() {
  
  const dispatch=useDispatch()
  const auth=useSelector(state=>state.auth)
  useEffect (() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
    dispatch(getInitialData())
  },[])


  return (
    <div className="App">

      
        <Switch>

          <PrivateRoute path="/" exact component={Home}/>
          <PrivateRoute path="/products" component={Products}/>
          <PrivateRoute path="/orders" component={Orders}/>
          <PrivateRoute path="/category" component={Category}/>

          <Route path="/signin" exact  component={SignIn}/>
          <Route path="/signup" exact  component={SignUp}/>

        </Switch>
      
    </div>
  );
}

export default App;
