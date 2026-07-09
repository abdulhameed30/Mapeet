import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function Layout() {
    const [isClosed, setIsClosed] = useState(false);
  return (
    <div className="layout min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
        <div className='flex h-screen overflow-hidden'>
      <Sidebar  isClosed={isClosed}
            onToggleSubMenu={() => setIsClosed(false)}
            setIsClosed={() => setIsClosed(!isClosed)} />
      <div className="main-content flex-1 flex flex-col overflow-hidden">
         <Header
              toggleSidebar={() => setIsClosed(!isClosed)}
              isClosed={isClosed}
            />
        <main className="content flex-1 overflow-y-auto bg-transparent p-6">
          <Outlet />
        </main>
      </div>
      </div>
    </div>
  )
}

export default Layout
