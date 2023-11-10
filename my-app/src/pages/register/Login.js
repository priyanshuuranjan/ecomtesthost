import React, { useState } from "react";
import { TextField, Box, Button, Typography, styled } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/Config";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import Alert from "@mui/material/Alert";

const Component = styled(Box)`
  width: 400px;
  margin: 100px auto 0;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
  background-color: #fff;
  border-radius: 8px;
`;

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 8px;
  font-size: 18px;
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 14px;
`;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logIn } = useUserAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
     setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <Component>
       {error && <Alert variant="danger">{error}</Alert>}
      <Box>
        <Wrapper>
          <TextField
            variant="outlined"
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              style: {
                fontSize: 16,
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: 16,
              },
            }}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: {
                fontSize: 16,
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: 16,
              },
            }}
          />

          <LoginButton variant="contained" fullWidth onClick={handleLogin}>
            Login
          </LoginButton>
          <Text style={{ textAlign: "center" }}>OR</Text>
          <div className="signup" style={{ fontSize: 18 }}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </Wrapper>
      </Box>
    </Component>
  );
};

export default Login;

// import React, { useState } from "react";
// import { TextField, Box, Button, Typography, styled } from "@mui/material";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase/Config";

// const Component = styled(Box)`
//   width: 400px;
//   margin: 100px auto 0; /* Added margin-top for spacing from the top */
//   box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
//   background-color: #fff;
//   border-radius: 8px;
// `;

// const Wrapper = styled(Box)`
//   padding: 25px 35px;
//   display: flex;
//   flex: 1;
//   overflow: auto;
//   flex-direction: column;
//   & > div,
//   & > button,
//   & > p {
//     margin-top: 20px;
//   }
// `;

// const LoginButton = styled(Button)`
//   text-transform: none;
//   background: #fb641b;
//   color: #fff;
//   height: 48px;
//   border-radius: 8px;
//   font-size: 18px;
// `;

// const SignupButton = styled(Button)`
//   text-transform: none;
//   background: #fff;
//   color: #2874f0;
//   height: 48px;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
//   font-size: 18px;
// `;

// const Text = styled(Typography)`
//   color: #878787;
//   font-size: 14px;
// `;

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [isLogin, setIsLogin] = useState(true);

//   const handleToggleMode = () => {
//     setIsLogin(!isLogin);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredentials = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log("userCredentials");
//       const user = userCredentials.user;
//       localStorage.setItem("token", user.accessToken);
//       localStorage.setItem("user", JSON.stringify(user));
//     } catch (error) {
//       console.log("error", error);
//     }
//   }

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredentials = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log("userCredentials");
//       const user = userCredentials.user;
//       localStorage.setItem("token", user.accessToken);
//       localStorage.setItem("user", JSON.stringify(user));
//     } catch (error) {
//       console.log("error", error);
//     }

//     // After successful signup, switch to the login mode
//     setIsLogin(true);
//   };

