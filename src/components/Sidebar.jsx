import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Sidebar() {
  const { t } = useTranslation()

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        Finance System
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">
          {t('navigation.dashboard')}
        </NavLink>

        <NavLink to="/accounts">
          {t('navigation.accounts')}
        </NavLink>

        <NavLink to="/transactions">
          {t('navigation.transactions')}
        </NavLink>

        <NavLink to="/debts">
          {t('navigation.debts')}
        </NavLink>

        <NavLink to="/reports">
          {t('navigation.reports')}
        </NavLink>

        <NavLink to="/settings">
          {t('navigation.settings')}
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar