import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { BsFillGridFill } from "react-icons/bs";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  Filter_Search,
  SORT_PRODUCTS,
  selectFilteredProduct,
} from "../../../redux/slice/filterSlice";

const ProductList = ({ products }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [grid, setGrid] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("lowest price");
  const filteredProducts = useSelector(selectFilteredProduct);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(Filter_Search({ products, search }));
  }, [dispatch, products, search]);

  return (
    <div className="productList">
      <div className="productList_top">
        <div className="productListIcons">
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <p className="products-number">
            <span>
              <b>{filteredProducts.length}</b> product(s) found
            </span>
          </p>
        </div>

        <div className="product_search">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="product_sort">
          <label className="label"> Sort:</label>
          <select
            className="select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="lowest_price">Lowest price</option>
            <option value="highest_price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div>
        {products.lenght === 0 ? (
          <p>No product found</p>
        ) : (
          <div className="grid">
            {filteredProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} product={product} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
