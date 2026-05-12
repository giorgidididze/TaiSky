import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Main } from './Components/Home/Main/main';
import { Signup } from './Components/Basics/signup';
import { Activate } from './Components/Basics/Activate';
import { Forgot } from './Components/Basics/forgot';
import { Reset } from './Components/Basics/reset';
import { Login } from './Components/Basics/login';

import { AdminDashboard } from './Components/Admin/Dashboard/Dashboard';
import { UpdateProduct } from './Components/Admin/Products/UpdateProduct';
import { ViewProduct } from './Components/Admin/Products/ViewProduct';
import { AdminProductList } from './Components/Admin/Products/AdminProductList';
import { CreateProduct } from './Components/Admin/Products/CreatePrdouct';
import { AllUsers } from './Components/Basics/AllUsers';

import { Cart } from './Components/Order/Cart/Cart';
import { ViewOrder } from './Components/Order/Address/ViewOrder';
import { Orderlist } from './Components/Order/Address/Orderlist';
import { MyOrderList } from './Components/Order/MyOrder/MyOrderList';
import { Address } from './Components/Order/Address/Address';
import { Editaddress } from './Components/Order/Address/Editaddress';

import { useSelector } from "react-redux";

function App() {

  // 🔥 AUTH FROM REDUX (NO LOCALSTORAGE BUGS)
  const isAuth = useSelector(state => state.auth.isAuth);
  const user = useSelector(state => state.auth.currentUser);

  // 🔥 PRIVATE ROUTE
  const PrivateRoute = ({ children }) => {
    return isAuth ? children : <Navigate to="/login" />;
  };

  // 🔥 ADMIN ROUTE
  const AdminRoute = ({ children }) => {
    if (!isAuth) return <Navigate to="/login" />;
    if (user?.role !== "admin") {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <div className="App">
      <Router>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path='/' element={<Main />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/activate/:activeToken' element={<Activate />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/reset/:resetToken' element={<Reset />} />
          <Route path='/login' element={<Login />} />
          <Route path='/view-product/:id' element={<ViewProduct />} />

          {/* ADMIN ROUTES */}
          <Route path='/admin-dashboard'
            element={<AdminRoute><AdminDashboard /></AdminRoute>}
          />

          <Route path='/admin/list-products'
            element={<AdminRoute><AdminProductList /></AdminRoute>}
          />

          <Route path='/admin/create-product'
            element={<AdminRoute><CreateProduct /></AdminRoute>}
          />

          <Route path='/admin/edit-product/:id'
            element={<AdminRoute><UpdateProduct /></AdminRoute>}
          />

          <Route path='/admin/list-users'
            element={<AdminRoute><AllUsers /></AdminRoute>}
          />

          <Route path='/admin/view-order/:id'
            element={<AdminRoute><ViewOrder /></AdminRoute>}
          />

          <Route path='/admin/list-orders'
            element={<AdminRoute><Orderlist /></AdminRoute>}
          />

          {/* PRIVATE USER ROUTES */}
          <Route path='/view-cart'
            element={<PrivateRoute><Cart /></PrivateRoute>}
          />

          <Route path='/myorder-list'
            element={<PrivateRoute><MyOrderList /></PrivateRoute>}
          />

          <Route path='/address'
            element={<PrivateRoute><Address /></PrivateRoute>}
          />

          <Route path='/edit-address/:id'
            element={<PrivateRoute><Editaddress /></PrivateRoute>}
          />

          {/* 404 */}
          <Route path='*'
            element={
              <div style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "40px",
                fontWeight: "bold"
              }}>
                404 | Page Not Found
              </div>
            }
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;