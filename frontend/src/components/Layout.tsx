import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Soundstream</div>
        <nav>
          <Link to="/dashboard" className="mr-4">Dashboard</Link>
          <Link to="/profile" className="mr-4">Profile</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </header>
      <main className="flex-grow p-6 bg-gray-100">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2024 Soundstream. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
