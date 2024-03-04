/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Listproduct.css";
import remove_icon from "../../assets/close-btn.png";
const Listproduct = () => {
  const [allproduct, setAllProduct] = useState([]);
  const fetchInfo = async () => {
    await fetch("https://akshay-sweets-backend-1.onrender.com/allproduct")
      .then((resp) => resp.json())
      .then((data) => {
        setAllProduct(data);
      });
    
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  const remove_product = async (id) => {
    await fetch("https://akshay-sweets-backend-1.onrender.com/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };
  return (
    <div className="listproduct">
      <h1>All Product List</h1>
      <div className="productlist-main-format">
        <p>Product </p>
        <p>Title</p>
        <p>Description</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Remove</p>
      </div>
      <div className="allproduct-list">
        <hr />
        {allproduct.map((product, index) => {
          return (
            <div
              key={index}
              className="productlist-main-format listproduct-format"
            >
              <img
                width={"100px"}
                src={product.image}
                className="product-icon"
                alt="product image"
              />
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>₹{product.old_price}</p>
              <p>₹{product.new_price}</p>
              <img
                className="remove-icon"
                onClick={() => {
                  remove_product(product.id);
                }}
                width={"16px"}
                src={remove_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Listproduct;
