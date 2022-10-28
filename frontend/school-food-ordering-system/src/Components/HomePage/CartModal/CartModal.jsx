import React from 'react'
import { useContext } from 'react'
import { Context } from '../../../App'
import './CartModal.css'

//cartModal that shows items in the cart
function CartModal({cartModal, setCartModal}) {
    const context = useContext(Context)
    let [cartItemArr, setCartItemArr] = context;
    
    //copy key/value pairs of new Map() object thats accessed from context state
    let cartItems = [...cartItemArr];
    
    const hideCartModal = () =>{
        setCartModal('closeCartModal')
    }


  return (
    <div id={cartModal}>
        <aside id='cart-aside-modal'>
            <div className='close-wrapper'>
                <span className='material-symbols-outlined close' onClick={hideCartModal}>do_not_disturb_on</span>
            </div>
            <ul id='cartList'>
                <li className='list-description'>
                    <h6 className='cart-food-item'>Food Name:</h6>
                    <h6 className='cart-quantity-heading'>Quantity</h6>
                    <h6 className='price-heading'>Price</h6>
                </li>
                {
                    cartItems.map((item, key) =>{
                        //the cartItems array has an inner array which we destructure
                        //first array item is a string of the food name, 2nd array item is an object(foodInfo)
                        //thus we further destructure the object(foodInfo) in the inner array
                        let [foodName, foodInfo] = item;
                        let {foodQuantity, price} = foodInfo;
                        return(
                            <li className='cart-list-item' key={key}>
                                <p className='foodName'>{foodName}</p>
                                <p className='foodQuantity'>{foodQuantity}</p>
                                <p className='Price'>{price}</p>
                                <div className='Remove'><span className='material-symbols-outlined bin'>delete_sweep</span></div>
                            </li>
                        )
                    })
                }
            </ul>
        </aside>
    </div>
  )
}

export default CartModal