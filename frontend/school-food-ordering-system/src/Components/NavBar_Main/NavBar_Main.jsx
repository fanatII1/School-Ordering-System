import React, { useEffect, useContext } from 'react'
import { Context } from '../../App'
import './NavBar_Main.css'
import SchoolLogo from '../HomePage/HomePageImages/suiderlig-logo.png'
import { Link } from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'

function NavBarMain() {
    const {loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const context = useContext(Context)
    let [, , adminAccess, setAdminAccess] = context;

    return (
        <nav id='nav-wrapper'>
            <div className='nav-sub-wrapper'>
                <ul id='nav-list'>
                    {/* <li className='nav-item logo-item'>
                        <img src={SchoolLogo} alt='school-logo' id='school-logo' />
                    </li> */}
                    <li className='nav-item flex-item'>
                        <div className='sub-nav-item'>
                            <Link to='/'><span className='material-symbols-outlined'>fastfood</span></Link>
                        </div>
                        <div className='sub-nav-item'>
                            <Link to='/Profile'><span className='material-symbols-outlined'>person</span></Link>
                        </div>
                        <div className='sub-nav-item'>
                            { adminAccess === null ? <></> :
                              <Link to='/AdminDashboard'><span className='material-symbols-outlined'>storefront</span></Link>
                            }
                        </div>
                    </li>
                </ul>
            </div>

            <div id='logout-wrapper'>
                <div id='tooltip'>
                    {isAuthenticated ? 'logout' : 'login'}
                </div>
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