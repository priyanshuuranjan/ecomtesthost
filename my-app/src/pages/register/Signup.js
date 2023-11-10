import React, { useState } from "react";
import { TextField, Box, Button, Typography, styled } from "@mui/material";
import { updateProfile } from "firebase/auth";
import { auth, fireDB } from "../../firebase/Config";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import Alert from "@mui/material/Alert";
import { collection, addDoc } from "firebase/firestore";

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

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  font-size: 18px;
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 14px;
`;
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Create the user in Firebase Authentication
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      await addDoc(collection(fireDB, "users"), {
        name,
        email,
        password,
        // You can add more fields here if needed
      });

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Component>
      <Box>
        {error && <Alert variant="danger">{error}</Alert>}
        <Wrapper>
          <TextField
            variant="outlined"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
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
                fontSize: 15,
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: 15,
              },
            }}
          />
          <SignupButton variant="contained" fullWidth onClick={handleSignup}>
            Signup
          </SignupButton>
          <Text style={{ textAlign: "center" }}>OR</Text>
          <div className="signup" style={{ fontSize: 18 }}>
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Wrapper>
      </Box>
    </Component>
  );
};

export default Signup;
