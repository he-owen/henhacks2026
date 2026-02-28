import { Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './dashboard/Dashboard';
import CrudDashboard from './crud-dashboard/CrudDashboard';
import SignIn from './sign-in/SignIn';
import SignInSide from './sign-in-side/SignInSide';
import SignUp from './sign-up/SignUp';
import ProtectedRoute from './auth/ProtectedRoute';

export default function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crud/*"
          element={
            <ProtectedRoute>
              <CrudDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-in-side" element={<SignInSide />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
