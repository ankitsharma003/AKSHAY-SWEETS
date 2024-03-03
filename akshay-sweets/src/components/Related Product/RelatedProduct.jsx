import React, { useContext } from 'react'
import './RelatedProduct.css'
import { Item } from '../item/Item'
import { ShopContext } from '../context/ShopContext'

export const RelatedProduct = () => {
  const {All_products} = useContext(ShopContext)
  
  return (
    <div className='relatedproduct'>
          <h1>Related Products</h1>
      <hr />
      <div className="relatedproduct-item">
        {All_products.map((item,i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}
