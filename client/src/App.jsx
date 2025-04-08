import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import AdminApp from '../Admin/Components/AdminApp';
import ProtectedRoute from './pages/ProtectedRoute'; // Assuming this component checks for login
import AdminProtectedRoute from './pages/AdminProtectedRoutes';
import Product from '../Admin/Components/Product';
import Dashboard from '../Admin/Components/Dashboard';
import { UIProvider } from './components/context/ui';
import Customers from '../Admin/Components/Customers';
import NotFound from './pages/NotFound';
import Order from '../Admin/Components/Order';
import Notifications from './components/notifications';
import Message from '../Admin/Components/Message';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      {/* Protected Admin Routes */}
      <Route path="admin" element={<AdminProtectedRoute><AdminApp /></AdminProtectedRoute>} >
        <Route path="products" element={<AdminProtectedRoute><Product /></AdminProtectedRoute>} />
        <Route path="dashboard" element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
        <Route path="customers" element={<AdminProtectedRoute><Customers /></AdminProtectedRoute>} />
        <Route path="orders" element={<AdminProtectedRoute><Order /></AdminProtectedRoute>} />
        <Route path="message" element={<AdminProtectedRoute><Message /></AdminProtectedRoute>} />

      </Route>

      {/* Catch-All Route for Undefined Paths */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
      {/* Public Routes */}
  return <UIProvider>
  <RouterProvider router={router} />
  <Notifications />
  </UIProvider>
  ;
}

export default App;
