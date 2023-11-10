import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";
import { DLT } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/esm/Table";
import { BsPlusLg } from "react-icons/bs";
import { MdArrowBack } from "react-icons/md";
import { BiMinus } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REMOVE, ADD } from "../redux/actions/action";
import "./Nav.css";
import { loadStripe } from "@stripe/stripe-js";

// firebase import
import { auth } from "../firebase/Config";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../firebase/Config";

const Nav = () => {
  const [menuIcon, setMenuIcon] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  //logout
  const { logOut, user } = useUserAuth();
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email); // Set the userEmail state to the user's email
      } else {
        setUserEmail(""); // Clear userEmail when the user is not logged in
      }
    });
  }, []);

  const [price, setPrice] = useState(0);
  // console.log(price);

  //! this is used to get the  items on the cart ye hm khi v use kr or cards ki item ko khi v get kr skte hai

  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();

  const dlt = (id) => {
    dispatch(DLT(id));
  };

  // add data

  const send = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };

  // remove one
  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };

  // toast
  const notify = () =>
    toast.success("🦄 Item Added In Your Cart", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        fontSize: "18px",
      },
    });

  useEffect(() => {
    total();
  }, [total]);
  // }, [getdata]);

  //! ---------------- Stripe Payment--------------------------------------------------------

  const makePayment = async () => {
    try {
      // Prepare the order data
      const orderInfo = {
        products: getdata,
        // You can add more fields like user information, timestamp, etc.
        // For example: user: user.uid, timestamp: new Date(),
      };
  
      // Reference to the "orders" collection in Firestore
      const ordersRef = collection(fireDB, 'orders');
  
      // Add the order data to Firestore
      await addDoc(ordersRef, orderInfo);
  
      // Continue with the existing Stripe payment code
      const stripe = await loadStripe(
        "pk_test_51O98QCSACaXpHsJl59PXiB7gh3tYbIryxbYaqFGjuSpaZtoWWzKYjeHlwBXJr4QNYyEMPeBPIlB5PyrFambXb48D002oJk5Ygu"
      );
  
      const body = {
        products: getdata,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch(
        "http://localhost:7000/api/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );
  
      const session = await response.json();
  
      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  

  /**========================================================================
   *!                           Payment Intigration
   *========================================================================**/

  //  const [name, setName] = useState("")
  //  const [address, setAddress] = useState("");
  //  const [pincode, setPincode] = useState("")
  //  const [phoneNumber, setPhoneNumber] = useState("")

  //  const buyNow = async () => {
  //    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
  //      return toast.error("All fields are required", {
  //        position: "top-center",
  //        autoClose: 1000,
  //        hideProgressBar: false,
  //        closeOnClick: true,
  //        pauseOnHover: true,
  //        draggable: true,
  //        progress: undefined,
  //        theme: "colored",
  //      })
  //    }

  //    const addressInfo = {
  //      name,
  //      address,
  //      pincode,
  //      phoneNumber,
  //      date: new Date().toLocaleString(
  //        "en-US",
  //        {
  //          month: "short",
  //          day: "2-digit",
  //          year: "numeric",
  //        }
  //      )
  //    }

  //    var options = {
  //      key: "",
  //      key_secret: "",
  //      amount: parseInt(price * 100),
  //      currency: "INR",
  //      order_receipt: 'order_rcptid_' + name,
  //      name: "E-Bharat",
  //      description: "for testing purpose",
  //      handler: function (response) {
  //        console.log(response)
  //        toast.success('Payment Successful')

  //        const paymentId = response.razorpay_payment_id;

  //        const orderInfo = {
  //          getdata,
  //          addressInfo,
  //          date: new Date().toLocaleString(
  //            "en-US",
  //            {
  //              month: "short",
  //              day: "2-digit",
  //              year: "numeric",
  //            }
  //          ),
  //          email: JSON.parse(localStorage.getItem("user")).user.email,
  //          userid: JSON.parse(localStorage.getItem("user")).user.uid,
  //          paymentId
  //        }

  //        try {

  //          const orderRef = collection(fireDB, 'order');
  //          addDoc(orderRef, orderInfo);

  //        } catch (error) {
  //          console.log(error)
  //        }
  //      },

  //      theme: {
  //        color: "#3399cc"
  //      }
  //    };

  //    var pay = new window.Razorpay(options);
  //    pay.open(); //
  //    console.log(pay)

  //  }

  // working on card menu when we add any item then it show that particular items

  const Nav = styled.nav`
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
      align-items: center;
      z-index: 9999;

      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.3s linear;
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
    }

    //! side bar cart  code........

    .cart-sidebar {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      width: 360px;
      height: 100%;
      background: #fff;
      box-shadow: -3px 0px 5px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 1px; //TODO slid bar cart ka size yha se change kiye hai phle 20px tha
    }
    .cart-table-header {
      border-bottom: 2px solid #000; /* Add a 2px thick solid black line under the headers */
      font-weight: bold;
    }

    // cart size variable
    .cart-sidebar p {
      font-size: 178x;
      margin-bottom: 7px;
      color: #212529;
      text-align: center;
    }

    //! side bar cart css images

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      margin-left: 40px;
    }

    .heading {
      font-size: 24px;
      margin: 0;
      margin-top: -100px;
    }

    .emptycart_img {
      display: flex;
      width: 200px;
      align-items: center;
    }

    /* Styling for the cart icon and item count */

    .cart-trolley--link {
      position: relative;
      display: flex;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      color: #333; /* Color for the cart icon */
    }

    /* getdata.length size icon */

    .cart-item-count {
      font-size: 20px;
      font-weight: bold;
    }

    .cart-trolley {
      font-size: 30px; /* Adjust the size as needed */
      margin-right: 10px;
    }

    .cart-total--item {
      width: 24px;
      height: 24px;
      position: absolute;
      background-color: #ff0000;
      color: #fff; /* Text color for the item count */
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      right: 0;
      font-size: 14px; /* Adjust the font size as needed */
    }

    //!  mobile

    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }

    .close-outline {
      display: none;
    }

    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 3.2rem;
      }

      .cart-total--item {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        background-color: #000;
        color: #000;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -20%;
        left: 70%;
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }

    .user-login--name {
      text-transform: capitalize;
    }

    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }

      .active .close-outline {
        display: inline-block;
      }

      .navbar-lists {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        /* transform-origin: top; */
        transition: all 3s linear;
      }

      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 9999;
        transform-origin: left;
        transition: all 3s linear;

        .navbar-link {
          font-size: 4.2rem;
        }
      }
      .cart-trolley--link {
        position: relative;

        .cart-trolley {
          position: relative;
          font-size: 5.2rem;
        }

        .cart-total--item {
          width: 4.2rem;
          height: 4.2rem;
          font-size: 2rem;
        }
      }

      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;

  return (
    <Nav>
      <div className={menuIcon ? "active" : "navbar"}>
        <ul className="navbar-lists">
          <li>
            <NavLink
              to="/"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              About
            </NavLink>
          </li>

         
          <li>
            <NavLink
              to="/products"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/success"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              Order
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              Contact
            </NavLink>
          </li>
          <li>
            {user ? (
              <div className="navbar-link user-dropdown">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {userEmail ? userEmail : ""}{" "}
                    {/* Display the user's email used for login */}
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="navbar-link"
                onClick={() => setMenuIcon(false)}
              >
                Login
              </NavLink>
            )}
          </li>
          <li>
            <div
              className="navbar-link cart-trolley--link"
              onClick={() => setIsCartOpen(!isCartOpen)}
              style={{ cursor: "pointer" }}
            >
              <FiShoppingCart className="cart-trolley" />
              <span className="cart-item-count">{getdata.length}</span>
            </div>

            {isCartOpen && (
              <div className="cart-sidebar">
                {/* <button
                  onClick={() => setIsCartOpen(false)}
                  className="cart-close-button"
                >
                  &#10006;
                </button> */}
                {/* 
                  //! card data size changes from here  */}

                {getdata.length > 0 ? (
                  <div
                    className="card-details"
                    style={{
                      width: "36rem",
                      padding: 10,
                      height: "100%",
                      maxHeight: "100vh", //here i  Set the maximum height equal to the screen height
                      overflowY: "auto", // this is used to show the scroll bar
                    }}
                  >
                    <Table>
                      <thead>
                        <tr style={{ fontSize: 19 }}>
                          <th className="cart-table-header">
                            <MdArrowBack
                              style={{ cursor: "pointer", fontSize: "25px" }} // Customize the icon size and cursor style
                              onClick={() => setIsCartOpen(false)} // Add the function to close the menu bar
                            />
                            Photo
                          </th>
                          <th
                            className="cart-table-header"
                            style={{ textAlign: "left", paddingLeft: "60px" }}
                          >
                            Items
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getdata.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <NavLink to={`/cart/${item.id}`}>
                                <img
                                  src={item.imgdata}
                                  style={{
                                    width: "9rem",
                                    height: "9rem",
                                    marginTop: 5,
                                  }}
                                  alt=""
                                />
                              </NavLink>
                            </td>
                            <td>
                              <p>{item.name}</p>
                              <p>Price: ₹{item.price}</p>

                              {/*  //!  quantity inc dec  */}

                              <p
                                style={{
                                  fontSize: 22,
                                  cursor: "pointer",
                                  marginLeft: 40,
                                  width: 100,
                                  cursor: "pointer",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "16px",
                                    paddingRight: "10px",
                                  }}
                                  onClick={
                                    item.qnty <= 1
                                      ? () => dlt(item.id)
                                      : () => remove(item)
                                  }
                                >
                                  <span
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                      cursor: "pointer",
                                      display: "inline-block",
                                      padding: "5px 10px",
                                      borderRadius: "5px",
                                      transition: "background-color 0.3s",
                                    }}
                                  >
                                    <BiMinus size={12} />
                                  </span>
                                </span>
                                {item.qnty}
                                <span
                                  style={{
                                    fontSize: "14px", // Set the font size to 16px
                                    cursor: "pointer",
                                    paddingLeft: "10px",
                                  }}
                                  onClick={() => {
                                    send(item);
                                    notify();
                                  }}
                                >
                                  <span
                                    style={{
                                      backgroundColor: "green",
                                      color: "white",
                                      cursor: "pointer",
                                      display: "inline-block",
                                      padding: "5px 10px",
                                      borderRadius: "5px",
                                      transition: "background-color 0.3s",
                                    }}
                                  >
                                    <BsPlusLg size={12} />
                                  </span>
                                </span>
                              </p>

                              {/* //! to delete the item from the cart slider */}

                              <p
                                style={{
                                  color: "red",
                                  fontSize: 20,
                                  cursor: "pointer",
                                }}
                                onClick={() => dlt(item.id)}
                              >
                                <i className="fas fa-trash smalltrash"></i>
                              </p>
                            </td>
                            <td
                              className="mt-5"
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => dlt(item.id)}
                            >
                              <i className="fas fa-trash largetrash"></i>
                            </td>
                          </tr>
                        ))}
                        <p
                          className="text-center"
                          style={{ fontWeight: "bold", marginTop: "10px" }}
                        >
                          Total: ₹ <span style={{ color: "red" }}>{price}</span>
                        </p>
                        <th className="text-right">
                          <button
                            className="btn btn-success"
                            onClick={makePayment}
                            type="button"
                          >
                            Checkout
                          </button>
                        </th>
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div
                    className="card_details d-flex justify-content-center align-items-center"
                    style={{
                      width: "24rem",
                      padding: 10,
                      position: "relative",
                    }}
                  >
                    <div className="container">
                      <p className="heading">Your cart is empty</p>
                      <img
                        src="./images/cart.gif"
                        alt="gif"
                        className="emptycart_img"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>

        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </Nav>
  );
};

export default Nav;
