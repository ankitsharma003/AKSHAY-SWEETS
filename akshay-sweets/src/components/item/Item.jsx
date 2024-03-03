import React, { useEffect } from "react";
import "./Item.css";
import { Link } from "react-router-dom";
export const Item = (props) => {
  return (
    <div className="Item">
      <div className="box">
        <Link to={`/Product/${props.id}`}>
          {" "}
          <img
          onClick={()=>{window.scrollTo(0, 0)}}
            src={props.image}
            alt=""
          />
        </Link>
        <p>{props.name}</p>
        <div className="item_price">
          <div className="new_item_price">₹{props.new_price}</div>
          <div className="old_item_price">₹{props.old_price}</div>
        </div>
      </div>
    </div>
  );
};
