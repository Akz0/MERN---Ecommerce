import React from 'react'
import { Modal, Button } from 'react-bootstrap'


/**
* @author
* @function NewModal
**/

const NewModal = (props) => {
    return (
        <div>
            <Modal size={props.size} show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalTitle}</Modal.Title>
                </Modal.Header>
                {props.children}
                <Modal.Footer >
                    {
                        props.buttons ? props.buttons.map((button, index) => {
                            return <Button key={index} variant={button.color} onClick={button.onClick}>
                                {button.label}
                            </Button>
                        }) : <Button variant="primary" onClick={props.handleClose}>
                            Save
                        </Button>
                    }

                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default NewModal