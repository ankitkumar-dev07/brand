import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import brandLogo from '../assets/logo.jpg';

const products = [
  ['Tool Marketplace', '/products/tool-marketplace'],
  ['Growth Analytics', '/products/growth-analytics'],
  ['Agency Cliq', '/products/agency-cliq'],
  ['Growth Insights', '/products/growth-insights'],
];

const solutions = [
  ['Solutions — For', '/solutions'],
  ['Solutions — Use Cases', '/solutions/use-cases'],
];

const resources = [
  ['About Us', '/about'],
  ['Support', '/support'],
  ['Jobs / Hiring', '/jobs'],
  ['Blog / Case Studies', '/blog'],
];

function Logo({ compact }) {
  return (
    <Link
      to="/"
      aria-label="BrandCliqs home"
      className="flex shrink-0 items-center"
    >
      <img
        src={brandLogo}
        alt="BrandCliqs"
        className={`w-auto object-contain transition-all duration-200 ${
          compact ? 'h-10 max-w-[120px]' : 'h-12 max-w-[145px]'
        }`}
      />
    </Link>
  );
}

function Dropdown({ label, items, onNavigate, compact }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className={`flex items-center gap-1.5 whitespace-nowrap font-medium text-[#d7cfe0] transition-colors duration-150 hover:text-white ${
          compact ? 'text-sm' : 'text-sm md:text-base'
        }`}
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-[60] min-w-56 pt-3">
          <div className="rounded-xl border border-white/10 bg-[#21172b] p-2 shadow-xl">
            {items.map(([name, path]) => (
              <Link
                key={path}
                to={path}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className="block rounded-lg px-4 py-3 text-sm text-[#d7cfe0] transition-colors duration-150 hover:bg-white/10 hover:text-white"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );
  const [scrollProgress, setScrollProgress] = useState(0);

  const compact = scrollProgress > 0.05;

  // Compact navbar smoothly while scrolling
  useEffect(() => {
    let frameId = null;

    const handleScroll = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        const progress = Math.min(
          Math.max(window.scrollY / 140, 0),
          1
        );

        setScrollProgress(progress);
        frameId = null;
      });
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  // Close mobile menu after route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Preserve theme preference
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const closeMobileMenu = () => setMobileOpen(false);

  const navbarStyle = {
    height: `${64 - scrollProgress * 12}px`,
    width: `calc(100% - ${scrollProgress * 80}px)`,
    marginTop: `${scrollProgress * 10}px`,
    borderRadius: `${scrollProgress * 24}px`,
    boxShadow: `0 ${4 + scrollProgress * 8}px ${
      16 + scrollProgress * 20
    }px rgba(20, 10, 30, ${
      0.08 + scrollProgress * 0.12
    })`,
    transition:
      'height 220ms ease, width 220ms ease, margin-top 220ms ease, border-radius 220ms ease, box-shadow 220ms ease',
  };

  const mobileLinkClass =
    'block rounded-lg px-3 py-2.5 text-sm text-[#e0d8e8] transition-colors duration-150 hover:bg-white/10';

  const mobileSectionTitleClass =
    'mb-2 text-xs font-semibold uppercase tracking-widest text-[#a99bb9]';

  // Pricing has no sub-links, so it is a section label that is also a link.
  // Same size, colour and letter-spacing as PRODUCTS / SOLUTIONS / RESOURCES.
  const mobilePricingClass =
    'block py-1.5 text-sm font-semibold uppercase tracking-widest text-[#d7cfe0] transition-colors duration-150 hover:text-white';

  return (
    <header
      className="navbar-shell sticky top-0 z-50 mx-auto"
      style={navbarStyle}
    >
      <nav className="relative flex h-full items-center justify-between gap-3 rounded-[inherit] border border-white/10 bg-[#21172b]/95 px-4 backdrop-blur-xl sm:gap-4 sm:px-6 md:px-8 lg:px-10">
        {/* Brand logo */}
        <Logo compact={compact} />

        {/* Desktop navigation */}
        <div
          className={`hidden items-center lg:flex ${
            compact ? 'gap-6 xl:gap-8' : 'gap-6 xl:gap-10'
          }`}
        >
          <Dropdown
            label="Products"
            items={products}
            compact={compact}
          />

          <Dropdown
            label="Solutions"
            items={solutions}
            compact={compact}
          />

          <Link
            to="/pricing"
            className={`whitespace-nowrap font-medium text-[#d7cfe0] transition-colors duration-150 hover:text-white ${
              compact ? 'text-sm' : 'text-sm md:text-base'
            }`}
          >
            Pricing
          </Link>

          <Dropdown
            label="Resources"
            items={resources}
            compact={compact}
          />
        </div>

        {/* Desktop account actions */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-4">
          <Link
            to="/login"
            className="whitespace-nowrap text-sm font-semibold text-white transition-colors duration-150 hover:text-[#d7cfe0] md:text-base"
          >
            Log in
          </Link>

          {/* Theme toggle */}
          <div
            className={`flex shrink-0 items-center gap-1 rounded-full border border-[#624078] p-1 transition-all duration-200 ${
              compact ? 'scale-95' : ''
            }`}
          >
            <button
              type="button"
              onClick={() => setDarkMode(false)}
              aria-label="Switch to light mode"
              aria-pressed={!darkMode}
              className={`grid h-9 w-9 place-items-center rounded-full transition-colors duration-150 ${
                !darkMode
                  ? 'bg-white text-orange-500'
                  : 'text-[#a99bb9] hover:bg-white/10'
              }`}
            >
              <Sun size={18} />
            </button>

            <button
              type="button"
              onClick={() => setDarkMode(true)}
              aria-label="Switch to dark mode"
              aria-pressed={darkMode}
              className={`grid h-9 w-9 place-items-center rounded-full transition-colors duration-150 ${
                darkMode
                  ? 'bg-white text-[#21172b]'
                  : 'text-[#a99bb9] hover:bg-white/10'
              }`}
            >
              <Moon size={17} />
            </button>
          </div>

          <Link
            to="/register"
            className={`whitespace-nowrap rounded-2xl bg-[#7029e5] font-semibold text-white transition-all duration-150 hover:bg-[#812ff5] ${
              compact ? 'px-4 py-2.5 text-sm' : 'px-4 py-3 text-sm xl:px-5'
            }`}
          >
            Sign up
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((previous) => !previous)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white transition-colors hover:bg-white/10 lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        {/* Mobile navigation */}
        {mobileOpen && (
          <div className="navbar-mobile-menu absolute left-0 right-0 top-full z-[60] mt-3 max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#21172b] p-5 shadow-2xl lg:hidden">
            <div className="flex flex-col gap-5">
              <div>
                <p className={mobileSectionTitleClass}>Products</p>
                {products.map(([name, path]) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={closeMobileMenu}
                    className={mobileLinkClass}
                  >
                    {name}
                  </Link>
                ))}
              </div>

              <div>
                <p className={mobileSectionTitleClass}>Solutions</p>
                {solutions.map(([name, path]) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={closeMobileMenu}
                    className={mobileLinkClass}
                  >
                    {name}
                  </Link>
                ))}
              </div>

              <Link
                to="/pricing"
                onClick={closeMobileMenu}
                className={mobilePricingClass}
              >
                Pricing
              </Link>

              <div>
                <p className={mobileSectionTitleClass}>Resources</p>
                {resources.map(([name, path]) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={closeMobileMenu}
                    className={mobileLinkClass}
                  >
                    {name}
                  </Link>
                ))}
              </div>

              {/* Mobile theme toggle */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm text-[#d7cfe0]">
                  Appearance
                </span>

                <div className="flex items-center gap-1 rounded-full border border-[#624078] p-1">
                  <button
                    type="button"
                    onClick={() => setDarkMode(false)}
                    aria-label="Switch to light mode"
                    aria-pressed={!darkMode}
                    className={`grid h-9 w-9 place-items-center rounded-full ${
                      !darkMode
                        ? 'bg-white text-orange-500'
                        : 'text-[#a99bb9]'
                    }`}
                  >
                    <Sun size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDarkMode(true)}
                    aria-label="Switch to dark mode"
                    aria-pressed={darkMode}
                    className={`grid h-9 w-9 place-items-center rounded-full ${
                      darkMode
                        ? 'bg-white text-[#21172b]'
                        : 'text-[#a99bb9]'
                    }`}
                  >
                    <Moon size={17} />
                  </button>
                </div>
              </div>

              {/* Mobile account actions */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="rounded-xl border border-white/20 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="rounded-xl bg-[#7029e5] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#812ff5]"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}