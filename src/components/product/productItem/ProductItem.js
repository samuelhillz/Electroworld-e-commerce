import React from "react";
import "./ProductItem.css";
import { Link } from "react-router-dom";
import {
  add_To_Cart,
  totalQuantity,
} from "../../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductItem = ({
  product,
  id,
  name,
  price,
  brand,
  imageURL,
}) => {
  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(add_To_Cart(product));
    dispatch(totalQuantity());
  };
  return (
    <div className="grid product-items-box">
      <Link to={`/productDetails/${id}`}>
        <div className="productImg">
          <img src={imageURL} alt={name} height={200} width={200} />
        </div>
      </Link>
      <div className="product_Content">
        <div className="products-info">
          <h3>{name}</h3>
          <p>{brand}</p>
        </div>
        <div className="btn-cart">
          <p>{`$${price}`}</p>
          <button onClick={() => addToCart(product)} className="product-btn">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
