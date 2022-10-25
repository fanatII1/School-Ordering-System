import React from 'react'
import './Homepage.css'
import NavBarMain from '../NavBar_Main/NavBar_Main'

function Homepage() {
  return (
    <main className='Homepage Menu-Order'>
      <NavBarMain/>

      <section id='Menu-Section'>
        <header id='Introductory-header'>
          <h1 className='school-name-heading'>
            Suiderlig Foods
          </h1>

         <div id="search-cart">
          <form id='search-form' autoComplete='off'>
            <input type='search' name='search' id='search' placeholder='Search Foods...'/>
          </form>
          <div className='cart-container'>
            <span class='material-symbols-outlined cart'>shopping_cart</span>
          </div>
         </div>
        </header>


        <section id="Food-Content-Section">
          
        </section>
      </section>

    </main>
  )
}

export default Homepage