import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import NavBarMain from '../NavBar_Main/NavBar_Main';
import { useAuth0 } from '@auth0/auth0-react';

function UserProfile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userInfo, setUserInfo] = useState(null);
  const [orderedItems, setOrderedItems] = useState(null);

  //when user is authenticated, we check if their data has been loaded
  //if it has, send request to fetch their order from the db
  useEffect(() => {
    if (isLoading) {
      console.log('');
    } else {
      async function fetchOrders() {
        var { name, email, picture } = user;
        setUserInfo({ name, email, picture });

        await fetch('/ProfileOrders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentName: name }),
        })
          .then((res) => res.json())
          .then((order) => {
            //for data(order) that is associated with a certain student, we extract only the 'studentOrder' array, store it into state
            //the studentOrder array is stored in the data(object) thats returned --- contains all items the student ordered
            let items = [];
            order.forEach((item) => items.push(item.studentOrder));
            setOrderedItems(items);
          })
          .catch((error) => console.log('error', error));
      }
      fetchOrders();
    }
    //eslint-disable-next-line
  }, [isAuthenticated, isLoading]);

  if (isAuthenticated) {
    return (
      <main id='UserProfile'>
        <NavBarMain />

        <article id='user-content'>
          <section className='user-info'>
            <div className='user-image-wrapper'>
              <img src={userInfo === null ? '' : userInfo.picture} alt='' id='user-image' />
            </div>
            <div className='name-email'>
              <h3 className='user-name-heading'>
                Name : <p className='user-name'>{userInfo === null ? '' : userInfo.name}</p>
              </h3>
              <h3 className='user-email-heading'>
                Email : <p className='user-email'>{userInfo === null ? '' : userInfo.email}</p>
              </h3>
            </div>
          </section>

          <section id='user-ordered-items'>
            <h2 id='ordered-items-heading'>Ordered Items</h2>
            <div className='items-legend'>
              <h4 className='item-heading'>Items Name:</h4>
              <h4 className='item-heading'>Quantity:</h4>
              <h4 className='item-heading'>Price:</h4>
            </div>
            {orderedItems === null ? (
              <></>
            ) : (
              orderedItems.map((item) => {
                return item.map((order, key) => {
                  let [foodName, foodDetails] = order;
                  let { foodQuantity, food_price } = foodDetails;
                  return (
                    <div className='ordered-item-wrapper' key={key}>
                      <p className='ordered-item item-name'>{foodName}</p>
                      <p className='ordered-item item-quantity'>{foodQuantity}</p>
                      <p className='ordered-item item-price'>R{food_price}</p>
                    </div>
                  );
                });
              })
            )}
          </section>
        </article>
      </main>
    );
  }
}

export default UserProfile;
