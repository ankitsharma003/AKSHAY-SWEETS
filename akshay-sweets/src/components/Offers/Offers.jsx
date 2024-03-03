import React, { useContext } from "react";
import "../../components/Popular/Popular.css"
import { OfferBanner } from "../OfferBanner/OfferBanner";
import { Item } from "../item/Item";
import { ShopContext } from "../context/ShopContext";



export const Offers = () => {
const {All_products} = useContext(ShopContext)
  return (
    <div>

      <OfferBanner/>
      <div className="Popular">
      <div className="items">
        {All_products.map((item,i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
    </div>
  );
};
