import React from 'react'
import './Menu.css'

//Component that has all the food items(menu) the school offers
function Menu({menu}) {
  return (
    <section id='Menu-Items'>
        {
            menu.map((menuItem)=>{
                let {foodImage, foodName, price, foodDetails} = menuItem;
                let image = typeof foodImage.fields === 'undefined' ? '' : foodImage.fields.file.url
                return(
                    <div className='menu-item-wrapper'>
                        <div className='menu-image-wrapper'>
                            <img src={image} alt='menu-pic' className='menu-image' />
                        </div>

                        <div className='menu-item-description'>
                            <h4 className='item-name'>Name: {foodName}</h4>
                            <h4 className="Food-Details">Food Details</h4>
                            <hr width='30px'/>
                            <p className="foodDetails-text">{foodDetails}</p>
                            <div className='price-to-cart'>
                                <h5 className='item-price'>Price: R{price}</h5>
                                <div className='addToCart'>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </section>
  )
}

export default Menu