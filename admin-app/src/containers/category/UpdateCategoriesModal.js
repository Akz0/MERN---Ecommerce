import React from 'react'
import Input from '../../components/ui/input'
import NewModal from '../../components/ui/modal'
import { Row, Col, Modal } from 'react-bootstrap'

const UpdateCategoriesModal = (props) => {
    const {
        hide,size,show,handleClose,modalTitle,expandedArray,checkedArray,handleCategoryInput,CategoryList
    } = props

    return (

        <NewModal show={show} handleClose={handleClose} hide={hide} modalTitle={modalTitle} size={size}>
            <Modal.Body>
                <Row>
                    <Col>
                        <h6><b>Expanded Items</b></h6>
                    </Col>
                </Row>
                {/* For Expanded Array */}
                {
                    expandedArray.length > 0 && expandedArray.map((item, index) => {
                        return (
                            <Row key={index}>
                                <Col>
                                    <Input value={item.name} placeholder={`Category Name`} onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')} />
                                </Col>
                                <Col>
                                    <select className='form-control' value={item.parentId} onChange={e => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                        <option>Select Parent Category</option>
                                        {CategoryList}
                                    </select>
                                </Col>
                                <Col>
                                    <select className='form-control' value={item.type} onChange={e => handleCategoryInput('type', e.target.value, index, 'expanded')}>
                                        <option>Select Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    })
                }

                <Row>
                    <Col>
                        <h6><b>Checked Items</b></h6>
                    </Col>
                </Row>

                {/* For Checked Array */}
                {
                    checkedArray.length > 0 && checkedArray.map((item, index) => {
                        return (
                            <Row key={index}>
                                <Col>
                                    <Input value={item.name} placeholder={`Category Name`} onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')} />
                                </Col>
                                <Col>
                                    <select className='form-control' value={item.parentId} onChange={e => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                        <option>Select Parent Category</option>
                                        {CategoryList}
                                    </select>
                                </Col>
                                <Col>
                                    <select className='form-control' value={item.type} onChange={e => handleCategoryInput('type', e.target.value, index, 'checked')}>
                                        <option>Select Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Modal.Body>
        </NewModal>

    )
}

export default UpdateCategoriesModal