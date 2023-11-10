import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/Config";
import "./Success.css";

const Success = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Function to fetch user's orders from Firestore
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(fireDB, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersData = [];

        ordersSnapshot.forEach((doc) => {
          // You may need to filter orders by user if they are stored with user identifiers
          // For simplicity, we'll fetch all orders in this example
          const order = doc.data();
          ordersData.push(order);
        });

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div id="success-container">
      <h2 className="center-text, green-text">Payment Success,</h2>
      <h3 className="center-text">Do Visit Us Agian.</h3>
      <h3 className="center-text"> Orders Details:</h3>
      {orders.map((order, index) => (
        <div className="order" key={index}>
          <h3 className="center-text" >Order No.{index + 1}</h3>
          <ul>
            {order.products.map((product, productIndex) => (
              <li key={productIndex}>
                <div className="product-info">
                  <img
                    src={product.imgdata}
                    alt={`Product Image - ${product.name}`}
                    className="product-image"
                  />
                  <div className="product-details">
                    <strong>Name:</strong> {product.name}
                    <br />
                    <strong>Price:</strong> {product.price}
                    <br />
                    <strong>Quantity:</strong> {product.qnty}
                    <br />
                    <strong>Description:</strong> {product.address}
                    <br />
                    {/* Add more fields as needed */}
                  </div>
                </div>
              </li>
            ))}
            <li className="total-price center-text">
              <strong className="red-text">Paid Amount: </strong>
              <span className="green-text">
                ₹{calculateTotalPrice(order.products)}
              </span>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

// Calculate the total price for the products in an order
const calculateTotalPrice = (products) => {
  let total = 0;
  products.forEach((product) => {
    total += product.price * product.qnty;
  });
  return total;
};

export default Success;

// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { fireDB } from '../../firebase/Config';
// import './Success.css'; // Import the CSS file

// const Success = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     // ... (your existing code to fetch orders from Firebase)

//   }, []);

//   return (
//     <div id="success-container">
//       <h1>Success</h1>
//       <h2>Your Orders:</h2>
//       {orders.map((order, index) => (
//         <div className="order" key={index}>
//           <h3>Order #{index + 1}</h3>
//           <ul>
//             {order.products.map((product, productIndex) => (
//               <li key={productIndex}>
//                 <div className="product-info">
//                   <img src={product.imgdata} alt={`Product Image - ${product.name}`} />
//                   <div>
//                     <strong>Name:</strong> {product.name}<br />
//                     <strong>Price:</strong> {product.price}<br />
//                     <strong>Quantity:</strong> {product.qnty}<br />
//                     <strong>Description:</strong> {product.address}<br />
//                     {/* Add more fields as needed */}
//                   </div>
//                 </div>
//               </li>
//             ))}
//             <li className="total-price">
//               <strong>Total Price:</strong> {order.price}
//             </li>
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Success;
