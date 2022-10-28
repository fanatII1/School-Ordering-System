import React from 'react'
import { useContext } from 'react'
import { Context } from '../../../App'
import './CartModal.css'

//cartModal that shows items in the cart
function CartModal({cartModal, setCartModal, setHomepageBackground}) {
    const context = useContext(Context)
    let [cartItemArr, setCartItemArr] = context;
    
    //copy key/value pairs of new Map() object thats accessed from context state
    let cartItems = [...cartItemArr];
    
    const hideCartModal = () =>{
        setCartModal('closeCartModal')
        setHomepageBackground('Homepage')
    }


  return (
    <div id={cartModal}>
        <aside id='cart-aside-modal'>
            <div className='close-wrapper'>
                <span className='material-symbols-outlined close' onClick={hideCartModal}>do_not_disturb_on</span>
            </div>
            <ul id='cartList'>
                {
                    cartItems.map((item, key) =>{
                        let [foodName, foodQuantity] = item;
                        return(
                            <li className='cart-list-item' key={key}>
                                <p className='cart-item-name'>{foodName} : {foodQuantity}</p>
                                <div className='remove'><span className="material-symbols-outlined bin">delete_sweep</span></div>
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