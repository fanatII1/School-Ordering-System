import React, { useEffect, useState} from 'react';
import NavBarMain from '../NavBar_Main/NavBar_Main';
import OrderImage from './AdminDashboardImages/order.png'
import './AdminDashboard.css';

//component that will render all paid users of the system
function AdminDashboard() {
  const [paidStudents, setPaidStudents] = useState();

  //after initial render of component, fetch all paid users from database
  useEffect(() => {
    async function fetchPaidStudents() {
      let response = await fetch('/PlacedOrders');
      let paidStudents = await response.json();
      setPaidStudents(paidStudents);
    }
    fetchPaidStudents();
  }, []);

  //if paidStudents has no data('undefined'), we render nothing
  if (typeof paidStudents === 'undefined') {
    return <p>...</p>
  } else {
    return (
      <main id='Admin-mainContent'>
        <NavBarMain />

        <article id='AdminMainSection'>
            <section id="banner">
              <img src={OrderImage} alt="" className="order-image" />
            </section>

            <h1 className='ordered-heading'>Ordered Users</h1>
            
            <section id='paidStudents'>
              {paidStudents.map((student) => {
                let { studentName, studentOrder } = student;

                return (
                  <div className='student'>
                    <h4 className='student-name'> Student Name: <span className='name'>{studentName}</span> </h4>
                    <h4 className='ordered-items-heading'>Ordered Items</h4>

                    <ul className='items-ordered-list'>
                      {studentOrder.map((item) => {
                        let [foodItem, foodDetails] = item;
                        let { foodQuantity, food_price } = foodDetails;

                        return (
                          <li className='order-item'>
                            <span className='foodItem'>Food Item</span>: {foodItem} - <span className='quantity'>({foodQuantity})</span>
                            <span className='price'>Price: R{food_price}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </section>
        </article>
      </main>
    );
  }
}

export default AdminDashboard;
