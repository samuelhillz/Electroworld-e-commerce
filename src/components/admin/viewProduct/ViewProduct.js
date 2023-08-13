import React, { useEffect, useState } from "react";
import "./ViewProduct.css";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import { deleteObject, ref } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts } from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";

const ViewProduct = () => {
    const {data} = useFetchCollection()
    console.log(data)

  const products = useSelector(selectProducts)
  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(
       STORE_PRODUCTS({
         products:data,
       })
     );
  }, [dispatch, data]);


  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
    } catch (error) {}
  };

  return (
    <div>
      <div className="table">
        <h2 className="all-product">All products</h2>
        {data.lenght === 0 ? (
          "No products found"
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th className="admin-cats">Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((data, index) => {
                console.log(data)
                const { id, name, price, imageURL, category } = data;
                return (
                  <tr key={id}>
                   
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td className="admin-cats">{category}</td>
                    <td> {`$${price}`}</td>
                    <td>
                     
                      &nbsp;
                      <FaTrashAlt
                        className="adminicons"
                        color="red"
                        size={18}
                        onClick={() => deleteProduct(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewProduct;
