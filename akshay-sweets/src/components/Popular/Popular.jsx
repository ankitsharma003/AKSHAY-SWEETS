import React from "react";
import "./Popular.css";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { Item } from "../item/Item.jsx";
export const Popular = () => {
  const { All_products } = useContext(ShopContext);
  return (
    <div className="Popular">
      <h1>For YOU</h1>
      <hr />
      <div className="items">
        {All_products.map((item,i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  );
};
