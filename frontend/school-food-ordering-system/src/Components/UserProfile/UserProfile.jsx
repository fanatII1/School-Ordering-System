import React from 'react'
import './UserProfile.css'
import NavBarMain from '../NavBar_Main/NavBar_Main';
import {useAuth0} from '@auth0/auth0-react'

function UserProfile() {
    const {user, isAuthenticated, isLoading} = useAuth0();
    if(isLoading) return <p>Loading...</p>

    const {name, picture, email}  = user;
    if(isAuthenticated){
        return (
            <main id="UserProfile">
                <NavBarMain/>

                <article id="user-content">
                    <section className="user-info">
                        <div className="user-image-wrapper">
                            <img src={picture} alt="" id="user-image" />
                        </div>
                        <div className="name-email">
                            <h3 className="user-name-heading">
                                Name : <p className="user-name">{name}</p>
                            </h3>
                            <h3 className="user-email-heading">
                                Email : <p className="user-email">{email}</p>
                            </h3>
                        </div>
                    </section>
                </article>

            </main>
          )
    }
}

export default UserProfile