import React,{useState} from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/layouts";
import Input from "../../components/ui/input";
import { login} from '../../actions'
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
/**
 * @author
 * @function SignIn
 **/


const SignIn = (props) => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('')
    const auth= useSelector(state=>state.auth)
    const dispatch=useDispatch();


    const userLogin=(event)=>{
        
        event.preventDefault()

        const user = {
            email,
            password
        }
        
        dispatch(login(user));
    }

    if(auth.authenticate){
        return <Redirect to={''}/>
    }

    return (
        <Layout>
            <Container>
                <Row style={{marginTop:'50px'}}>
                    <Col md={{span:6,offset:3}}> 
                        <Form onSubmit={(event)=>userLogin(event)}>
                            <Input placeholder='Enter your Email' label='Email' value={email}  type="email" autocomplete="on" onChange={(e)=>setEmail(e.target.value)}/>
                            <Input placeholder='Enter Password' label='Password' value={password}  type="password" onChange={(e)=>setPassword(e.target.value)}/>                           
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
