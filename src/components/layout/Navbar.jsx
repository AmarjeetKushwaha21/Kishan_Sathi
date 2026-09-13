import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUser } from 'react-icons/fi';

import Logo from '@/components/ui/Logo';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled
          ? 'border-b border-primary-100/80 bg-white/90 shadow-soft backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/90'
          : 'bg-transparent'
      )}
    >
      <nav
        aria-label="Main navigation"
        className="container-app flex h-16 items-center justify-between sm:h-20"
      >
        <NavLink
          to="/"
          end
          className="focus-ring flex items-center rounded-xl transition hover:opacity-90"
          aria-label="Kishan Sathi home"
        >
          <Logo />
        </NavLink>

        <div className="flex items-center gap-2.5 sm:gap-3.5 md:gap-4">
          <NavLink
            to="/dashboard"
            end
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-md active:translate-y-0 active:bg-primary-800 sm:px-4 sm:py-2"
            aria-label="Dashboard Home"
          >
            <FiHome className="text-base sm:text-lg" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-semibold text-white">Home</span>
          </NavLink>

          <ThemeToggle
            className="!h-10 !w-10 !rounded-xl !border !border-primary-200/80 !bg-primary-50/80 !text-primary-700 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:!bg-primary-100 hover:!text-primary-800 hover:shadow-md active:translate-y-0 dark:!border-primary-800/60 dark:!bg-primary-950/50 dark:!text-primary-300 dark:hover:!bg-primary-900/60 dark:hover:!text-primary-200"
          />

          <NavLink
            to={isAuthenticated ? '/dashboard/profile' : '/login'}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-primary-200/80 bg-primary-50/80 text-lg text-primary-700 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-100 hover:text-primary-800 hover:shadow-md active:translate-y-0 dark:border-primary-800/60 dark:bg-primary-950/50 dark:text-primary-300 dark:hover:bg-primary-900/60 dark:hover:text-primary-200"
            aria-label="Profile"
            title={isAuthenticated ? 'My Profile' : 'Sign in / Profile'}
          >
            <FiUser aria-hidden="true" />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

