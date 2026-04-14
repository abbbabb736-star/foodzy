import { Outlet } from 'react-router-dom';
import logoIcon from '../assets/icons/logo.svg';

export function MainLayout() {
  return (
    <div className="app-shell">
      <header className="site-header container">
        <div className="site-header__brand">
          <img src={logoIcon} alt="Foodzy logo" />
          <div>
            <h1>Foodzy</h1>
            <p>A treasure of tastes</p>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Foodzy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
