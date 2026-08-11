import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        Finance System
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/accounts">
          Accounts
        </NavLink>

        <NavLink to="/transactions">
          Transactions
        </NavLink>

        <NavLink to="/debts">
          Debts
        </NavLink>

        <NavLink to="/reports">
          Reports
        </NavLink>

        <NavLink to="/settings">
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;