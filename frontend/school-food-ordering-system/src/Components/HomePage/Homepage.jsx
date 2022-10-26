import React, { useState, useEffect } from 'react'
import './Homepage.css'
import NavBarMain from '../NavBar_Main/NavBar_Main'
import HungryImage from './HomePageImages/hungry-image.png'
import Food from './HomePageImages/food.png'
import Drink from './HomePageImages/drink.png'
import Snacks from './HomePageImages/snack.png'
import Menu from './Menu/Menu'
import { client } from '../../Client'
// const imageresponse =  await client.getEntries({content_type: 'foods'});

const filterItems = [
  {image: HungryImage, text: 'All'},
  {image: Food, text: 'Food'},
  {image: Drink, text: 'Drinks'},
  {image: Snacks, text: 'Snacks'},
]

function Homepage() {
  const [menu, setMenu] = useState(null)

  //after initial render, we fetch menu data from contentful.
  //client.getEntries() returns a promise
  useEffect(()=>{
    async function fetchMenuData(){
      const response =  await client.getEntries({content_type: 'foods'});
      const menuData = response.items;
      // map()--returns an array with ONLY fields objects[has data(menu) to be rendered] 
      const menuFields = menuData.map((menu)=> menu.fields);
      console.log(menuFields)
      setMenu(menuFields)
    }

    fetchMenuData()
  }, []);


  if(menu === null){
    return <></>
  }
  else{
    return (
      <main className='Homepage Menu-Order'>
        <NavBarMain/>
  
        <article id='Menu-Section'>
          <header id='Introductory-header'>
            <h1 className='school-name-heading'>
              Suiderlig Foods
            </h1>
  
           <div id='search-cart'>
            <form id='search-form' autoComplete='off'>
              <input type='search' name='search' id='search' placeholder='Search Foods...'/>
            </form>
            <div className='cart-container'>
              <span className='material-symbols-outlined cart'>shopping_cart</span>
            </div>
           </div>
          </header>
  
  
          <section id='Food-Content-Section'>
            <div id='Food-Content-heading-wrapper'> 
              <h1 id='Food-Content-heading'>Hungry today?</h1>
              <img src={HungryImage} alt='hungry' className='hungry-img' />
            </div>
            <h4 id='Food-Content-sub-heading'> Find the best foods </h4>
  
            <div id='food-filtering'>
              <ul id='food-filtering-list'>
                {
                  filterItems.map((item, key)=>{
                    return(
                      <li className='food-filter-item' key={key}>
                      <div className='food-filter-icon-wrapper'>
                        <img src={item.image} alt='hungry' className='filter-image' />
                      </div>
      
                      <p className='filter-text'>{item.text}</p>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
  
            <Menu menu={menu}/>
          </section>
        </article>
  
      </main>
    )
  }
}

export default Homepage