import React from 'react'
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/layouts";
import Input from '../../components/ui/input';

/**
* @author
* @function SignUp
**/

const SignUp = (props) => {
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input placeholder='Enter your First Name' label='First Name' value=""  type="text" onChange={()=>{}}/>
                                </Col>

                                <Col md={6}>                                
                                    <Input placeholder='Enter your Last Name' label='Last Name' value=""  type="text" onChange={()=>{}}/>
                                </Col>

                            </Row>

                            <Input placeholder='Enter your Email' label='Email' value=""  type="email" onChange={()=>{}}/>
                            <Input placeholder='Enter Password' label='Password' value=""  type="password" onChange={()=>{}}/>

                            <Button variant="primary" type="submit">
                                Sign Up
                        </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </Layout>
    );

}

export default SignUp