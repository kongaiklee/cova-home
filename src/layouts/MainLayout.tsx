import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Button from '../components/Button';

const MainLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleGoTo = useCallback((link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <div>
      {/* Header */}
      <header className="fixed w-full top-4 sm:top-5 inset-x-0 bg-transparent z-50">
        <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20">
          <div ref={menuRef}>
            <div className="flex items-center justify-between w-full bg-white rounded-lg p-3 sm:p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-border-primary">
              {/* Logo */}
              <Link to="/">
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/logo.png"
                    alt="COVA"
                    className="size-7 sm:size-8"
                  />
                  <span className="text-xl sm:text-[28px] leading-[28px] font-bold text-text-primary-extended">
                    COVA
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-2">
                <ul className="flex items-center gap-2">
                  <li className="px-2 py-1">
                    <Link
                      to="/features"
                      className={clsx(
                        'text-sm font-medium hover:text-primary transition-colors',
                        location.pathname === '/features'
                          ? 'text-primary'
                          : 'text-text-secondary'
                      )}
                    >
                      Features
                    </Link>
                  </li>
                  <li className="px-2 py-1">
                    <Link
                      to="/corporates"
                      className={clsx(
                        'text-sm font-medium hover:text-primary transition-colors',
                        location.pathname === '/corporates'
                          ? 'text-primary'
                          : 'text-text-secondary'
                      )}
                    >
                      For Corporates
                    </Link>
                  </li>
                  <li className="px-2 py-1">
                    <Link
                      to="/#"
                      className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Desktop Buttons */}
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    handleGoTo(
                      `${import.meta.env.VITE_APP_COVARAGE_URL}/signin`
                    )
                  }
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    handleGoTo(
                      `${import.meta.env.VITE_APP_COVARAGE_URL}/registration-type`
                    )
                  }
                >
                  Start for free
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="relative size-6">
                  <svg
                    className={clsx(
                      'absolute inset-0 size-6 transition-all duration-300',
                      isMobileMenuOpen
                        ? 'opacity-0 rotate-90'
                        : 'opacity-100 rotate-0'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <svg
                    className={clsx(
                      'absolute inset-0 size-6 transition-all duration-300',
                      isMobileMenuOpen
                        ? 'opacity-100 rotate-0'
                        : 'opacity-0 -rotate-90'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </button>
            </div>

            {/* Mobile Menu */}
            <div
              className={clsx(
                'mt-2 bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-border-primary overflow-hidden transition-all duration-300 ease-in-out',
                isMobileMenuOpen
                  ? 'max-h-96 opacity-100'
                  : 'max-h-0 opacity-0 mt-0'
              )}
            >
              <nav className="p-4">
                <ul className="flex flex-col space-y-3">
                  <li>
                    <Link
                      to="/features"
                      onClick={closeMobileMenu}
                      className={clsx(
                        'block text-sm font-medium hover:text-primary transition-colors py-2',
                        location.pathname === '/features'
                          ? 'text-primary'
                          : 'text-text-secondary'
                      )}
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/corporates"
                      onClick={closeMobileMenu}
                      className={clsx(
                        'block text-sm font-medium hover:text-primary transition-colors py-2',
                        location.pathname === '/corporates'
                          ? 'text-primary'
                          : 'text-text-secondary'
                      )}
                    >
                      For Corporates
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/#"
                      onClick={closeMobileMenu}
                      className="block text-sm font-medium text-text-secondary hover:text-primary transition-colors py-2"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
                <div className="flex gap-2 mt-4 pt-4 border-t border-border-primary">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      handleGoTo(
                        `${import.meta.env.VITE_APP_COVARAGE_URL}/signin`
                      )
                    }
                  >
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      handleGoTo(
                        `${import.meta.env.VITE_APP_COVARAGE_URL}/registration-type`
                      )
                    }
                  >
                    Start for free
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content Area */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <section className="flex items-center justify-center bg-linear-to-b from-primary-extended via-primary to-white py-12 md:py-20 lg:py-30 px-4 text-center">
        <div className="w-full max-w-[524px]">
          <h1 className="text-3xl lg:text-5xl font-medium text-white mb-2">
            Start Managing Your Coverage Today
          </h1>
          <p className="text-base lg:text-lg text-white mb-6">
            Take control of your insurance and access concierge services — all
            in one simple, secure app.
          </p>
          <Button
            variant="primary"
            onClick={() =>
              handleGoTo(
                `${import.meta.env.VITE_APP_COVARAGE_URL}/registration-type`
              )
            }
          >
            Start for free
          </Button>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-container p-6 md:p-12 lg:p-20 mx-auto flex flex-col sm:flex-row gap-4">
          <Link to="/" className="flex-1">
            <div className="flex items-center gap-2">
              <img
                src="/assets/logo.png"
                alt="COVA"
                className="size-7 sm:size-8"
              />
              <span className="text-xl sm:text-[28px] leading-[28px] font-bold text-text-primary-extended">
                COVA
              </span>
            </div>
          </Link>
          <div className="flex flex-1">
            <ul className="flex-1 space-y-2">
              <li>
                <span className="text-sm text-text-primary font-medium">
                  Explore
                </span>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-text-primary hover:text-text-secondary hover:underline transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-sm text-text-primary hover:text-text-secondary hover:underline transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/corporates"
                  className="text-sm text-text-primary hover:text-text-secondary hover:underline transition-colors"
                >
                  For Corporates
                </Link>
              </li>
              <li>
                <Link
                  to="/#"
                  className="text-sm text-text-primary hover:text-text-secondary hover:underline transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
            <ul className="flex-1 space-y-2">
              <li>
                <span className="text-sm text-text-primary font-medium">
                  Get Started
                </span>
              </li>
              <li>
                <Link
                  to={`${import.meta.env.VITE_APP_COVARAGE_URL}/registration-type`}
                  className="text-sm text-text-primary hover:text-text-secondary hover:underline transition-colors"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to={`${import.meta.env.VITE_APP_COVARAGE_URL}/signin`}
                  className="text-sm text-text-primary hover:text-text-secondary hover:underline transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-border-secondary">
        <div className="max-w-container px-6 md:px-12 lg:px-20 py-5 mx-auto flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="flex-1">
            <p className="text-sm text-text-secondary">
              © COVA {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex flex-1">
            <div className="flex-1">
              <Link
                to="/#"
                className="text-sm text-text-secondary hover:underline transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="flex-1">
              <Link
                to="/#"
                className="text-sm text-text-secondary hover:underline transition-colors"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
