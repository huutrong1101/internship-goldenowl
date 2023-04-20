import React from "react";
import IconCheck from "../app/assets/check.png";
import "./ProductItem.css";

const ProductItem = ({ shoe, isAdded, addToCart }) => {
  return (
    <div className="productItem">
      <div className="itemImage" style={{ backgroundColor: `${shoe.color}` }}>
        <img src={shoe.image} alt="" />
      </div>
      <div className="itemTitle">{shoe.name}</div>
      <div className="itemDescription">{shoe.description}</div>
      <div className="itemBottom">
        <div className="itemPrice">${shoe.price}</div>
        {isAdded ? (
          <div className="itemCheck">
            <div className={`itemCheckCover ${isAdded ? "show" : "hidden"}`}>
              <img src={IconCheck} alt="" />
            </div>
          </div>
        ) : (
          <div className="itemBtn" onClick={() => addToCart(shoe)}>
            <p>ADD TO CART</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
