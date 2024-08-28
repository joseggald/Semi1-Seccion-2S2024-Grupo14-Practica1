import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Songbar from '../../components/Songbar/Songbar';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-row">
      <Sidebar />
      <div className="flex flex-col flex-grow bg-[#111111]">
        <Header />
        <main
          className="flex-grow bg-[#333842] rounded-xl mb-2 mr-4 overflow-y-auto custom-scrollbar"
          style={{
            height: '477px',
            padding: '20px',
          }}
        >
          <Outlet />
        </main>
        <Songbar />
      </div>
    </div>
  );
};

export default Dashboard;
