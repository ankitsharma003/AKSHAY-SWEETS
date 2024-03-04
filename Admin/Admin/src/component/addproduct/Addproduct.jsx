/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Addproduct.css";
import upload_icon from "../../assets/upload icon.png";

const Addproduct = () => {
  const [productDetails, setproductDetails] = useState({
    name: "",
    old_price: "",
    new_price: "",
    description: "",
    image: null,
    img1: null,
    img2: null,
    img3: null,
    img4: null,
  });

  const changeHandler = (e) => {
    if (e.target.type === "file") {
      setproductDetails({
        ...productDetails,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setproductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }
  };

  const ADD_product = async () => {
    let responsedata;
    const formdata = new FormData();
    formdata.append("name", productDetails.name);
    formdata.append("old_price", productDetails.old_price);
    formdata.append("new_price", productDetails.new_price);
    formdata.append("description", productDetails.description);
    formdata.append("image", productDetails.image);
    formdata.append("img1", productDetails.img1);
    formdata.append("img2", productDetails.img2);
    formdata.append("img3", productDetails.img3);
    formdata.append("img4", productDetails.img4);
    console.log([...formdata.entries()]);
    try {
      const response = await fetch("https://akshay-sweets-backend-1.onrender.com/upload", {
        method: "POST",
        body: formdata,
      });
      responsedata = await response.json();

      if (responsedata.success) {
        (productDetails.image = responsedata.image_urls[0]),
          (productDetails.img1 = responsedata.image_urls[1]),
          (productDetails.img2 = responsedata.image_urls[2]),
          (productDetails.img3 = responsedata.image_urls[3]),
          (productDetails.img4 = responsedata.image_urls[4]),
          console.log(productDetails);
        await fetch("https://akshay-sweets-backend-1.onrender.com/addproduct", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productDetails),
        })
          .then((resp) => resp.json())
          .then((data) => {
            data.success ? alert("Product Added") : alert("Failed");
          });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="addproduct">
      <div className="addproduct-items">
        <p>Product Name</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-items">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-items">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-items">
        <p>Description</p>
        <textarea
          value={productDetails.description}
          onChange={changeHandler}
          type="text"
          name="description"
          placeholder="Type here"
          rows="5"
        />
      </div>
      <div className="addproduct-item">
        <div className="addproducts-images">
          <p>Main Image:</p>
          <input onChange={changeHandler} type="file" name="image" />
          <p>Other Image:</p>
          <input onChange={changeHandler} type="file" name="img1" />
          <input onChange={changeHandler} type="file" name="img2" />
          <input onChange={changeHandler} type="file" name="img3" />
          <input onChange={changeHandler} type="file" name="img4" />
        </div>
      </div>
      <button className="addproduct-btn" onClick={ADD_product}>
        Add Product
      </button>
    </div>
  );
};

export default Addproduct;
