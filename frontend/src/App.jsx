import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { JobsPage } from './pages/JobsPage';

export default function App() {
  return (
    <BrowserRouter>
      <nav><Link to='/'>Auth</Link> | <Link to='/jobs'>Jobs</Link></nav>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/jobs' element={<JobsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
