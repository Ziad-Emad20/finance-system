import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  X,
  LayoutDashboard,
  WalletCards,
  ArrowLeftRight,
  Tags,
  HandCoins,
  BarChart3,
  Settings,
} from 'lucide-react'

function Sidebar({ isOpen, onClose }) {
  const { t } = useTranslation()

  const handleNavigation = () => {
    onClose()
  }

  return (
    <aside
      className={`sidebar ${
        isOpen ? 'sidebar-open' : ''
      }`}
    >

      {/* Sidebar Header */}

      <div className="sidebar-header">

        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <WalletCards
              size={19}
              strokeWidth={2.2}
            />
          </div>

          <span className="sidebar-logo">
            ZE Finance
          </span>
        </div>

        <button
          className="sidebar-close-button"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={21} />
        </button>

      </div>

      {/* Navigation */}

      <nav className="sidebar-nav">

        <NavLink
          to="/dashboard"
          onClick={handleNavigation}
        >
          <LayoutDashboard
            size={18}
            strokeWidth={2}
          />

          <span>
            {t('navigation.dashboard')}
          </span>
        </NavLink>

        <NavLink
          to="/accounts"
          onClick={handleNavigation}
        >
          <WalletCards
            size={18}
            strokeWidth={2}
          />

          <span>
            {t('navigation.accounts')}
          </span>
        </NavLink>

        <NavLink
          to="/transactions"
          onClick={handleNavigation}
        >
          <ArrowLeftRight
            size={18}
            strokeWidth={2}
          />

          <span>
            {t('navigation.transactions')}
          </span>
        </NavLink>

        <NavLink
          to="/categories"
          onClick={handleNavigation}
        >
          <Tags
            size={18}
            strokeWidth={2}
          />

          <span>
            {t('navigation.categories')}
          </span>
        </NavLink>

        <NavLink
          to="/debts"
          onClick={handleNavigation}
        >
          <HandCoins
            size={18}
            strokeWidth={2}
          />

          <span>
            {t('navigation.debts')}
          </span>
        </NavLink>

        <NavLink
          to="/reports"
          onClick={handleNavigation}
        >
          <BarChart3
            size={18}
            strokeWidth={2}
          />

          <span>
            {t('navigation.reports')}
          </span>
        </NavLink>

        <NavLink
          to="/settings"
          onClick={handleNavigation}
        >
          <Settings
            size={18}
            strokeWidth={2}
          />

          <span>
            {t('navigation.settings')}
          </span>
        </NavLink>

      </nav>

    </aside>
  )
}

export default Sidebar