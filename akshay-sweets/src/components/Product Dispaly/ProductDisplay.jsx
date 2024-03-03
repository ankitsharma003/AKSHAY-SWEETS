import React, { useContext } from "react";
import "./ProductDispaly.css";
import { ShopContext } from "../context/ShopContext";
export const ProductDisplay = (props) => {
  const { product } = props;
const {addToCart ,}= useContext(ShopContext)
  return (
    <div className="ProductDispaly">
      <div className="left-side">
        <div className="imglist">
          <img src={product.img1} alt="" />
          <img src={product.img2} alt="" />
          <img src={product.img3} alt="" />
          <img src={product.img4} alt="" />
        </div>
        <div className="ProductMainImg">
          <img className="ActiveImg" src={product.image} alt="" />
        </div>
      </div>
      <div className="right-side">
        <h1>{product.name}</h1>
        <div className="prices">
          <div className="price-new"><span>₹{product.new_price}</span></div>
          <div className="price-old">₹{product.old_price}</div>
        </div>
        <div className="description">{product.description}</div>
        
        <button className="addtocart" onClick={()=>{addToCart(product.id)}} >ADD To Cart</button>
      </div>
    </div>
  );
};
