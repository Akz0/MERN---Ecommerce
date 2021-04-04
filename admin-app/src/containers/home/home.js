import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import Layout from '../../components/layouts'

/**
* @author
* @function Home
**/

const Home = (props) => {
  return(
    <Layout>
      <Jumbotron className="text-center">
        Admin Home Page
            {props.children}    
      </Jumbotron>
    </Layout>
   )

 }

export default Home