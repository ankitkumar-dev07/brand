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

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#eee9f2] bg-white/90 backdrop-blur">
      <div className="container-x h-[74px] flex items-center justify-between">

        <Link to="/">
          <Logo />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] text-[#6f667b]">

          {/* PRODUCTS */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1"
              onClick={() => setProductsOpen(!productsOpen)}
            >
              Products
              <ChevronDown size={16} />
            </button>

            {productsOpen && (
              <div className="absolute left-0 top-full pt-3">
                <div className="w-60 rounded-xl border border-[#eee9f2] bg-white p-2 shadow-soft">

                  {products.map(([name, path]) => (
                    <Link
                      key={path}
                      to={path}
                      className="block rounded-lg px-4 py-3 text-sm text-[#6f667b] hover:bg-[#f8f5fb] hover:text-[#171322]"
                      onClick={() => setProductsOpen(false)}
                    >
                      {name}
                    </Link>
                  ))}

                </div>
              </div>
            )}
          </div>

          {/* SOLUTIONS */}
          <Link
            to="/solutions"
            className={
              loc.pathname === '/solutions'
                ? 'text-[#171322] font-semibold'
                : ''
            }
          >
            Solutions
          </Link>

          {/* PRICING */}
          <Link
            to="/pricing"
            className={
              loc.pathname === '/pricing'
                ? 'text-[#171322] font-semibold'
                : ''
            }
          >
            Pricing
          </Link>

          {/* RESOURCES */}
          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1"
              onClick={() => setResourcesOpen(!resourcesOpen)}
            >
              Resources
              <ChevronDown size={16} />
            </button>

            {resourcesOpen && (
              <div className="absolute right-0 top-full pt-3">
                <div className="w-60 rounded-xl border border-[#eee9f2] bg-white p-2 shadow-soft">

                  {resources.map(([name, path]) => (
                    <Link
                      key={path}
                      to={path}
                      className="block rounded-lg px-4 py-3 text-sm text-[#6f667b] hover:bg-[#f8f5fb] hover:text-[#171322]"
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

        {/* RIGHT */}
        <div className="hidden lg:flex items-center gap-3">

          <Link
            to="/login"
            className="text-sm font-semibold"
          >
            Log in
          </Link>

          {/* THEME */}
          <button
            type="button"
            onClick={toggleTheme}
            title={darkMode ? 'Light theme' : 'Dark theme'}
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
                  darkMode
                    ? 'text-[#81758f]'
                    : 'text-[#FF8A00]'
                }
              />
            </span>

            <span className="relative z-10 flex w-1/2 items-center justify-center">
              <Moon
                size={15}
                className={
                  darkMode
                    ? 'text-white'
                    : 'text-[#81758f]'
                }
              />
            </span>
          </button>

          <Link
            to="/register"
            className="btn btn-primary text-sm"
          >
            Sign up
          </Link>

        </div>

        {/* MOBILE */}
        <button
          className="lg:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {open && (
        <div className="lg:hidden border-t bg-white px-5 py-4 space-y-2">

          {/* PRODUCTS */}
          <div>
            <button
              className="flex w-full items-center justify-between rounded-lg px-3 py-3"
              onClick={() => setProductsOpen(!productsOpen)}
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
                    onClick={() => {
                      setOpen(false);
                      setProductsOpen(false);
                    }}
                    className="block rounded-lg px-3 py-2 text-sm text-[#756b86]"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/solutions"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-3"
          >
            Solutions
          </Link>

          <Link
            to="/pricing"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-3"
          >
            Pricing
          </Link>

          {/* RESOURCES */}
          <div>
            <button
              className="flex w-full items-center justify-between rounded-lg px-3 py-3"
              onClick={() => setResourcesOpen(!resourcesOpen)}
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
                    onClick={() => {
                      setOpen(false);
                      setResourcesOpen(false);
                    }}
                    className="block rounded-lg px-3 py-2 text-sm text-[#756b86]"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="block px-3 py-3"
          >
            Log in
          </Link>

          {/* MOBILE THEME */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-xl border border-[#e6e0ee] bg-[#faf7ff] px-4 py-3 dark:border-[#493267] dark:bg-[#1a102b]"
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