import React, { useState } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createNewCategory } from '../../actions'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosCheckmark, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

import Layout from '../../components/layouts'
import Input from '../../components/ui/input'
import NewModal from '../../components/ui/modal'

/**
* @author
* @function Category
**/
const renderCategories = (categories) => {
    let myCategories = []
    for (let cat of categories) {
        myCategories.push(
            {
                label: cat.name,
                value: cat._id,
                children: cat.children.length > 0 && renderCategories(cat.children)
            }
        )
    }
    return myCategories
}

const CreateCategoryList = (categories, options = []) => {
    for (let cat of categories) {
        options.push({ value: cat._id, name: cat.name, parentId: cat.parentId, type: cat.type })
        if (cat.children.length > 0) {
            CreateCategoryList(cat.children, options)
        }
    }
    return options
}

const Category = (props) => {

    const category = useSelector(state => state.category)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryID, setParentCategoryID] = useState('')
    const [type, setType] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [showUpdateModal, setShowUpdateModal] = useState(false)


    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [checkedArray, setCheckedArray] = useState([])
    const [expandedArray, setExpandedArray] = useState([])

    const handleClose = () => {
        const form = new FormData()
        form.append('name', categoryName)
        form.append('parentId', parentCategoryID)
        form.append('type', type)
        form.append('categoryImage', categoryImage)
        setCategoryName('')
        setParentCategoryID('')

        dispatch(createNewCategory(form))
        setShow(false);

    }
    const handleShow = () => setShow(true);
    const handleCategoryImage = (e) => setCategoryImage(e.target.files[0])

    const handleUpdateCategoryModal = () => {
        setShowUpdateModal(true)
        const categories = CreateCategoryList(category.categories)
        const checkedArray = []
        const expandedArray = []
        checked.length > 0 && checked.forEach((catId, index) => {
            const category = categories.find((cat, i) => {
                return catId === cat.value
            })
            category && checkedArray.push(category)
        })
        expanded.length > 0 && expanded.forEach((catId, index) => {
            const category = categories.find((cat, i) => {
                return catId === cat.value
            })
            category && expandedArray.push(category)
        })

        setCheckedArray(checkedArray)
        setExpandedArray(expandedArray)
        console.log(categories, checkedArray, expandedArray)
    }

    const handleCategoryInput = (key, value, _index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, index) => {
                return index == _index ?
                    {
                        ...item,
                        [key]: value
                    } : item
            })
            setCheckedArray(updatedCheckedArray)
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, index) => {
                return index == _index ?
                    {
                        ...item,
                        [key]: value
                    } : item
            })
            setCheckedArray(updatedExpandedArray)
        }
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <Button variant="primary" onClick={handleShow}>
                                Add Category
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        {/* <ul>
                            {renderCategories(category.categories)}
                            {JSON.stringify()}
                        </ul> */}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={
                                {
                                    check: <IoIosCheckbox />,
                                    uncheck: <IoIosCheckboxOutline />,
                                    halfCheck: <IoIosCheckmark />,
                                    expandClose: <IoIosArrowForward />,
                                    expandOpen: <IoIosArrowDown />,

                                }
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button>Delete</button>
                        <button onClick={handleUpdateCategoryModal}>Edit</button>
                    </Col>
                </Row>
            </Container>

            {/* Add New Categories Modal */}
            <NewModal show={show} handleClose={handleClose} modalTitle='Add New Category'>

                <Modal.Body>
                    <Input value={categoryName} placeholder={`Category Name`} onChange={(e) => setCategoryName(e.target.value)} />
                    <select className='form-control' value={parentCategoryID} onChange={e => setParentCategoryID(e.target.value)}>
                        <option>Select Parent Category</option>
                        {CreateCategoryList(category.categories).map(option =>
                            <option key={option.value} value={option.value} >{option.name}</option>
                        )}
                    </select>

                    <select className='form-control' value={type} onChange={e => setType(e.target.value)}>
                        <option>Select Type</option>
                        <option>Store</option>
                        <option>Product</option>
                        <option>Page</option>
                    </select>

                    <input type='file' name='categoryImage' onChange={handleCategoryImage} />
                </Modal.Body>

            </NewModal>



            {/* Edit Categories Modal */}
            <NewModal show={showUpdateModal} handleClose={() => setShowUpdateModal(false)} modalTitle='Edit Categories' size='lg'>

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
                                            {CreateCategoryList(category.categories).map(option =>
                                                <option key={option.value} value={option.value} >{option.name}</option>
                                            )}
                                        </select>
                                    </Col>
                                    <Col>
                                        <select className='form-control' value={item.type} onChange={e => setType(e.target.value)}>
                                            <option>Select Type</option>
                                            <option>Store</option>
                                            <option>Product</option>
                                            <option>Page</option>
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
                                            {CreateCategoryList(category.categories).map(option =>
                                                <option key={option.value} value={option.value} >{option.name}</option>
                                            )}
                                        </select>
                                    </Col>
                                    <Col>
                                        <select className='form-control' value={item.type} onChange={e => setType(e.target.value)}>
                                            <option>Select Type</option>
                                            <option>Store</option>
                                            <option>Product</option>
                                            <option>Page</option>
                                        </select>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </Modal.Body>

            </NewModal>

        </Layout>
    )

}

export default Category
