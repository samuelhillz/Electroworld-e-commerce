import React from "react";
import "./Home.css";
import AdminrRoute from "../../components/adminRoute/AdminrRoute";
import Product from "../../components/product/Product";
import banner1 from "../../assets/discount.jpg";

const Home = () => {
  return (
    <>
      <div
        className="home-banner"
        style={{
          backgroundImage: `url(${banner1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 85%",
        }}
      >
        {/* <img className="banner-img" src={banner1}  alt="" /> */}
      </div>
      <Product />
      {/* <AdminrRoute/> */}
    </>
  );
};

export default Home;
