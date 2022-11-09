import React, { useRef, useContext, useState } from 'react'
import { Context } from '../../../App';
import './Menu.css'

//Component that has all the food items(menu) the school offers
function Menu({menu}) {
    const context = useContext(Context)
    let [cartItemArr, setCartItemArr, , , foodPrice, , setReRender] = context;
    const quantity = useRef([]);
    
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

    //when adding to cart, we get the quantity and price of certain food
    //we then change the prices variable type to a number/interger 
    //we will use this interger in the cart modal to calculate the total of only items added to the foodPrice array
    //items added to foodPrice array are those with a interger type variable
    const addToCart = (e, key, foodName) =>{
        e.preventDefault();
        let foodQuantity =  quantity.current[key].textContent;
        let food_price = foodPrice.current[key];
        foodPrice.current[key] = Number(food_price);
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
                            <h4 className='item-name-heading'>
                                <span className='item-name'>{foodName}</span>
                            </h4>
                            <h4 className='Food-Details'>Food Details</h4>
                            <p className='foodDetails-text'>{foodDetails}</p>
                            <div className='price-to-cart'>
                                <h5 className='item-price-heading'>
                                    <span className='item-price'>Price:</span> R{foodPrice.current[key]}
                                </h5>
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