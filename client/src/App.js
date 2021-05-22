import React from 'react'
import HomePage from './containers/HomePage/HomePage'
import {BrowserRouter as Router,Route,Switch}from 'react-router-dom'  
import ProductsListPage from './containers/ProductsListPage/ProductsList'
/**
* @author
* @function App
**/

const App = (props) => {
  return(
    <Router>
        <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/:slug" exact component={ProductsListPage}/>
        </Switch>
    </Router>
   )

 }

export default App
