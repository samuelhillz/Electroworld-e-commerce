import React, { useEffect, useState } from "react";
import "./ProductFilter.css";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";
import {
  FILTER_BRAND,
  FILTER_CATEGORY,
} from "../../../redux/slice/filterSlice";

const ProductFilter = () => {
  const [categories, setCategories] = useState("All");
  const [brand, setBrand] = useState("All");
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  const allCategory = [
    "All",
    ...new Set(products.map((item) => item.category)),
  ];

  const allBrand = ["All", ...new Set(products.map((item) => item.brand))];
  console.log(allBrand);

  useEffect(() => {
    dispatch(FILTER_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  const filterProducts = (item) => {
    setCategories(item);
    dispatch(FILTER_CATEGORY({ products, category: item }));
  };
  const clearFilter = () => {
    setCategories("All");
    setBrand("All");
  };

  return (
    <div className="productFilter">
      <h3>Categories</h3>
      <div className="productCategory">
        {allCategory.map((item, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${categories}` === item ? "actives" : null}
              onClick={() => filterProducts(item)}
            >
              &#8250; {item}
            </button>
          );
        })}
      </div>
      <h3 className="prod-brand">Brand</h3>
      <div className="productBrand">
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrand.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <br />
        <button onClick={() => clearFilter()} className="btn_clearFilter">
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
