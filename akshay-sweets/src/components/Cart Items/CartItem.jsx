import React, { useContext } from "react";
import "./CartItem.css";
import { ShopContext } from "../context/ShopContext";
import remove_btn from "../../assets/close-btn.png";
export const CartItem = () => {
  const { All_products, cartItem, addToCart,getTotalAmount, removeFromCart } =
    useContext(ShopContext);

  return (
    <div className="cartitem">
      <div className="cart-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {All_products.map((e) => {
        if (cartItem[e.id] > 0) {
          return (
            <div>
              <div className="cart-format cart-format-main">
                <img src={e.image} className="cart-item-product" alt="" />
                <p>{e.name}</p>
                <p>₹{e.new_price}</p>
                <div className="quantity">
                <button className="quantity-plus" onClick={()=>{removeFromCart(e.id)}}>-</button>
                <button className="cart-item-quantity">
                  {cartItem[e.id]} 
                </button>
                <button className="quantity-minus" onClick={()=>{addToCart(e.id)}}>+</button>
                </div>
                <p className="new_item_price ">
                  ₹{e.new_price * cartItem[e.id]}
                </p>
                <img
                  src={remove_btn}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  className="remove-icon"
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cart-down">
        <div className="cart-total">
          <h1>Cart Total</h1>
          <div className="cart-total-item" >
            <p>Subtotal</p>
            <p>₹{getTotalAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-item" >
            <p>Shiping Fee</p>
            <p>FREE</p>
          </div>
          <hr />
          <div className="cart-total-item" >
            <h4>TOTAL</h4>
            <h4>₹{getTotalAmount()}</h4>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="promobox">
          <input type="text" name="" placeholder="Promo code" id="" />
          <button>SUBMIT</button>
          </div>
        </div>
      </div>
    </div>
  );
};
