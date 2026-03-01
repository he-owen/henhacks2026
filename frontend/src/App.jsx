import { Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './dashboard/Dashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import SyncUserToBackend from './auth/syncUserToBackend';

export default function App() {
  return (
    <>
      <CssBaseline />
      <SyncUserToBackend />
      <ProtectedRoute>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </ProtectedRoute>
    </>
  );
}
