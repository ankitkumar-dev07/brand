
import { Link } from 'react-router-dom';

const footerColumns = [
  {
    title: 'Products',
    links: [
      { label: 'Tool Marketplace', to: '/products/tool-marketplace' },
      { label: 'Growth Analytics', to: '/products/growth-analytics' },
      { label: 'Agency Cliq', to: '/products/agency-cliq' },
      { label: 'Growth Insights', to: '/products/growth-insights' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Marketers', to: '/solutions' },
      { label: 'Individuals', to: '/solutions' },
      { label: 'Enterprise / Agencies', to: '/solutions' },
      { label: 'Students / Universities', to: '/solutions' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'About Us', to: '/blog' },
      { label: 'Contact Us', to: '/blog' },
      { label: 'Jobs / Hiring', to: '/blog' },
      { label: 'Blog / Case Studies', to: '/support' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Cookie Policy', to: '/privacy' },
      { label: 'Cookie Preferences', to: '/privacy' },
      { label: 'Security', to: '/support' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#eee9f2] bg-gradient-to-r from-[#f3e8ff] via-[#fff7fc] to-[#fff0df]">
      <div className="container-x py-14 md:py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 md:gap-x-10">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-5 text-base font-semibold text-[#292536]">
                {column.title}
              </h4>

              <nav className="space-y-5">
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="group block w-fit text-sm md:text-base leading-6 text-[#756b86] transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-[#6D28D9] group-hover:via-[#c65bd4] group-hover:to-[#FF8A00] group-hover:bg-clip-text group-hover:text-transparent">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}