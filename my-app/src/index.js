import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

// Import your authentication context provider
import { UserAuthContextProvider } from "./context/UserAuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* Wrap your entire app with the UserAuthContextProvider */}
      <UserAuthContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserAuthContextProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
