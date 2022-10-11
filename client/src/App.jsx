import Container from "./pages/Container";
import { BrowserRouter, Routes,Route, Navigate } from "react-router-dom";
import Card from "./pages/Card";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from './pages/ProductList';
import Register from  "./pages/Register"
import {useAuth} from "./contexts/AuthContext"
import Welcome from "./pages/Welcome"
/* 

*/


const App = () => {
  const {loggedIn}=useAuth()
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Container />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={loggedIn ? <Navigate to="/welcome" replace /> :  <Login />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/products" element={<ProductList/>} />
      <Route path="/products/:category" element={<ProductList/>}/>
      <Route path="/welcome" element={<Welcome/>}/>

      <Route path="/products/product/:id" element={<Product/>}/>
      <Route path="/card" element={<Card/>}/>
    </Routes>
  </BrowserRouter>
  )

};

export default App;