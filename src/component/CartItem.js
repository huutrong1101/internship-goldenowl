import React, { useState } from "react";
import IconTrash from "../app/assets/trash.png";
import "./CartItem.css";
import { motion } from "framer-motion";

const CartItem = ({
  shoe,
  deleteToCart,
  incrementQuantity,
  decrementQuantity,
}) => {
  const [actionDelete, setActionDelete] = useState(false);

  const handleDelete = (id) => {
    setActionDelete(true);
    setTimeout(() => {
      deleteToCart(id);
    }, 100);
  };

  const handleDecrease = (shoe) => {
    if (shoe.quantity === 1) {
      setActionDelete(true);
    }
    setTimeout(() => {
      decrementQuantity(shoe.id);
    }, 100);
  };

  return (
    <motion.div
      animate={{
        scale: actionDelete ? 0 : 1,
        opacity: actionDelete ? 0 : 1,
        transition: { duration: 0.75 },
      }}
      initial={{ opacity: actionDelete ? 1 : 0, scale: actionDelete ? 1 : 0 }}
      className="cartItem"
    >
      <div className="cartItemLeft">
        <div
          className="cartItemImage"
          style={{ backgroundColor: `${shoe.color}` }}
        >
          <div style={{ display: "block" }}>
            <img src={shoe.image} alt="" />
          </div>
        </div>
      </div>
      <div className="cartItemRight">
        <div className="cartItemName">{shoe.name}</div>
        <div className="cartItemPrice">${shoe.price}</div>
        <div className="cartItemActions">
          <div className="cartItemCount">
            <div className="btnDecrease" onClick={() => handleDecrease(shoe)}>
              -
            </div>
            <div className="countNumber">{shoe.quantity}</div>
            <div
              className="btnIncrease"
              onClick={() => incrementQuantity(shoe.id)}
            >
              +
            </div>
          </div>
          <div className="cartItemRemove" onClick={() => handleDelete(shoe.id)}>
            <img src={IconTrash} alt="" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
