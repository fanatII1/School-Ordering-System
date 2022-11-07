import React, { useRef, useContext, useState } from 'react'
import { Context } from '../../../App';
import './Menu.css'

//Component that has all the food items(menu) the school offers
function Menu({menu}) {
    const context = useContext(Context)
    let [cartItemArr, setCartItemArr, , , foodPrice] = context;
    const quantity = useRef([]);
    // eslint-disable-next-line 
    const [reRender, setReRender] = useState(1)

    
    const increase = (e, key, price) =>{
        e.preventDefault();
        let food_price = Number(foodPrice.current[key]);
        foodPrice.current[key] = food_price + Number(price);
        quantity.current[key].textContent++;
        //setReRender state causes component to re-render, to allow foodPrice ref() to show update
        setReRender((oldValue) => oldValue + 1)
    }

    const decrease = (e, key, price) =>{
        e.preventDefault();
        let food_price = Number(foodPrice.current[key]);
        foodPrice.current[key] = food_price - Number(price);
        quantity.current[key].textContent--;
        setReRender((oldValue) => oldValue + 1)
    }

    const addToCart = (e, key, foodName) =>{
        e.preventDefault();
        let foodQuantity =  quantity.current[key].textContent;
        let food_price = foodPrice.current[key];
        setCartItemArr(new Map(cartItemArr.set(foodName, {foodQuantity, food_price})))
    }

  return (
    <section id='Menu-Items'>
        {
            menu.map((menuItem, key)=>{
                let {foodImage, foodName, price, foodDetails} = menuItem;
                let image = typeof foodImage.fields === 'undefined' ? '' : foodImage.fields.file.url
                foodPrice.current.push(price)

                return(
                    <div className='menu-item-wrapper' key={key}>
                        <div className='menu-image-wrapper'>
                            <img src={image} alt='menu-pic' className='menu-image' />
                        </div>

                        <div className='menu-item-description'>
                            <h4 className='item-name'>Name: {foodName}</h4>
                            <h4 className='Food-Details'>Food Details</h4>
                            <hr width='30px'/>
                            <p className='foodDetails-text'>{foodDetails}</p>
                            <div className='price-to-cart'>
                                <h5 className='item-price'>Price: R{foodPrice.current[key]}</h5>
                                <div className='Cart-Functionality'>
                                    <div className='quantity-sizes'>
                                        <button className='decrease'  onClick={(e) => decrease(e, key, price)}> - </button>
                                        <span className='quantity' ref={(element)=> quantity.current.push(element)}>
                                            {typeof quantity.current[0] === 'undefined' ? 1 : quantity.current[key].textContent}
                                        </span>
                                        <button className='increase' onClick={(e) => increase(e, key, price)}> + </button>
                                    </div>
                                    
                                    <button className='addToCartBtn' onClick={(e)=> addToCart(e, key, foodName, price)}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </section>
  )
}

export default Menu