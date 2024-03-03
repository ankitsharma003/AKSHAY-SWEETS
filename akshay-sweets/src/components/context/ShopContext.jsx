import React, { createContext, useEffect, useState } from "react";
const GetDefautCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

export const ShopContext = createContext("");
const ShopContextProvider = (props) => {
  const [All_products, setAll_products] = useState([]);
  const [cartItem, setcartItem] = useState(GetDefautCart());
  useEffect(() => {
    fetch("http://localhost:5100/allproduct")
      .then((resp) => resp.json())
      .then((data) => setAll_products(data));
      if(localStorage.getItem("auth-token")){
        fetch("http://localhost:5100/getcart",{
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "auth-token":`${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: '',
        }).then((resp)=>resp.json()).then((data)=>setcartItem(data))
      }
  });

  const addToCart = (ItemId) => {
    setcartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] + 1 }));
    if(localStorage.getItem("auth-token")){
      fetch("http://localhost:5100/addtocart",{
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token":`${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"itemId":ItemId}),
      }).then((resp)=>resp.json()).then((data)=>console.log(data))
    }
  };
  const removeFromCart = (ItemId) => {
    setcartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] - 1 }));
    if(localStorage.getItem("auth-token")){
      fetch("http://localhost:5100/removecartproduct",{
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token":`${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"itemId":ItemId}),
      }).then((resp)=>resp.json()).then((data)=>console.log(data))
    }
  };
  const getTotalAmount = () => {
    let totalamount = 0;
    for (const item in cartItem) {
      let ItemInfo = All_products.find((product) => product.id);
      totalamount += ItemInfo.new_price * cartItem[item];
    }
    return totalamount;
  };
  const contextValue = {
    All_products,
    cartItem,
    addToCart,
    getTotalAmount,
    removeFromCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
