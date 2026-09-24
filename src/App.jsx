import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { RoleRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import CashierDashboard from './pages/CashierDashboard';
import CashierTransactions from './pages/CashierTransactions';
import CashierCollections from './pages/CashierCollections';

function HomeRoute() {
  const { user } = useAuth();
  return <Navigate to={user?.role?.toUpperCase() === 'CASHIER' ? '/cashier' : '/overview'} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={<HomeRoute />}
            />
            <Route
              path="/overview"
              element={
                <RoleRoute allowedRoles={['ADMIN', 'MANAGER']}>
                  <Dashboard />
                </RoleRoute>
              }
            />
            <Route
              path="/users"
              element={
                <RoleRoute allowedRoles={['ADMIN', 'MANAGER']}>
                  <Users />
                </RoleRoute>
              }
            />
            <Route
              path="/cashier"
              element={<RoleRoute allowedRoles={['CASHIER', 'COLLECTOR']}><CashierDashboard /></RoleRoute>}
            />
            <Route
              path="/cashier/transactions"
              element={<RoleRoute allowedRoles={['CASHIER', 'COLLECTOR']}><CashierTransactions /></RoleRoute>}
            />
            <Route
              path="/cashier/collections"
              element={<RoleRoute allowedRoles={['CASHIER', 'COLLECTOR']}><CashierCollections /></RoleRoute>}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
