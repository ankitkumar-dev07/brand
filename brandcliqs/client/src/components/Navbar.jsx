
import { Link, useLocation } from 'react-router-dom';

import {
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
} from 'lucide-react';

import { useEffect, useState } from 'react';
import Logo from './Logo';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('brandcliqs-theme') === 'dark';
  });

  const loc = useLocation();

  const products = [
    ['Tool Marketplace', '/products/tool-marketplace'],
    ['Growth Analytics', '/products/growth-analytics'],
    ['Agency Cliq', '/products/agency-cliq'],
    ['Growth Insights', '/products/growth-insights'],
  ];

  // Updated Use Cases route
  const solutions = [
    ['Solutions — For', '/solutions'],
    ['Solutions — Use Cases', '/solutions/use-cases'],
  ];

  const resources = [
    ['About Us', '/about'],
    ['Contact Us', '/support'],
    ['Jobs / Hiring', '/jobs'],
    ['Blog — BrandCliqs', '/blog'],
  ];

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('brandcliqs-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('brandcliqs-theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
    setSolutionsOpen(false);
    setResourcesOpen(false);
  }, [loc.pathname]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const dropdownClass =
    'block rounded-lg px-4 py-3 text-sm text-[#6f667b] ' +
    'hover:bg-[#f8f5fb] hover:text-[#6D28D9] ' +
    'dark:text-[#d2c7df] dark:hover:bg-[#352346] dark:hover:text-white';

  const activeLinkClass =
    'text-[#6D28D9] font-semibold dark:text-[#a78bfa]';

  return (
    <header className="sticky top-0 z-50 border-b border-[#eee9f2] bg-white/90 backdrop-blur dark:border-[#332344] dark:bg-[#1d1426]/95">
      <div className="container-x h-[74px] flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" aria-label="BrandCliqs Home">
          <Logo />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] text-[#6f667b] dark:text-[#d2c7df]">
          {/* PRODUCTS DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              type="button"
              aria-expanded={productsOpen}
              className="flex items-center gap-1 hover:text-[#6D28D9] dark:hover:text-[#a78bfa]"
              onClick={() => setProductsOpen((prev) => !prev)}
            >
              Products
              <ChevronDown size={16} />
            </button>

            {productsOpen && (
              <div className="absolute left-0 top-full pt-3">
                <div className="w-60 rounded-xl border border-[#eee9f2] bg-white p-2 shadow-soft dark:border-[#493267] dark:bg-[#241632]">
                  {products.map(([name, path]) => (
                    <Link
                      key={path}
                      to={path}
                      className={dropdownClass}
                      onClick={() => setProductsOpen(false)}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SOLUTIONS DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              type="button"
              aria-expanded={solutionsOpen}
              className={
                'flex items-center gap-1 hover:text-[#6D28D9] dark:hover:text-[#a78bfa] ' +
                (loc.pathname.startsWith('/solutions')
                  ? activeLinkClass
                  : '')
              }
              onClick={() => setSolutionsOpen((prev) => !prev)}
            >
              Solutions
              <ChevronDown size={16} />
            </button>

            {solutionsOpen && (
              <div className="absolute left-0 top-full pt-3">
                <div className="w-64 rounded-xl border border-[#eee9f2] bg-white p-2 shadow-soft dark:border-[#493267] dark:bg-[#241632]">
                  {solutions.map(([name, path], index) => (
                    <Link
                      key={`${name}-${index}`}
                      to={path}
                      className={dropdownClass}
                      onClick={() => setSolutionsOpen(false)}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* PRICING */}
          <Link
            to="/pricing"
            className={
              loc.pathname === '/pricing'
                ? activeLinkClass
                : 'hover:text-[#6D28D9] dark:hover:text-[#a78bfa]'
            }
          >
            Pricing
          </Link>

          {/* RESOURCES DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={resourcesOpen}
              className="flex items-center gap-1 hover:text-[#6D28D9] dark:hover:text-[#a78bfa]"
              onClick={() => setResourcesOpen((prev) => !prev)}
            >
              Resources
              <ChevronDown size={16} />
            </button>

            {resourcesOpen && (
              <div className="absolute right-0 top-full pt-3">
                <div className="w-60 rounded-xl border border-[#eee9f2] bg-white p-2 shadow-soft dark:border-[#493267] dark:bg-[#241632]">
                  {resources.map(([name, path]) => (
                    <Link
                      key={path}
                      to={path}
                      className={dropdownClass}
                      onClick={() => setResourcesOpen(false)}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* DESKTOP RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-semibold text-[#171322] hover:text-[#6D28D9] transition-colors dark:text-white dark:hover:text-[#c4b5fd]"
          >
            Log in
          </Link>

          {/* THEME TOGGLE */}
          <button
            type="button"
            onClick={toggleTheme}
            title={darkMode ? 'Light theme' : 'Dark theme'}
            aria-label={
              darkMode
                ? 'Switch to light theme'
                : 'Switch to dark theme'
            }
            className="relative flex h-10 w-[76px] items-center rounded-full border border-[#e6e0ee] bg-[#faf7ff] p-1 shadow-sm dark:border-[#493267] dark:bg-[#1a102b]"
          >
            <span
              className={
                'absolute top-1 h-8 w-8 rounded-full shadow-md transition-all duration-300 ' +
                (darkMode
                  ? 'translate-x-9 bg-[#6D28D9]'
                  : 'translate-x-0 bg-white')
              }
            />

            <span className="relative z-10 flex w-1/2 items-center justify-center">
              <Sun
                size={15}
                className={
                  darkMode ? 'text-[#81758f]' : 'text-[#FF8A00]'
                }
              />
            </span>

            <span className="relative z-10 flex w-1/2 items-center justify-center">
              <Moon
                size={15}
                className={
                  darkMode ? 'text-white' : 'text-[#81758f]'
                }
              />
            </span>
          </button>

          <Link to="/register" className="btn btn-primary text-sm">
            Sign up
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="lg:hidden p-2 text-[#171322] dark:text-white"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden border-t border-[#eee9f2] bg-white px-5 py-4 space-y-2 dark:border-[#332344] dark:bg-[#1d1426]">
          {/* MOBILE PRODUCTS */}
          <div>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-[#171322] dark:text-white"
              onClick={() => setProductsOpen((prev) => !prev)}
            >
              Products
              <ChevronDown size={16} />
            </button>

            {productsOpen && (
              <div className="pl-3 space-y-1">
                {products.map(([name, path]) => (
                  <Link
                    key={path}
                    to={path}
                    className={dropdownClass}
                    onClick={() => setOpen(false)}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* MOBILE SOLUTIONS */}
          <div>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-[#171322] dark:text-white"
              onClick={() => setSolutionsOpen((prev) => !prev)}
            >
              Solutions
              <ChevronDown size={16} />
            </button>

            {solutionsOpen && (
              <div className="pl-3 space-y-1">
                {solutions.map(([name, path], index) => (
                  <Link
                    key={`${name}-${index}`}
                    to={path}
                    className={dropdownClass}
                    onClick={() => setOpen(false)}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* MOBILE PRICING */}
          <Link
            to="/pricing"
            className="block rounded-lg px-3 py-3 text-[#171322] dark:text-white"
            onClick={() => setOpen(false)}
          >
            Pricing
          </Link>

          {/* MOBILE RESOURCES */}
          <div>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-[#171322] dark:text-white"
              onClick={() => setResourcesOpen((prev) => !prev)}
            >
              Resources
              <ChevronDown size={16} />
            </button>

            {resourcesOpen && (
              <div className="pl-3 space-y-1">
                {resources.map(([name, path]) => (
                  <Link
                    key={path}
                    to={path}
                    className={dropdownClass}
                    onClick={() => setOpen(false)}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* MOBILE LOGIN */}
          <Link
            to="/login"
            className="block rounded-lg px-3 py-3 font-semibold text-[#171322] hover:text-[#6D28D9] dark:text-white dark:hover:text-[#c4b5fd]"
            onClick={() => setOpen(false)}
          >
            Log in
          </Link>

          {/* MOBILE THEME */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-xl border border-[#e6e0ee] bg-[#faf7ff] px-4 py-3 dark:border-[#493267] dark:bg-[#1a102b] dark:text-white"
          >
            <span className="font-medium">
              {darkMode ? 'Dark theme' : 'Light theme'}
            </span>

            {darkMode ? (
              <Moon size={18} className="text-[#a78bfa]" />
            ) : (
              <Sun size={18} className="text-[#FF8A00]" />
            )}
          </button>

          {/* MOBILE SIGN UP */}
          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="btn btn-primary w-full"
          >
            Sign up
          </Link>
        </div>
      )}
    </header>
  );
}
