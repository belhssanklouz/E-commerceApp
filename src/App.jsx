import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import ProductList from "./Pages/ProductList";
import Register from "./Pages/Register";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Success from "./Pages/Success";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector(state=>state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/Login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />



      </Routes>
    </BrowserRouter>
  );
};

export default App;