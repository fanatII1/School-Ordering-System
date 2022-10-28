import React from 'react'
import './CartModal.css'

//cartModal that shows items in the cart
function CartModal({cartModal, setCartModal, setHomepageBackground}) {
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
                <li className='cart-list-item'>
                    <p className='cart-item-name'>FOOD</p>
                    <div className='remove'><span className="material-symbols-outlined bin">delete_sweep</span></div>
                </li>
            </ul>
        </aside>
    </div>
  )
}

export default CartModal