import React, { useRef, useContext, useEffect } from 'react'
import { Context } from '../../../App';
import './Menu.css'

//Component that has all the food items(menu) the school offers
function Menu({menu}) {
    const context = useContext(Context)
    let [cartItemArr, setCartItemArr] = context;
    const quantity = useRef([]);

    const increase = (e, key) =>{
        e.preventDefault();
        quantity.current[key].textContent++;
    }

    const decrease = (e, key) =>{
        e.preventDefault();
        quantity.current[key].textContent--;
    }

    const addToCart = (e, key, foodName) =>{
        e.preventDefault();
        let foodQuantity =  quantity.current[key].textContent;
        setCartItemArr(new Map(cartItemArr.set(foodName, foodQuantity)))
    }

    // useEffect(()=>{
    //     console.log(cartItemArr)
    // },[cartItemArr])

  return (
    <section id='Menu-Items'>
        {
            menu.map((menuItem, key)=>{
                let {foodImage, foodName, price, foodDetails} = menuItem;

                let image = typeof foodImage.fields === 'undefined' ? '' : foodImage.fields.file.url
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
                                <h5 className='item-price'>Price: R{price}</h5>
                                <div className='Cart-Functionality'>
                                    <div className='quantity-sizes'>
                                        <button className='decrease'  onClick={(e) => decrease(e, key)}> - </button>
                                        <span className='quantity' ref={(element)=> quantity.current.push(element)}>
                                            {typeof quantity.current[0] === 'undefined' ? 0 : quantity.current[key].textContent}
                                        </span>
                                        <button className='increase' onClick={(e) => increase(e, key)}> + </button>
                                    </div>
                                    
                                    <button className='addToCartBtn' onClick={(e)=> addToCart(e, key, foodName)}>Add To Cart</button>
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