import { Outlet } from 'react-router-dom';
import LandingFooter from '../landing/LandingFooter';
import BlogHeader from './BlogHeader';

/** Shared shell for all blog pages: solid header, content, brand footer. */
export default function BlogLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background-primary">
      <BlogHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
}
