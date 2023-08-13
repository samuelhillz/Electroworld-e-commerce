import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";


const useFetchCollection = () =>{
     const [data, setData] = useState([]);


    const getProducts = () => {
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, orderBy("name", "desc"));

        // const q = query(
        //   collection(db, "cities"),
        //   where("state", "==", "CA")
        // );
        onSnapshot(q, (snapshot) => {
          // console.log(snapshot.docs)
          const allProducts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(allProducts);
          setData(allProducts);
          
          //   const cities = [];
          //   querySnapshot.forEach((doc) => {
          //     cities.push(doc.data().name);
          //   });
          //   console.log("Current cities in CA: ", cities.join(", "));
        });
      } catch (error) {}
    };
    useEffect(()=>{
        getProducts()
    }, [])
    return {data}

};

export default useFetchCollection;