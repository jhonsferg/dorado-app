import { useState } from 'react';
import { Outlet } from 'react-router';

import Header from './Header';
import Sidebar from './Sidebar';

import { useAuth } from '@/hooks/useAuth';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col gap-4'>
      <Header />

      <div className='grid grid-cols-5 gap-1'>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          userRoles={user?.roles}
        />

        <main className='h-full p-6 col-span-4'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
