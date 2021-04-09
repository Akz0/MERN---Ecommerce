import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { signup } from '../../actions';
import Layout from "../../components/layouts";
import Input from '../../components/ui/input';

/**
* @author
* @function SignUp
**/

const SignUp = (props) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [error,setError ]=useState('')

    const auth=useSelector(state=>state.auth)
    const register=useSelector(state=>state.register)
    const dispatch=useDispatch()


    if(auth.authenticate){
        return <Redirect to={'/'}/>
    }
    if(register.loading){
        return <p>Loading</p>
    }
    

    const adminSignup=(e)=>{
        e.preventDefault()
        const user={firstName,lastName,email,password}
        dispatch(signup(user))
    }

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={e=>adminSignup(e)}>
                            <Row>
                                <Col md={6}>
                                    <Input placeholder='First Name' label='First Name' value={firstName}  type="text" onChange={(e)=>setFirstName(e.target.value)}/>
                                </Col>

                                <Col md={6}>                                
                                    <Input placeholder='Last Name' label='Last Name' value={lastName}  type="text" onChange={(e)=>setLastName(e.target.value)}/>
                                </Col>

                            </Row>

                            <Input placeholder='Enter your Email' label='Email' value={email}  type="email" onChange={(e)=>setEmail(e.target.value)}/>
                            <Input placeholder='Enter Password' label='Password' value={password}  type="password" onChange={(e)=>setPassword(e.target.value)}/>

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