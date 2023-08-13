import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import {
  DECREASE_CART,
  add_To_Cart,
  selectCartItems,
  totalQuantity,
} from "../../../redux/slice/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItems);

  const cart = cartItem.find((item) => {
    return item.id === id;
  });

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setProduct(obj);
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const addingToCart = (product) => {
    dispatch(add_To_Cart(product));
    dispatch(totalQuantity());
  };
  const decrease_cart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(totalQuantity());
  };

  return (
    <div className="product_detail ">
      <div className="productdetailscontainer">
        <div className="product-banner">
          <h2 className="product-text">Product Details</h2>
        </div>
        <Link className="container3" style={{textDecoration:'none', color:'gray'}} to="/#products"> &larr; Back To Products</Link>
      </div>
      <div className="details_wrapper ">
        <img
          src={product.imageURL}
          alt={product.name}
        
        />
        <div className="details_right">
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <p>{product.desc}</p>
          <p>
            <b>Brand:</b> {product.brand}
          </p>
          
          <button
            onClick={() => addingToCart(product)}
            className="product_addtocart"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
