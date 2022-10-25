import React from 'react'
import './NavBar_Main.css'
import SchoolLogo from '../HomePage/HomePageImages/suiderlig-logo.png'


function NavBarMain() {
  return (
        <nav id='nav-wrapper'>
            <div className='nav-sub-wrapper'>
                <ul id='nav-list'>
                    <li className='nav-item logo-item'>
                        <img src={SchoolLogo} alt='school-logo' id='school-logo' />
                    </li>
                    <li className='nav-item flex-item'>
                        <li className='sub-nav-item'><span class='material-symbols-outlined'>fastfood</span></li>
                        <li className='sub-nav-item'><span class='material-symbols-outlined'>storefront</span></li>
                    </li>
                </ul>
            </div>

            <div id='logout-wrapper'>
                <span class='material-symbols-outlined'>logout</span>
            </div>
        </nav>
    )
}

export default NavBarMain