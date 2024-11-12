import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignupForm from './Components/LoginSignupForm';
import Dashboard from './Components/Dashboard/Dashboard';
import { AuthProvider } from './Components/CreateContext/AuthContext';
import PrivateRoute from './Components/PrivateRoute';

const App = () => {
  return (
    <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginSignupForm />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
    </AuthProvider>
      </Router>
  );
};

export default App;
