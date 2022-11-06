import React from 'react';
import { useContext } from 'react';
import { Context } from '../../../App';
import { yoco } from '../../../YocoSDK';
import './CartModal.css';

function CartModal({ cartModal, setCartModal }) {
  const context = useContext(Context);
  let [cartItemArr, setCartItemArr] = context;
  let cartItems = [...cartItemArr]; //key/value pairs of new Map() object  from context state

  const hideCartModal = () => setCartModal('closeCartModal');

  const removeItem = (e, food_name) => {
    cartItemArr.delete(food_name);
    setCartItemArr(new Map(cartItemArr));
  };

  //onClick orders the food, stores in storage to remember ordered food
  //after 10h(36000000 ms) we clear the storage
  const Order = (e) => {
    e.preventDefault();
    yoco.showPopup({
      name: 'Suiderlig Foods',
      description: 'Order from Suiderlig HS',
      currency: 'ZAR',
      amountInCents: 2799,
      callback: async function (result) {
        // function returns a token thats sent to server can use to capture a payment
        if (result.error) {
          const errorMessage = result.error.message;
          alert(errorMessage)
        } else {
          let response = await fetch('/Payment', {
            method: 'POST',
            headers: {
              'X-Auth-Secret-Key': process.env.SECRET_KEY,
            },
            body: { token: 'tok_nldryIJgGqrXE8HzLdTGJPu1Q', amountInCents: 2799, currency: 'ZAR' },
          });

          let responseData = response.json();
          console.log(responseData);
        }
      },
    });

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date();
    const today = weekDays[date.getDay()];
    localStorage.setItem(today, JSON.stringify(cartItems));
    setTimeout(() => {
      localStorage.clear();
    }, 36000000);
  };

  return (
    <div id={cartModal}>
      <aside id='cart-aside-modal'>
        <div className='close-wrapper'>
          <span className='material-symbols-outlined close' onClick={hideCartModal}>
            do_not_disturb_on
          </span>
        </div>
        <ul id='cartList'>
          <li className='list-description'>
            <h6 className='cart-food-item'>Food Name:</h6>
            <h6 className='cart-quantity-heading'>Quantity</h6>
            <h6 className='price-heading'>Price</h6>
          </li>
          {cartItems.map((item, key) => {
            //the cartItems array has an inner array which we destructure
            //first array item is a string of the food name, 2nd array item is an object(foodInfo)
            //thus we further destructure the object(foodInfo) in the inner array
            let [foodName, foodInfo] = item;
            let { foodQuantity, food_price } = foodInfo;

            return (
              <li className='cart-list-item' key={key}>
                <p className='foodName'>{foodName}</p>
                <p className='foodQuantity'>{foodQuantity}</p>
                <p className='Price'>{food_price}</p>
                <div className='Remove'>
                  <span className='material-symbols-outlined bin' onClick={(e, food_name) => removeItem(e, foodName)}>
                    delete_sweep
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <button className='order-btn' onClick={Order}>
          Order
        </button>
      </aside>
    </div>
  );
}

export default CartModal;
