import React, { useState } from "react";
import "./AddProduct.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Phone" },
];

const Addproduct = () => {
  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    price: "",
    category: "",
    brand: "",
    desc: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          alert("image uploaded");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
      });
      navigate("/admin/all-products");
    } catch (error) {}
  };

  return (
    <div className="adminproduct">
      <h2 className="prod-add">Add New Product</h2>
      <div className="admincard">
        <form onSubmit={addProduct}>
          <input
            type="text"
            placeholder="Product Name"
            required
            name="name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />
          <label> Product image</label>
          <input
            type="file"
            accept="image/*"
            placeholder="Product image"
            name="image"
            onChange={(e) => handleImageChange(e)}
          />
          <input
            type="text"
            // required
            name="imageURL"
            placeholder="imageURL"
            value={product.imageURL}
            disabled
          />

          <label className="label"> Product price</label>

          <input
            type="number"
            placeholder="Product price"
            required
            name="price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />
          <label className="label"> Product category</label>

          <select
            className="select"
            name="category"
            required
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option className="option" value="" disabled>
              Choose product category
            </option>
            {categories.map((item) => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <label className="label"> Product brand:</label>

          <input
            type="text"
            placeholder="Product brand"
            required
            name="brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />
          <label className="label"> Product description:</label>
          <textarea
            name="desc"
            value={product.desc}
            cols="30"
            rows="10"
            onChange={(e) => handleInputChange(e)}
          ></textarea>

          <button> Save product</button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
