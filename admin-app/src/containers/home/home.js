import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './home.css'

import Layout from '../../components/layouts'

/**
* @author
* @function Home
**/

const Home = (props) => {




    return (
        <Layout>
            <Container fluid>
                <Row>
                    <Col md={2} className="sidebar">SideBar</Col>
                    <Col md={10} style={{marginLeft:'auto'}}>Container</Col>
                </Row>
            </Container>
            {/* <Jumbotron className="text-center">
        Admin Home Page
            {props.children}    
      </Jumbotron> */}
        </Layout>
    )

}

export default Home