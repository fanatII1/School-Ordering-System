import React, { useEffect, useState } from 'react'
import { useContext, useRef } from 'react'
import { Context } from '../../../App'
import { yoco } from '../../../YocoSDK'
import {useAuth0} from '@auth0/auth0-react'
import './CartModal.css'

function CartModal({cartModal, setCartModal}) {
    const context = useContext(Context)
    let [cartItemArr, setCartItemArr, , , foodPrice] = context;
    let cartItems = [...cartItemArr]; //key/value pairs of new Map() object  from context state
    const totalPrice = useRef([]);
    const [totalDisplay, setTotalDisplay] = useState(0)
    const {user, isAuthenticated, isLoading} = useAuth0();
    // if(isAuthenticated){
    //     console.log('mxm')
    // }

    // when cartItemArr changes, calculate new total. when cartItemArr changes, indicates that there's new item in arr,
    useEffect(()=>{
        let priceItemsTotal = foodPrice.current.filter((priceItem)=> typeof priceItem === 'number' );
        let sum = 0;
        priceItemsTotal.forEach((price)=>{
           sum += price
        })
        setTotalDisplay(sum)
    }, [cartItemArr, foodPrice])
    
    const hideCartModal = () => setCartModal('closeCartModal')

    const removeItem = (e, food_name) =>{
        cartItemArr.delete(food_name);
        setCartItemArr(new Map(cartItemArr))
    }

    //onClick orders the food, stores in storage to remember ordered food
    //after 10h(36000000 ms) we clear the storage
    const Order = async (e) =>{
        e.preventDefault();
        yoco.showPopup({
            name: 'Suiderlig Foods',
            description: 'Order from Suiderlig HS',
            currency: 'ZAR',
            amountInCents: totalDisplay * 100,
            callback: async function (result) {
                // function returns a token thats sent to server can use to capture a payment
                if (result.error) {
                  const errorMessage = result.error.message;
                  alert("error occured: " + errorMessage);
                } else {
                    //send token to server
                    let response = await fetch('/Payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({token: result.id, totalAmountInCents: totalDisplay * 100 })
                    })

                    let responseData = await response.json();
                    alert(responseData.msg)


                    //if payment was a success, we store user name and their order in localStorage
                    if(responseData.msg === 'Payment was a success' && isAuthenticated){
                        let paidStudents = JSON.parse(localStorage.getItem('Paid Students'));
                        if(paidStudents === null) {
                            localStorage.setItem('Paid Students', JSON.stringify([{studentName: user.name, studentOrder: cartItems}]))
                        } 
                        else {
                            if(typeof paidStudents[0] === 'undefined'){
                                localStorage.setItem('Paid Students', JSON.stringify([{studentName: user.name, studentOrder: cartItems}]))
                            } 
                            else{
                                //if there are users, and a person placed an order, need to push them into paidStudents array
                                //also, there might be multiple orders, therefore, no need to store one unique user
                                paidStudents.push({studentName: user.name, studentOrder: cartItems})
                                console.log(paidStudents)
                                localStorage.setItem('Paid Students', JSON.stringify(paidStudents))
                            }
                        }
                    }
                }
            }        
        })

        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const date = new Date();
        const today = weekDays[date.getDay()];
        localStorage.setItem(today, JSON.stringify(cartItems))
        setTimeout(()=>{
            localStorage.clear()
        }, 36000000)
    }

  return (
    <div id={cartModal}>
        <aside id='cart-aside-modal'>
            <div className='close-wrapper'>
                <span className='material-symbols-outlined close' onClick={hideCartModal}>close</span>
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
                        let {foodQuantity, food_price} = foodInfo;
                        
                        return(
                            <li className='cart-list-item' key={key}>
                                <p className='foodName'>{foodName}</p>
                                <p className='foodQuantity'>{foodQuantity}</p>
                                <p className='Price'  ref={(element)=> totalPrice.current.push(element)}>{food_price}</p>
                                <div className='Remove'>
                                    <span className='material-symbols-outlined bin' onClick={(e, food_name) => removeItem(e, foodName)}>
                                        delete_sweep
                                    </span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>

            <button className='order-btn' onClick={Order}>Order - Total (R{totalDisplay})</button>
        </aside>
    </div>
  )
}

export default CartModal