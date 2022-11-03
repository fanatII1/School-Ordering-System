import React from 'react'
import './NavBar_Main.css'
import SchoolLogo from '../HomePage/HomePageImages/suiderlig-logo.png'
import {useAuth0} from '@auth0/auth0-react'

function NavBarMain() {
    const {loginWithRedirect, logout, isAuthenticated} = useAuth0();

  return (
        <nav id='nav-wrapper'>
            <div className='nav-sub-wrapper'>
                <ul id='nav-list'>
                    <li className='nav-item logo-item'>
                        <img src={SchoolLogo} alt='school-logo' id='school-logo' />
                    </li>
                    <li className='nav-item flex-item'>
                        <div className='sub-nav-item'><span className='material-symbols-outlined'>fastfood</span></div>
                        <div className='sub-nav-item'><span className='material-symbols-outlined'>storefront</span></div>
                    </li>
                </ul>
            </div>

            <div id='logout-wrapper'>
                {isAuthenticated ?
                    <span className='material-symbols-outlined' onClick={() => logout({returnTo: window.location.origin})}>
                        logout
                    </span> :
                    <span className='material-symbols-outlined' onClick={() => loginWithRedirect()}>login</span>
                }
            </div>
        </nav>
    )
}

export default NavBarMain