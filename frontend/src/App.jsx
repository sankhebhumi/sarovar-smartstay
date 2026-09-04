import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Public Pages
import Home from './pages/public/Home';
import RoomsPublic from './pages/public/RoomsPublic';
import RestaurantPublic from './pages/public/RestaurantPublic';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// Dashboard & Role Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import RoomsAdmin from './pages/admin/RoomsAdmin';
import BookingsAdmin from './pages/admin/BookingsAdmin';
import CustomersAdmin from './pages/admin/CustomersAdmin';
import EmployeesAdmin from './pages/admin/EmployeesAdmin';
import RestaurantAdmin from './pages/admin/RestaurantAdmin';
import InventoryAdmin from './pages/admin/InventoryAdmin';
import AICenter from './pages/admin/AICenter';
import SecurityCenter from './pages/admin/SecurityCenter';
import ReportsAdmin from './pages/admin/ReportsAdmin';

import ReceptionDashboard from './pages/reception/ReceptionDashboard';
import HousekeepingDashboard from './pages/housekeeping/HousekeepingDashboard';
import CustomerDashboard from './pages/customer/CustomerDashboard';

// Guard component for role protection
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8 text-center text-slate-500 font-bold">Loading Sarovar SmartStay...</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && allowedRoles.length > 0) {
    const hasPermission = user.roles && user.roles.some((role) => allowedRoles.includes(role));
    if (!hasPermission) return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<RoomsPublic />} />
        <Route path="/restaurant" element={<RestaurantPublic />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rooms"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_RECEPTIONIST']}>
              <RoomsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_RECEPTIONIST']}>
              <BookingsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_RECEPTIONIST']}>
              <CustomersAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <EmployeesAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/restaurant"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_RESTAURANT_STAFF']}>
              <RestaurantAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/inventory"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_RESTAURANT_STAFF']}>
              <InventoryAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/ai-center"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <AICenter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/security-center"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <SecurityCenter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <ReportsAdmin />
            </ProtectedRoute>
          }
        />

        {/* Receptionist Routes */}
        <Route
          path="/reception"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_RECEPTIONIST']}>
              <ReceptionDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reception/rooms"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_RECEPTIONIST']}>
              <RoomsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reception/bookings"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_RECEPTIONIST']}>
              <BookingsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reception/customers"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_RECEPTIONIST']}>
              <CustomersAdmin />
            </ProtectedRoute>
          }
        />

        {/* Housekeeping Routes */}
        <Route
          path="/housekeeping"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_HOUSEKEEPING']}>
              <HousekeepingDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/housekeeping/rooms"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_HOUSEKEEPING']}>
              <HousekeepingDashboard />
            </ProtectedRoute>
          }
        />

        {/* Customer Portal Routes */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={['ROLE_CUSTOMER']}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/bookings"
          element={
            <ProtectedRoute allowedRoles={['ROLE_CUSTOMER']}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/restaurant"
          element={
            <ProtectedRoute allowedRoles={['ROLE_CUSTOMER']}>
              <RestaurantPublic />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/recommendations"
          element={
            <ProtectedRoute allowedRoles={['ROLE_CUSTOMER']}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
