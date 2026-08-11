import Sidebar from '../components/Sidebar';
import './DashboardLayout.css';

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;