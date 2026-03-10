'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Candidates', href: '/candidates' },
    { label: 'Issues', href: '/issues' },
    { label: 'Promises', href: '/promises' },
    { label: 'Manifestos', href: '/manifestos/compare' },
    { label: 'Elections', href: '/elections' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F1A]/80 backdrop-blur-md border-b border-white/5 h-16 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold orange-text-gradient tracking-tight">
          eLoktantra
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? 'text-primary' : 'text-gray-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 rounded-full bg-primary hover:bg-accent text-white text-sm font-semibold transition-all shadow-lg shadow-primary/20"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
