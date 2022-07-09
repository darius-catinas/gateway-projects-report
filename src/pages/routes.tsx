import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Blueprint from './Blueprint';
import Dashboard from './dashboard/Dashboard';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blueprint child={<Dashboard />} />} />
      </Routes>
    </Router>
  );
}