//   return (
//     <Component>
//       <Box>
//         <Wrapper>
//           {isLogin ? (
//             <>
//               <TextField
//                 variant="outlined"
//                 label="Email"
//                 fullWidth
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 InputProps={{
//                   style: {
//                     fontSize: 16,
//                   },
//                 }}
//                 InputLabelProps={{
//                   style: {
//                     fontSize: 16,
//                   },
//                 }}
//               />
//               <TextField
//                 variant="outlined"
//                 label="Password"
//                 type="password"
//                 fullWidth
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 InputProps={{
//                   style: {
//                     fontSize: 16,
//                   },
//                 }}
//                 InputLabelProps={{
//                   style: {
//                     fontSize: 16,
//                   },
//                 }}
//               />

//               <LoginButton variant="contained" fullWidth onClick={handleLogin}>
//                 Login
//               </LoginButton>
//               <Text style={{ textAlign: "center" }}>OR</Text>
//               <SignupButton
//                 variant="outlined"
//                 fullWidth
//                 onClick={handleToggleMode}
//               >
//                 Create an account
//               </SignupButton>
//             </>
//           ) : (
//             <>
//               <TextField
//                 variant="outlined"
//                 label="Name"
//                 fullWidth
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 InputProps={{
//                   style: {
//                     fontSize: 16,
//                   },
//                 }}
//                 InputLabelProps={{
//                   style: {
//                     fontSize: 16,
//                   },
//                 }}
//               />
//               <TextField
//                 variant="outlined"
//                 label="Email"
//                 fullWidth
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 InputProps={{
//                   style: {
//                     fontSize: 16,
//                   },
//                 }}
//                 InputLabelProps={{
//                   style: {
//                     fontSize: 16,
//                   },
//                 }}
//               />
//               <TextField
//                 variant="outlined"
//                 label="Password"
//                 type="password"
//                 fullWidth
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 InputProps={{
//                   style: {
//                     fontSize: 15,
//                   },
//                 }}
//                 InputLabelProps={{
//                   style: {
//                     fontSize: 15,
//                   },
//                 }}
//               />
//               <SignupButton
//                 variant="contained"
//                 fullWidth
//                 onClick={handleSignup}
//               >
//                 Signup
//               </SignupButton>
//               <Text style={{ textAlign: "center" }}>OR</Text>
//               <LoginButton
//                 variant="outlined"
//                 fullWidth
//                 onClick={handleToggleMode}
//               >
//                 Already have an account
//               </LoginButton>
//             </>
//           )}
//         </Wrapper>
//       </Box>
//     </Component>
//   );
// }

// export default Login;

/*







// import React, { useState } from "react";

// function App() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLogin, setIsLogin] = useState(true);

//   const submitForm = (e) => {
//     e.preventDefault();
//     // Implement your login or signup logic here
//     console.log("Email: ", email);
//     console.log("Password: ", password);
//   };

//   const containerStyles = {
//     padding: 0,
//   };

//   const formLabelStyles = {
//     fontSize: "0.9rem",
//     display: "flex",
//   };

//   const buttonStyles = {
//     border: "1px solid transparent",
//     padding: "0.375rem 0.75rem",
//   };

//   const imgStyles = {
//     height: "80px",
//   };

//   const cardStyles = {
//     borderRadius: "1rem",
//     border: "1px solid #ccc",
//   };

//   return (
//     <>
//       <div style={{ height: "100%" }}>
//         <div
//           style={{
//             position: "absolute",
//             backgroundColor: "#0d6efd",
//             height: "103%",
//             clipPath: "polygon(100% 42%, 0% 100%, 0% 0%, 100% 0%)",
//             overflow: "hidden",
//             left: 0,
//             right: 0,
//             top: 0,
//           }}
//         />
//         <form action="" onSubmit={submitForm}>
//           <section className="vh-100 login-custom">
//             <div className="container py-5 h-100" style={containerStyles}>
//               <div className="row d-flex justify-content-center align-items-center h-100">
//                 <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//                   <div className="card shadow-2-strong" style={cardStyles}>
//                     <div className="card-body p-5 text-center">
//                       <img
//                         className="d-flex m-auto pb-3 img"
//                         src="logo.png"
//                         alt="logo"
//                         style={imgStyles}
//                       />
//                       <div className="card-title h5">
//                         <h2>{isLogin ? "Login" : "Signup"}</h2>
//                       </div>
//                       <div className="d-flex flex-column align-items-center w-100 p-1">
//                         <div className="mb-4 w-100">
//                           <label className="form-label" htmlFor="formBasicEmail" style={formLabelStyles}>
//                             Email address
//                           </label>
//                           <input
//                             placeholder="Enter email"
//                             type="email"
//                             id="formBasicEmail"
//                             className="form-control"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                           />
//                         </div>
//                         <div className="mb-4 w-100">
//                           <label className="form-label" htmlFor="formBasicPassword" style={formLabelStyles}>
//                             Password
//                           </label>
//                           <input
//                             placeholder="Password"
//                             type="password"
//                             id="formBasicPassword"
//                             className="form-control"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                           />
//                         </div>
//                         <button
//                           className="btn btn-primary btn-lg btn-block"
//                           type="submit"
//                           style={buttonStyles}
//                         >
//                           {isLogin ? "Login" : "Signup"}
//                         </button>
//                         <p
//                           onClick={() => setIsLogin(!isLogin)}
//                           className="text-primary pointer"
//                         >
//                           {isLogin ? "Create an account" : "Already have an account"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </form>
//       </div>
//     </>
//   );
// }

// export default App;

*/
