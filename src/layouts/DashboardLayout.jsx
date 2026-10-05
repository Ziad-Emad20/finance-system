import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import {
  Menu,
  WalletCards,
} from 'lucide-react'

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

        {/* Logo */}
        <Link
          to="/dashboard"
          className="mobile-header-brand"
          onClick={closeSidebar}
        >
          <div className="mobile-header-brand-icon">
            <WalletCards size={18} strokeWidth={2.2} />
          </div>

          <span>
            ZE Finance
          </span>
        </Link>

        {/* Menu */}
        <button
          className="mobile-menu-button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

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