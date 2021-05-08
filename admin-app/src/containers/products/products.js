import React, { useState } from 'react'
import { Button, Modal,Container,Row,Col,Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { CreateNewProduct } from '../../actions'
import Layout from '../../components/layouts'
import Input from '../../components/ui/input'
import NewModal from '../../components/ui/modal'

/**
* @author
* @function Products
**/

const CreateCategoryList =(categories,options=[])=>{
    for(let cat of categories){
        options.push({value:cat._id,name:cat.name})
        if(cat.children.length>0){
            CreateCategoryList(cat.children,options)
        }
    }
    return options
}

const Products = (props) => {

    const category = useSelector(state => state.category)
    const product = useSelector(state=>state.product)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);

    const [productName, setProductName] = useState('')
    const [productCategoryID, setProductCategoryID] = useState('')
    const [productDescription, setproductDescription] = useState('')
    const [productPrice, setproductPrice] = useState('')
    const [productQuantity, setproductQuantity] = useState('')
    const [productImages, setProductImages] = useState('')

    // useEffect(() => {
    //     dispatch()
    // }, [])


    const handleClose = () => {
        const form = new FormData()
        form.append('name', productName)
        form.append('category', productCategoryID)
        form.append('price', productPrice)
        form.append('description', productDescription)
        form.append('quantity', productQuantity)
        for(let pic of productImages){
            form.append('productPicture', pic)
        }
        
        dispatch(CreateNewProduct(form))
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const handleProdcutPictures=(e)=>{
        setProductImages([
            ...productImages,
            e.target.files[0]
        ])
    }

    const renderProducts=()=>{
        return (
            <Table responsive="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Desctiption</th>
                    {/* <th>Product Pictures</th> */}
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                    {
                        product.products.length  >0?
                        product.products.map(product=>
                            <tr key={product._id}>
                                <td>1</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.description}</td>
                                {/* <td>{product.productPictures}</td> */}
                                <td>{product.category}</td>
                            </tr>
                        ):null
                    }
                    
                </tbody>
            </Table>
        )
    }
    return (
        <Layout sidebar>

            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Products</h3>
                            <Button variant="primary" onClick={handleShow}>
                                Add Product
                            </Button>
                        </div>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>

                <NewModal  show={show} handleClose={handleClose} modalTitle='Add New Product'>
                    <Modal.Body>
                        <Input label="Name" value={productName} placeholder={`Product Name`} onChange={(e) => setProductName(e.target.value)} />
                        <Row>
                            <Col>
                            <Input label="Price" value={productPrice} placeholder={`Product Price`} onChange={(e) => setproductPrice(e.target.value)} />
                            </Col>

                            <Col>
                            <Input label="Quantity" type="number" value={productQuantity} placeholder={`Product Quantity`} onChange={(e) => setproductQuantity(e.target.value)} />
                            </Col>
                        </Row>

                        <Input label="Description" type="text-area" value={productDescription} placeholder={`Describe Your Product`} onChange={(e) => setproductDescription(e.target.value)} />
                        

                        <select className='form-control' value={productCategoryID} onChange={e=>setProductCategoryID(e.target.value)}>
                            <option>Select Category</option>
                            {CreateCategoryList(category.categories).map(option=>
                                <option key={option.value} value={option.value} >{option.name}</option>
                            )}
                        </select>
                        
                        <input type="file" name="productPitcure" onChange={handleProdcutPictures}/>
                        {
                            productImages.length>0?productImages.map((pic,index)=><div key={index}>{JSON.stringify(pic.name)}</div>):null
                        }

                    </Modal.Body>
                </NewModal>
            </Container>
        </Layout>
    )

}

export default Products