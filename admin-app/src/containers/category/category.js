import React, { useState } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createNewCategory } from '../../actions'

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
            <li key={cat._id}>
                {cat.name}
                {cat.children.length > 0 ? (<ul>{renderCategories(cat.children)}</ul>) : null}
            </li>
        )
    }
    return myCategories
}

const CreateCategoryList =(categories,options=[])=>{
    for(let cat of categories){
        options.push({value:cat._id,name:cat.name})
        if(cat.children.length>0){
            CreateCategoryList(cat.children,options)
        }
    }
    return options
}


const Category = (props) => {

    const category = useSelector(state => state.category)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [categoryName,setCategoryName]=useState('')
    const [parentCategoryID,setParentCategoryID]=useState('')
    const [categoryImage,setCategoryImage]=useState('')

    const handleClose = () => {
        const form= new FormData()
        form.append('name',categoryName)
        form.append('parentId',parentCategoryID)
        form.append('categoryImage',categoryImage)
        setCategoryName('')
        setParentCategoryID('')

        dispatch(createNewCategory(form))
        setShow(false);
        
    }
    const handleShow = () => setShow(true);
    const handleCategoryImage=(e)=>setCategoryImage(e.target.files[0])


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
                        <ul>
                            {renderCategories(category.categories)}
                            {JSON.stringify()}
                        </ul>
                    </Col>
                </Row>
            </Container>

            <NewModal show={show} handleClose={handleClose} modalTitle='Add New Category'>

            <Modal.Body>
                <Input value={categoryName} placeholder={`Category Name`} onChange={(e)=>setCategoryName(e.target.value)}/>
                <select className='form-control' value={parentCategoryID} onChange={e=>setParentCategoryID(e.target.value)}>
                    <option>Select Category</option>
                    {CreateCategoryList(category.categories).map(option=>
                        <option key={option.value} value={option.value} >{option.name}</option>
                    )}
                </select>
                <input  type='file' name='categoryImage' onChange={handleCategoryImage}/>
            </Modal.Body> 

            </NewModal>

        </Layout>
    )

}

export default Category
