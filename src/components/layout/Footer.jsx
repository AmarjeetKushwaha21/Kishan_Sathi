import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

import Logo from '@/components/ui/Logo';
import { APP } from '@/constants/app';

const EXPLORE_LINKS = [
  { label: 'Features', to: '/' },
  { label: 'AI Assistant', to: '/' },
  { label: 'Market Prices', to: '/' },
  { label: 'Weather Alerts', to: '/' },
];

const COMPANY_LINKS = [
  { label: 'About Us', to: '/' },
  { label: 'Careers', to: '/' },
  { label: 'Blog', to: '/' },
  { label: 'Contact', to: '/' },
];

const SOCIALS = [
  { label: 'Facebook', icon: FiFacebook, href: '#' },
  { label: 'Instagram', icon: FiInstagram, href: '#' },
  { label: 'Twitter', icon: FiTwitter, href: '#' },
  { label: 'YouTube', icon: FiYoutube, href: '#' },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-primary-100 bg-white">
      <div className="container-app grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="space-y-4">
          <Link to="/" className="focus-ring inline-block rounded-xl">
            <Logo />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-gray-600">{APP.description}</p>
          <div className="flex gap-2">
            {SOCIALS.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-700 transition hover:bg-primary-600 hover:text-white"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-gray-900">Explore</h3>
          <ul className="space-y-2.5">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm text-gray-600 transition hover:text-primary-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-gray-900">Company</h3>
          <ul className="space-y-2.5">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm text-gray-600 transition hover:text-primary-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-gray-900">Get in Touch</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-3">
              <FiPhone className="shrink-0 text-primary-600" aria-hidden="true" />
              +91 1800 123 4567
            </li>
            <li className="flex items-center gap-3">
              <FiMail className="shrink-0 text-primary-600" aria-hidden="true" />
              {APP.supportEmail}
            </li>
            <li className="flex items-start gap-3">
              <FiMapPin className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
              <span>
                AgriTech Innovation Hub,
                <br />
                Ludhiana, Punjab, India
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 py-5">
        <div className="container-app flex flex-col items-center justify-between gap-2 text-xs text-gray-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {APP.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-600">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-600">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}