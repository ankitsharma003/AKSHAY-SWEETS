import React, { createContext, useEffect, useState } from "react";
import AllProductsData from "../../assets/All_products";

const GetDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

export const ShopContext = createContext("");

const ShopContextProvider = (props) => {
  const [All_products, setAll_products] = useState(AllProductsData);
  const [cartItem, setcartItem] = useState(GetDefaultCart());

  useEffect(() => {

    if (localStorage.getItem("auth-token")) {
      fetch("https://akshay-sweets-backend-1.onrender.com/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((resp) => resp.json())
        .then((data) => setcartItem(data));
    }
  }, []);

  const addToCart = (ItemId) => {
    setcartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] + 1 }));

    if (localStorage.getItem("auth-token")) {
      fetch("https://akshay-sweets-backend-1.onrender.com/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: ItemId }),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (ItemId) => {
    setcartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] - 1 }));

    if (localStorage.getItem("auth-token")) {
      fetch("https://akshay-sweets-backend-1.onrender.com/removecartproduct", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: ItemId }),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      const ItemInfo = All_products.find((product) => product.id === item);
      if (ItemInfo) {
        totalAmount += ItemInfo.new_price * cartItem[item];
      }
    }
    return totalAmount;
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
