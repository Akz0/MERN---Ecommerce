import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsBySlug } from '../../actions'
import Layout from '../../components/Layout/Layout'
import { generatePublicImageUrl } from '../../urlConfig'
import './products.css'

/**
* @author
* @function ProductsListPage
**/

const ProductsListPage = (props) => {

    const product=useSelector(state=>state.products)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getProductsBySlug(props.match.params.slug))
    },[])
    const renderAllProdcuts=()=>{
        console.log(product.products)
        let productCards
        if(product.products){
            productCards=product.products.products.map((item)=>{
                return (
                    <div key={item._id}className="productCard">
                        <div className="productImageContainer">
                            <img src={generatePublicImageUrl(item.productPictures[0].img)} alt=""/>
                        </div>
                        <div className="productDetails">
                            <div className="productName">{item.name}</div>
        
                            <div>Rs.<span className="productPrice">{item.price}</span></div>
                            <div className="productReviewsContainer">
                                <div className="productRating">3.4</div>
                                <div className="TotalProductRating">3344</div>
                            </div>
                        
                        </div>
                    </div>
                )
            })
            return productCards
        }
        
    }
    return (
        
        <Layout>
            <div className="productsContainer">
            {renderAllProdcuts()}
            {/* <div className="productCard">
                <div className="productImageContainer">
                    <img src="http://localhost:2000/public/QdmnFGKpR-sansungf41-1.jpeg" alt=""/>
                </div>
                <div className="productDetails">
                    <div className="productName">Samsumg F41 4Gb64GB</div>
  
                    <div className="productPrice">29999</div>
                    <div className="productReviewsContainer">
                        <div className="productRating">3.4</div>
                        <div className="TotalProductRating">3344</div>
                    </div>
                
                </div>
            </div> */}
            
            </div>
        </Layout>
    )

}

export default ProductsListPage