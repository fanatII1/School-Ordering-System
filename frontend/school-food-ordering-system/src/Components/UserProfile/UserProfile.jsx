import React, {useEffect} from 'react'
import './UserProfile.css'
import NavBarMain from '../NavBar_Main/NavBar_Main';
import {useAuth0} from '@auth0/auth0-react'

function UserProfile() {
    const {user, isAuthenticated, isLoading} = useAuth0();

    //when user is authenticated, we check if their data has been loaded
    //if it has, send request to fetch their order from the db
    useEffect(()=>{
        if(isLoading) {
            console.log('')
        }
        else{        
            async function fetchOrders(){
                const {name, picture, email}  = user;
                await fetch('/ProfileOrders', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({studentName: name})
                })
                .then((res) => res.json())
                .then((orders) => console.log(orders))
                .catch((error) => console.log('error', error))
            }
            fetchOrders();
        }
    }, [isAuthenticated, isLoading])
    
    if(isAuthenticated){
        return (
            <main id='UserProfile'>
                <NavBarMain/>

                <article id='user-content'>
                    <section className='user-info'>
                        <div className='user-image-wrapper'>
                            {/* <img src={picture} alt='' id='user-image' /> */}
                        </div>
                        <div className='name-email'>
                            <h3 className='user-name-heading'>
                                {/* Name : <p className='user-name'>{name}</p> */}
                            </h3>
                            <h3 className='user-email-heading'>
                                {/* Email : <p className='user-email'>{email}</p> */}
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
                        {/* {
                            orderedItems === null ? <></> :
                            orderedItems.map((item)=>{
                                let [foodName, foodInfoDetails] = item;
                                let {foodQuantity, food_price} = foodInfoDetails;
                                return(
                                    <div className='ordered-item-wrapper'>
                                        <p className='ordered-item item-name'>{foodName}</p>
                                        <p className='ordered-item item-quantity'>{foodQuantity}</p>
                                        <p className='ordered-item item-price'>R{food_price}</p>
                                    </div>
                                )
                            })
                        } */}
                    </section>
                </article>

            </main>
          )
    }
}

export default UserProfile