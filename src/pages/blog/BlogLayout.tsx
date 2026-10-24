import { Outlet } from 'react-router-dom';
import LandingFooter from '../landing/LandingFooter';
import LanderHeader from '../landing/LanderHeader';

/** Shared shell for all blog pages: THE site's header (Kong 2026-10-24 23:06: one header, dropdown menu and links on every page), content, brand footer. */
export default function BlogLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background-primary">
      <LanderHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
}
