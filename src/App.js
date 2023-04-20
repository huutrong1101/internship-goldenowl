import "./App.css";
import React, { useState, useEffect } from "react";
import IconNike from "./app/assets/nike.png";
import shoesData from "./app/data/shoes.json";
import ProductItem from "./component/ProductItem";
import CartItem from "./component/CartItem";

function App() {
  const [shoes, setShoes] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setShoes(shoesData.shoes);

    setCartItems(JSON.parse(localStorage.getItem("cartItems")) ?? []);
  }, []);

  const addToCart = (shoe) => {
    const newCartItems = [...cartItems, { ...shoe, quantity: 1 }];
    setCartItems(newCartItems);

    setLocalStorage(newCartItems);
  };

  const deleteToCart = (id) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex((item) => item.id === id);
    newCartItems.splice(index, 1);

    setCartItems(newCartItems);

    setLocalStorage(newCartItems);
  };

  const incrementQuantity = (id) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex((item) => item?.id === id);
    newCartItems[index].quantity += 1;
    setCartItems(newCartItems);

    setLocalStorage(newCartItems);
  };

  const decrementQuantity = (id) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex((item) => item?.id === id);
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      setCartItems(newCartItems);
    } else {
      const remainingItems = newCartItems.filter((item) => item?.id !== id);
      setCartItems(remainingItems);

      setLocalStorage(newCartItems);
    }
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item?.price * item?.quantity,
      0
    );
  };

  const setLocalStorage = (newCartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  return (
    <div className="main">
      <div className="productsList">
        <div className="icon">
          <img src={IconNike} alt="" />
        </div>
        <div className="title">Our Products</div>
        <div className="listProduct">
          <div style={{ display: "block" }}>
            {shoes.map((shoe) => {
              const isAdded = cartItems.some((item) => item.name === shoe.name);
              return (
                <ProductItem
                  key={shoe.id}
                  shoe={shoe}
                  isAdded={isAdded}
                  addToCart={addToCart}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="cart">
        <div className="icon">
          <img src={IconNike} alt="" />
        </div>
        <div className="title">
          Your cart
          <span className="titleAmount">
            ${Math.round(getTotal() * 100) / 100}
          </span>
        </div>
        <div className="listProduct">
          {cartItems.length > 0 ? (
            cartItems.map((shoe) => (
              <CartItem
                key={shoe.id}
                shoe={shoe}
                deleteToCart={deleteToCart}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
              />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
