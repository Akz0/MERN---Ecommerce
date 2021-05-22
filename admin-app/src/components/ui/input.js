import React from 'react'
import { Form } from 'react-bootstrap'

function Input(props) {
    return (
        <Form.Group>
            {props.label?<Form.Label>{props.label}</Form.Label>:null}
            <Form.Control type={props.type} disabled={props.disabled} placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
            <Form.Text type="text-muted">
                {props.errorMessage}
            </Form.Text>
        </Form.Group>
    )
}

export default Input
