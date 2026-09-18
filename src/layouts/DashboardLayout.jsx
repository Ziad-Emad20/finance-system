import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import Sidebar from '../components/Sidebar'

import './DashboardLayout.css'

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="dashboard-layout">

      {/* Mobile Header */}

      <header className="mobile-header">

        <button
          className="mobile-menu-button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* <div className="mobile-header-title">
          ZE Finance
        </div> */}

      </header>

      {/* Sidebar */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content */}

      <main className="main-content">
        <Outlet />
      </main>

    </div>
  )
}

export default DashboardLayout