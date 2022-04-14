import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";
import About from "./About";

// Stripe Public Key
const promise = loadStripe(
  "pk_test_51Lqf8cL9komtFXP5FSQOE1A2m8TMMVBnnxi4HBJMICKLBY5mviQZtSFsPhGqShY6oKfrCnI5LRfWssBkMGoMfjdA00CSzHC95r"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // Will only run once when the App component loads.
    auth.onAuthStateChanged((authUser) => {
      // console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // The user just logged in OR the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // The user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={[<Header />, <Login />, <Footer />,]}></Route>
          <Route path="/orders" element={[<Header />, <Orders />, <Footer />,]}></Route>
          <Route path="/checkout" element={[<Header />, <Checkout />, <Footer />,]}></Route>
          <Route path="/about" element={[<Header />, <About />, <Footer />]}></Route>
          <Route
            path="/payment"
            element={[
              <Header />,
              <Elements stripe={promise}>
                <Payment />
              </Elements>, <Footer />,
            ]}
          ></Route>
          <Route path="/" element={[<Header />, <Home />, <Footer />]}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;