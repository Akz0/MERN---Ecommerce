import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/layouts";
import Input from "../../components/ui/input";

/**
 * @author
 * @function SignIn
 **/

const SignIn = (props) => {
    return (
        <Layout>
            <Container>
                <Row style={{marginTop:'50px'}}>
                    <Col md={{span:6,offset:3}}> 
                        <Form>
                            <Input placeholder='Enter your Email' label='Email' value=""  type="email" onChange={()=>{}}/>
                            <Input placeholder='Enter Password' label='Password' value=""  type="password" onChange={()=>{}}/>                           
                            <Button variant="primary" type="submit">
                                Sign In
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </Layout>
    );
};

export default SignIn;
