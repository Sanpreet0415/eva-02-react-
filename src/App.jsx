import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import CategoryPage from './pages/CategoryPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import Destinations from './components/Destinations';
import { ThemeContext } from './ThemeContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/destination/:destinationId" element={<DestinationDetailPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AdminPage />
            </PrivateRoute>
          }
        />
        {}
        <Route path="/destinations" element={<Destinations />} />
      </Routes>
    </Router>
  );
}

export default App;
