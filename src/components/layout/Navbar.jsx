import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { PUBLIC_NAV } from '@/constants/nav';
import { cn } from '@/utils/cn';

const leftNav = PUBLIC_NAV.filter((n) => !n.auth);
const rightNav = PUBLIC_NAV.filter((n) => n.auth);

function NavLinkItem({ item, onClick, compact = false }) {
  return (
    <NavLink
      to={item.to}
      end={item.end ?? true}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'focus-ring inline-flex items-center gap-2 rounded-xl text-sm font-medium transition',
          compact ? 'px-3 py-1.5' : 'px-3.5 py-2',
          isActive
            ? 'bg-primary-600 text-white'
            : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
        )
      }
    >
      {({ isActive }) => (
        <>
          {item.icon && (
            <span
              className={cn(
                'flex h-5 w-5 items-center justify-center',
                isActive ? 'text-white' : 'text-primary-600'
              )}
              aria-hidden="true"
            >
              <item.icon className="text-lg" />
            </span>
          )}
          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const handleNavClick = () => setOpen(false);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled || open
          ? 'border-b border-primary-100 bg-white/90 shadow-soft backdrop-blur'
          : 'bg-transparent'
      )}
    >
      <nav aria-label="Main navigation" className="container-app flex h-16 items-center justify-between sm:h-20">
        <NavLink to="/" end className="focus-ring rounded-xl" aria-label="Kishan Sathi home">
          <Logo />
        </NavLink>

        <ul className="hidden items-center gap-1 lg:flex">
          {leftNav.map((item) => (
            <li key={item.label}>
              <NavLinkItem item={item} />
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {rightNav.map((item) => (
            <NavLinkItem key={item.label} item={item} />
          ))}
          <NavLink to="/register" end className="focus-ring rounded-xl">
            <Button size="sm" className="font-semibold">
              Get Started
            </Button>
          </NavLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="focus-ring flex h-11 w-11 items-center justify-center rounded-xl text-2xl text-gray-700 lg:hidden"
        >
          {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="border-t border-primary-100 bg-white/95 backdrop-blur lg:hidden"
          >
            <div className="container-app flex flex-col gap-1 py-4">
              {leftNav.map((item) => (
                <div key={item.label} className="px-1">
                  <NavLinkItem item={item} onClick={handleNavClick} />
                </div>
              ))}
              <div className="mt-2 flex items-center gap-2 px-1">
                <ThemeToggle />
                {rightNav.map((item) => (
                  <NavLinkItem key={item.label} item={item} onClick={handleNavClick} />
                ))}
              </div>
              <div className="mt-3 px-1">
                <NavLink to="/register" end className="focus-ring block w-full rounded-xl" onClick={handleNavClick}>
                  <Button fullWidth size="sm">
                    Get Started
                  </Button>
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
