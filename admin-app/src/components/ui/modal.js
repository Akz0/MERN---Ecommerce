import React from 'react'
import { Modal,Button } from 'react-bootstrap'


/**
* @author
* @function NewModal
**/

const NewModal = (props) => {
  return(
    <div>
        <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalTitle}</Modal.Title>
                </Modal.Header>
                    {props.children}
                <Modal.Footer>
                    
                    <Button variant="primary" onClick={props.handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
    </div>
   )

 }

export default NewModal