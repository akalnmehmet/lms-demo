'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // Hide Navbar on specific routes
  if (
    pathname === '/sign-in' || 
    pathname === '/get-started' || 
    pathname === '/course-player' ||
    pathname.includes('/learn')
  ) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 glass-nav border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm dark:shadow-none">
      <div className="flex justify-between items-center h-20 px-8 w-full max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-12">
          <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Baynal Group LMS</span>
          <div className="hidden md:flex gap-8 tracking-tight text-sm font-medium">
            {[
              { name: 'Home', href: '/' },
              { name: 'Courses', href: '/courses' },
              { name: 'Dashboard', href: '/dashboard' },
              { name: 'Contact', href: '/contact' },
            ].map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={
                    isActive
                      ? "text-orange-600 dark:text-orange-500 font-bold border-b-2 border-orange-600 hover:translate-y-[-2px] transition-all duration-200"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:translate-y-[-2px] transition-all duration-200"
                  }
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="tracking-tight text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200">
            Support
          </button>
          <Link href="/sign-in" className="tracking-tight text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:translate-y-[-2px] transition-all duration-200" style={{ textDecoration: 'none' }}>
            Sign In
          </Link>
          <Link href="/get-started" className="bg-gradient-to-br from-[#9e4200] to-[#ff7e31] text-white px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider hover:translate-y-[-2px] active:scale-95 transition-all duration-200 shadow-md" style={{ textDecoration: 'none' }}>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
