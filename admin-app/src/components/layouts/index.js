import React from 'react'
import Header from '../Header'
import {} from 'react-bootstrap'
export default function Layout(props) {
    return (
        <div>
            <Header/>
            {props.children}    
        </div>
    )
}
