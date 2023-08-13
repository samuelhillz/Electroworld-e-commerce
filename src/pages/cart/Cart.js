import React, { useEffect } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  DECREASE_CART,
  add_To_Cart,
  cartReset,
  removeProduct,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQty,
  subTotal,
  totalQuantity,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQty = useSelector(selectCartTotalQty);
  const dispatch = useDispatch();

  const increase = (cart) => {
    dispatch(add_To_Cart(cart));
  };

  const decrease = (cart) => {
    dispatch(DECREASE_CART(cart));
  };
  const removeItem = (cart) => {
    dispatch(removeProduct(cart));
  };
  const clearCart = () => {
    dispatch(cartReset());
  };

  useEffect(() => {
    dispatch(subTotal());
    dispatch(totalQuantity());
  }, [dispatch, cartItems]);

  return (
    <section className="table container2">
      <div className="cart-banner ">
        <h2 className="cart-text">Shopping cart</h2>
      </div>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p className="emptyCart"> Your cart is currently empty...</p>
          <br />
          <div>
            <Link
              style={{ textDecoration: "none", color: "grey" }}
              className="backToShopping"
              to="/#products"
            >
              &larr; Please go back and fill-up your cart
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-spacing container">
          <table className="table-ctn">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cart, index) => {
                const { imageURL, price, cartQuantity, quantity, id, name } =
                  cart;
                return (
                  <tr key={index}>
                    <td>
                      <p className="product--name">{name}</p>
                      <img src={imageURL} width={100} alt="" />
                    </td>
                    <td>${price}</td>
                    <td className="count">
                      <button
                        onClick={() => decrease(cart)}
                        className="count-btn decrease"
                      >
                        <b>-</b>
                      </button>
                      <span className="cartQty"> {cartQuantity}</span>
                      <button
                        onClick={() => increase(cart)}
                        className="count-btn increase"
                      >
                        <b>+</b>
                      </button>
                    </td>
                    <td>${(price * cartQuantity).toFixed(2)}</td>
                    <td>
                      <FaTrashAlt
                        onClick={() => removeItem(cart)}
                        size={19}
                        color="red"
                        className="trash"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="summary">
            <button onClick={() => clearCart()} className="clearcart">
              Clear cart
            </button>
            <div>
              <div className="checkout">
                <div>
                  <Link
                    style={{ textDecoration: "none", color: "grey" }}
                    to="/#products"
                  >
                    &larr; Continue shopping
                  </Link>
                </div>
              </div>
              <br />
              <div className="checking-out">
                <div className="car-summary">
                  <p>{`Cart item(s): ${cartTotalQty}`}</p>
                </div>
                <div className="text">
                  <div>subtotal:</div>
                  <h3>{`$${cartTotalAmount}`}</h3>
                </div>
                <p>Tax and shipping calculated at checkout</p>
                <button className="btn-checkout">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
