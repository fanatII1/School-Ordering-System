import React from 'react'
import './UserProfile.css'
import NavBarMain from '../NavBar_Main/NavBar_Main';
import {useAuth0} from '@auth0/auth0-react'

function UserProfile() {
    const {user, isAuthenticated, isLoading} = useAuth0();

    if(isLoading) return <p>Loading...</p>

    const {name, picture, email}  = user;
    //we fetch the 
    let orderedItems = JSON.parse(localStorage.getItem('Ordered Items'));
    console.log(orderedItems)
    if(isAuthenticated){
        return (
            <main id='UserProfile'>
                <NavBarMain/>

                <article id='user-content'>
                    <section className='user-info'>
                        <div className='user-image-wrapper'>
                            <img src={picture} alt='' id='user-image' />
                        </div>
                        <div className='name-email'>
                            <h3 className='user-name-heading'>
                                Name : <p className='user-name'>{name}</p>
                            </h3>
                            <h3 className='user-email-heading'>
                                Email : <p className='user-email'>{email}</p>
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
                        {
                            orderedItems === null ? <></> :
                            orderedItems.map((item)=>{
                                let [foodName, foodInfoDetails] = item;
                                let {foodQuantity, price} = foodInfoDetails;
                                return(
                                    <div className='ordered-item-wrapper'>
                                        <p className='ordered-item item-name'>{foodName}</p>
                                        <p className='ordered-item item-quantity'>{foodQuantity}</p>
                                        <p className='ordered-item item-price'>R{price}</p>
                                    </div>
                                )
                            })
                        }
                    </section>
                </article>

            </main>
          )
    }
}

export default UserProfile