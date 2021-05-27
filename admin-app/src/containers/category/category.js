import React, { useState } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createNewCategory, DeleteCategory, EditCategory, getAllCategory } from '../../actions'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosCheckmark, IoIosArrowDown, IoIosArrowForward, IoIosAdd, IoIosColorWand, IoIosTrash } from 'react-icons/io'
import './style.css'
import Layout from '../../components/layouts'
import Input from '../../components/ui/input'
import NewModal from '../../components/ui/modal'
import UpdateCategoriesModal from './UpdateCategoriesModal'

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
    const [showDeleteModal, setShowDeleteModal] = useState(false)


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

        dispatch(createNewCategory(form)).then(res=>{
            if(res){
                dispatch(getAllCategory())
            }
        })
        setShow(false);

    }
    const handleShow = () => setShow(true);
    const handleCategoryImage = (e) => setCategoryImage(e.target.files[0])

    const handleUpdateCategoryModal = () => {
        updateCheckedAndExpandedCategories()
        setShowUpdateModal(true)
    }
    const updateCheckedAndExpandedCategories=()=>{
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
    }

    const handleCategoryInput = (key, value, _index, type) => {
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, index) => {
                return index === _index ?
                    {
                        ...item,
                        [key]: value
                    } : item
            })
            setCheckedArray(updatedCheckedArray)
        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, index) => {
                return index === _index ?
                    {
                        ...item,
                        [key]: value
                    } : item
            })
            setCheckedArray(updatedExpandedArray)
        }
    }

    const handleEditCategories = () => {
        const form = new FormData()
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type', item.type ? item.type : "")
        })
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type', item.type ? item.type : "")
        })
        console.log(form)
        dispatch(EditCategory(form))
        setShowUpdateModal(false)
    }

    const handleDeleteCategoryModal=()=>{
        updateCheckedAndExpandedCategories()
        setShowDeleteModal(true)
    }
    const deleteCategoriesConfirm=()=>{
        const checkedIDArray=checkedArray.map((item,index)=>({_id:item.value}))
        const expandedIDArray=expandedArray.map((item,index)=>({_id:item.value}))
        const idsArray=expandedIDArray.concat(checkedIDArray);
        
        if(checkedIDArray.length>0){
            dispatch(DeleteCategory(checkedIDArray))
        }
        
        setShowDeleteModal(false)
    }


    const renderAddCategoryModal = () => {
        return <NewModal show={show} hide={()=>setShow(false)} handleClose={handleClose} modalTitle='Add New Category'>
    
            <Modal.Body>
                <Row>
                    <Col>
                        <Input value={categoryName} placeholder={`Category Name`} onChange={(e) => setCategoryName(e.target.value)} />
                    </Col>
                
    
                
                    <Col>
                        <select className='form-control' value={parentCategoryID} onChange={e => setParentCategoryID(e.target.value)}>
                            <option>Select Parent Category</option>
                            {CreateCategoryList(category.categories).map(option =>
                                <option key={option.value} value={option.value} >{option.name}</option>
                            )}
                        </select>
                    </Col>
                </Row>
                                
                <Row>
                    <Col>
                        <select className='form-control' value={type} onChange={e => setType(e.target.value)}>
                            <option>Select Type</option>
                            <option>Store</option>
                            <option>Product</option>
                            <option>Page</option>
                        </select></Col>
                </Row>
    
                <input type='file' name='categoryImage' onChange={handleCategoryImage} />
            </Modal.Body>
    
        </NewModal>
    }

    const renderDeleteCategoryModal=()=>{
        return (
            <NewModal 
            show={showDeleteModal} 
            hide={()=>setShowDeleteModal(false)}
            handleClose={()=>setShowDeleteModal(false)} 
            modalTitle='Confirm Deletion of Categories'
            buttons={[
                {
                    label:'No',
                    color:'primary',
                    onClick:()=>{
                        setShowDeleteModal(false)
                    }
                },
                {
                    label:'Yes',
                    color:'danger',
                    onClick:deleteCategoriesConfirm
                }
                ]}
            >
            <Modal.Body>
                <h3><b>Delete these Items?</b></h3>
                <h5>Expanded</h5>
                {expandedArray.map((item,index)=>{
                    return <li key={index}>{item.name}</li>
                })}
                <h5>Checked</h5>
                {checkedArray.map((item,index)=>{
                    return <li key={index}>{item.name}</li>
                })}
            </Modal.Body>
        </NewModal>
        )
    }
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            
                            <div className="actionButtonsContainer">
                                <Button variant="primary" onClick={handleShow}><IoIosAdd/><span>Add Category</span></Button>
                                <Button variant="primary"  onClick={handleUpdateCategoryModal}><IoIosColorWand/><span>Edit</span></Button>
                                <Button variant="danger" onClick={handleDeleteCategoryModal}><IoIosTrash/><span>Delete</span></Button>
                            </div>
                            
                        
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
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
            </Container>


            {/* Add New Categories Modal */}
            {renderAddCategoryModal()}
            
            {/* Edit Categories Modal */}
            <UpdateCategoriesModal
                show={showUpdateModal}
                handleClose={handleEditCategories}
                hide={()=>setShowUpdateModal(false)}
                modalTitle={'Edit / Update Categories'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                CategoryList={CreateCategoryList(category.categories).map(option =>
                    <option key={option.value} value={option.value} >{option.name}</option>
                )}
            />

            {/* Delete Category Modal */}
            {renderDeleteCategoryModal()}

        </Layout>
    )

}

export default Category
