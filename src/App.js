import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/login";
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from 'react';
import {getStats,getIncoms, getProducts, getUsers, getOrders} from './redux/apiCalls'
import OrderList from "./pages/orderlist/OrderList";
import Order from "./pages/order/Order"
import ScrollToTop from "./ScrollToTop";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStats());
    dispatch(getIncoms());
    dispatch(getProducts());
    dispatch(getUsers());
    dispatch(getOrders())
  }, [dispatch])
  
  const error = useSelector(state=>state.stats.error);
  const admin = error === "Invalid Token" ? null : JSON.parse(localStorage.getItem("user"));
  return (
    <Router>
      <ScrollToTop>

      <Switch>
          <Route path="/login">
            {!admin ? <Login /> : <Redirect to="/" />}
          </Route>
        { admin ? (
        <><Topbar />
        <Route render={(props)=>(
          <div className="container">
          <Sidebar {...props}/>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/orders">
              <OrderList />
            </Route>
            <Route path="/order/:orderId">
              <Order />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="/newproduct">
              <NewProduct />
            </Route>
            </div>
            )}/>
          </>):
          <Redirect to='/login' />}
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
