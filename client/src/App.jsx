import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Navbar from './components/Navbar'; 
import Shop from './pages/Shop';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import ProductDetail from './pages/ProductDetail';

import AdminProducts from './pages/admin/AdminProducts';
import AdminAddProduct from './pages/admin/AdminAddProduct';
import AdminEditProduct from './pages/admin/AdminEditProduct';

import AdminCategories from './pages/admin/AdminCategories';
import AdminAddCategory from './pages/admin/AdminAddCategory';
import AdminEditCategory from './pages/admin/AdminEditCategory';

import AdminUsers from './pages/admin/AdminUsers';
import AdminEditUser from './pages/admin/AdminEditUser';

import AdminAdmins from './pages/admin/AdminAdmins';
import AdminAddAdmin from './pages/admin/AdminAddAdmin';
import AdminEditAdmin from './pages/admin/AdminEditAdmin';

function App() {

  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/admin');
  return (
    <>
     {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />

        <Route path="/admin/dashboard" element={<AdminAdmins />}/>
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/add" element={<AdminAddProduct />} />
        <Route path="/admin/products/edit/:id" element={<AdminEditProduct />} />

        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/categories/add" element={<AdminAddCategory />} />
        <Route path="/admin/categories/edit/:id" element={<AdminEditCategory />} />

        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/users/edit/:id" element={<AdminEditUser />} />

        <Route path="/admin/admins" element={<AdminAdmins />} />
        <Route path="/admin/admins/add" element={<AdminAddAdmin />} />
        <Route path="/admin/admins/edit/:id" element={<AdminEditAdmin />} />

      </Routes>
    </>
  );
}

export default App;
