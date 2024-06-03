import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slices/productSlice';
import { TbBasketPlus } from "react-icons/tb";
import { TbBasketMinus } from "react-icons/tb";
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';
import '../css/ProductDetails.css';

function ProductDetails() {
    const { id } = useParams();
    const { products, selectedProduct } = useSelector((store) => store.product)

    const { price, image, title, description } = selectedProduct;

    const [count, setCount] = useState(0);

    const dispatch = useDispatch();

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }

    const addBasket = () => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            count
        }

        dispatch(addToBasket(payload));
        dispatch(calculateBasket());
    }

    useEffect(() => {
        getProductById();
    }, [])

    const getProductById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectedProduct(product))
            }
        })
    }

    return (
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div style={{ marginRight: '40px' }}>
                <img src={image} width={300} height={500} />
            </div>
            <div>
                <h1 style={{ fontFamily: 'arial' }}>{title}</h1>
                <p style={{ fontFamily: 'arial' }}>{description}</p>
                <h1 style={{ fontSize: '50px', fontFamily: 'arial', fontWeight: 'bold', color: 'red' }}>{price}$</h1>

                <div className='plus-minus-button' style={{ display: 'flex', alignItems: 'center' }}>
                    <TbBasketMinus onClick={decrement} style={{ fontSize: '40px', marginRight: '15px' }} /> <span style={{ fontSize: '35px' }}>{count}</span> <TbBasketPlus onClick={increment} style={{ fontSize: '40px', marginLeft: '15px' }} />
                </div>

                <div>
                    <button className='Add-Button' onClick={addBasket}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails