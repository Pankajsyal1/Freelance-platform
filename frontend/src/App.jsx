import React from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { JobsPage } from './pages/JobsPage';
import useAuthStore from './store/authStore';
import { Briefcase, LogOut, User as UserIcon } from 'lucide-react';

export default function App() {
  const { user, logout } = useAuthStore();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border bg-card sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
              <Briefcase className="h-6 w-6" />
              <span>DevLance</span>
            </Link>
            
            <div className="flex items-center gap-6">
              <Link to="/jobs" className="text-sm font-medium hover:text-primary transition-colors">
                Browse Jobs
              </Link>
              
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium border-l border-border pl-4">
                    <UserIcon className="h-4 w-4" />
                    <span>{user.name}</span>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded capitalize">{user.role}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/" 
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </nav>

        <main className="pb-12">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/jobs" /> : <AuthPage />} />
            <Route path="/jobs" element={<JobsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
