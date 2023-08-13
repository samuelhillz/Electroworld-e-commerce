import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    Filter_Search: (state, action) => {
      console.log(action.payload);
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = tempProducts;
    },
    SORT_PRODUCTS: (state, action) => {
      console.log(action.payload);
      const { products, sort } = action.payload;
      let tempProducts = [];
      if (sort === "lowest_price") {
        tempProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "highest_price") {
        tempProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "a-z") {
        tempProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        tempProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      state.filteredProducts = tempProducts;
    },
    FILTER_CATEGORY: (state, action) => {
      const { category, products } = action.payload;
      let tempProducts = [];
      if (category === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter((item) => item.category === category);
      }
      state.filteredProducts = tempProducts;
    },
    FILTER_BRAND: (state, action) => {
        console.log(action.payload)
      const { brand, products } = action.payload;
      let tempProducts = [];
      if (brand === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter((item)=>{
            return item.brand === brand
        })
      }
      state.filteredProducts = tempProducts;
    },
   
  },
});

export const { Filter_Search,clearFiltered, FILTER_BRAND, SORT_PRODUCTS, FILTER_CATEGORY } =
  filterSlice.actions;
export const selectFilteredProduct = (state) => state.filter.filteredProducts;
// export const selectFilteredProduct = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
