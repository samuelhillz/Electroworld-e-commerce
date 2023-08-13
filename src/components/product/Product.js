import React, { useEffect, useState } from "react";
import "./Product.css";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts } from "../../redux/slice/productSlice";
import { FaCogs } from "react-icons/fa";

const Product = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { data } = useFetchCollection();

  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const toogleFilter = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

 
  return (
    <div className="container mainProducts">
      <aside className={showFilter ? "filter show" : "filter"}>
        <ProductFilter />
      </aside>
      <div className="content">
        <ProductList products={products} />
        <div className="show-filter" onClick={toogleFilter}>
          <FaCogs size={20} color="orangered" />
          <p>
            <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
