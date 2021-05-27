import React, { useEffect, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { CreateNewPage } from '../../actions'
import Layout from '../../components/layouts'
import Input from '../../components/ui/input'
import NewModal from '../../components/ui/modal'
import { CreateCategoryList } from '../../helpers/category'

/**
* @author
* @function Page
**/

const Pages = (props) => {

    const dispatch=useDispatch()
    const category = useSelector(state => state.category)
    const [newPageModal, setNewPageModal] = useState(false)
    const [categories, setCategories] = useState([])
    const [title, setTitle] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [desc, setDesc] = useState('')
    const [type, setType] = useState('')
    const [banners, setBanners] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        setCategories(CreateCategoryList(category.categories))
    }, [category])
    const handleBanners = (e) => {
        setBanners([...banners, e.target.files[0]])
    }
    const handleProducts = (e) => {
        setProducts([...products, e.target.files[0]])
    }
    const onCategoryChange = (e) => {
        setCategoryId(e.target.value)
        const categoryS = categories.find(cat => cat.value == e.target.value)
        console.log(categoryS)
        if (categoryS) {
            setType(categoryS.type)
        }
        else {
            setType('')
        }
    }

    const submitPageForm = (e) => {
        if (title === '') {
            alert('Title Required')
            setNewPageModal(false)
            return
        }
        const form = new FormData()
        form.append('title', title)
        form.append('description', desc)
        form.append('category', categoryId)
        form.append('type', type)
        banners.forEach((banner, index) => {
            form.append('banners', banner)
        })
        products.forEach((product, index) => {
            form.append('products', product)
        })
        dispatch(CreateNewPage(form))
        console.log({title,desc,categoryId,type,banners,products})
    }

    const renderCreatePageModal = () => {
        return (
            <NewModal size="lg" show={newPageModal} modalTitle={'Create New Page'} hide={() => setNewPageModal(false)} handleClose={submitPageForm} >
                <Modal.Body>
                    <Row>
                        <Col>
                            <select className="form-control" value={categoryId} onChange={(e) => onCategoryChange(e)}>
                                <option>Select Category</option>
                                { categories.map(option =><option key={option.value} value={option.value} >{option.name}</option>)}                                
                            </select>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={'Page Title'} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={'Page Description'} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input value={"Banners "} disabled />
                        </Col>

                        <Col>
                            <input type="file" name="banners" onChange={handleBanners} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {banners.length > 0 ?
                                banners.map((banner, index) => {
                                    return <li>{banner.name}</li>
                                }) : null}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input value={"Products"} disabled />
                        </Col>

                        <Col>
                            <input type="file" name="products" onChange={handleProducts} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {products.length > 0 ?
                                products.map((product, index) => {
                                    return <li>{product.name}</li>
                                }) : null}
                        </Col>
                    </Row>



                </Modal.Body>
            </NewModal>
        )
    }
    return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <button onClick={() => setNewPageModal(true)}>Create New Page</button>
        </Layout>
    )

}

export default Pages