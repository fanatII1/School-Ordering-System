import React, { useState, useEffect } from 'react'
import './Homepage.css'
import NavBarMain from '../NavBar_Main/NavBar_Main'
import HungryImage from './HomePageImages/hungry-image.png'
import Food from './HomePageImages/food.png'
import Drink from './HomePageImages/drink.png'
import Snacks from './HomePageImages/snack.png'
import Menu from './Menu/Menu'
import { client } from '../../Client'
import CartModal from './CartModal/CartModal'

const filterItems = [
  {image: HungryImage, text: 'All'},
  {image: Food, text: 'food'},
  {image: Drink, text: 'drink'},
  {image: Snacks, text: 'snack'},
]

function Homepage() {
  const [menu, setMenu] = useState(null)
  const [cartModal, setCartModal] = useState('closeCartModal')

  //after initial render, we fetch menu data from contentful.
  //client.getEntries() returns a promise
  useEffect(()=>{
    async function fetchMenuData(){
      const response =  await client.getEntries({content_type: 'foods'});
      const menuData = response.items;
      // map()--returns an array with ONLY fields objects[has data(menu) to be rendered] 
      const menuFields = menuData.map((menu)=> menu.fields);
      localStorage.setItem('menu', JSON.stringify(menuFields))
      setMenu(menuFields)
    }

    fetchMenuData()
  }, []);

  //search function
  const search = (evnt) =>{
    let targetSearch = evnt.target.value.toLowerCase();
    let menu = JSON.parse(localStorage.getItem('menu'));
    return menu.filter((item, idx, array) => {
      let foodName = item.foodName.toLowerCase().split(' ')[0];
      if(foodName === targetSearch){
        setMenu([item])
        return item
      }
      else{
        return array
      }
    })
  }

  //onClick reveals cartModal by changing className modal state
  const showCartModal = () =>{
    setCartModal('showCartModal')
  }

  //from the menu thats stored in the storage, we return items that match a condition
  //if we click the first button(key == 0) set state to the original one(menuStorage)
  const filterMenu = (itemType, key) =>{
    let menuStorage = JSON.parse(localStorage.getItem('menu'));
    if(key === 0){
      setMenu(menuStorage)
    }
    else{
      let filterMenuItems = menuStorage.filter((item) => item.foodType === itemType);
      setMenu(filterMenuItems)
    }
  }

  if(menu === null){
    return <></>
  }
  else{
    return (
      <main className='Homepage'>
        <NavBarMain/>
  
        <article id='Menu-Section'>
          <header id='Introductory-header'>
          <div className='glitch-wrapper'>
            <h1 className='glitch' data-glitch='Suiderlig H.S Foods'>Suiderlig H.S Foods</h1>
          </div>
  
           <div id='search-cart'>
            <form id='search-form' autoComplete='off'>
              <input type='search' name='search' id='search' placeholder='Search Foods...' onChange={(evnt) => search(evnt)}/>
            </form>
            <div className='cart-container'>
              <span className='material-symbols-outlined cart' onClick={showCartModal}>shopping_cart</span>
              <CartModal cartModal={cartModal} setCartModal={setCartModal}/>
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
                    let {text} = item;
                    return(
                      <li className='food-filter-item' key={key} onClick={() => filterMenu(text, key)}>
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