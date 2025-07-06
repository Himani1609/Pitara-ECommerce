import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';
import Checkout from './pages/Checkout'; 
import AddressForm from './pages/AddressForm';


function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/addresses" element={<AddressForm />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
      </>
  );
}

export default App;
