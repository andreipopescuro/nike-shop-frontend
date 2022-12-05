import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Succes from "./pages/Success";
import { useDispatch, useSelector } from "react-redux";
import User from "./pages/User";
// import { userRequest } from "./lib/requestMethods";
import { getCart } from "./redux/apiCalls";
import NotFound from "./pages/NotFound";
import "~slick-carousel/slick/slick-theme.css";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      getCart(dispatch, user._id);
    }
  }, [dispatch, user]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        {["/products/:category", "/products/:category/filtered"].map(
          (path, i) => (
            <Route path={path} element={<ProductList />} key={i} />
          )
        )}
        <Route path="/product/:id" element={<SingleProduct />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/success" element={<Succes />}></Route>
        <Route
          path="/dashboard/:id"
          element={user ? <User /> : <Navigate to="/" />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
