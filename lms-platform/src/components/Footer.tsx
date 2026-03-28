'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Immersive öğrenme sayfaları veya auth sayfalarında Footer'ı gizle
  if (
    pathname === '/sign-in' || 
    pathname === '/get-started' || 
    pathname === '/course-player' ||
    String(pathname).includes('/learn')
  ) {
    return null;
  }

  return (
    <footer className="bg-[#1A1A37] text-slate-300 py-16 px-8 border-t border-slate-800 soft-reveal">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
            Baynal Group LMS
          </h3>
          <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
            A curated editorial learning experience designed for high-end mastery. Elevate your skills to the elite level.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all text-slate-400" aria-label="Social">
              <span className="material-symbols-outlined text-[18px]">public</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all text-slate-400" aria-label="Social">
              <span className="material-symbols-outlined text-[18px]">share</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all text-slate-400" aria-label="Social">
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </a>
          </div>
        </div>

        {/* Links: Platform */}
        <div>
          <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6">Platform</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="/courses" className="hover:text-[#ff7e31] transition-colors">Masterclasses</Link></li>
            <li><Link href="#" className="hover:text-[#ff7e31] transition-colors">Elite Mentors</Link></li>
            <li><Link href="#" className="hover:text-[#ff7e31] transition-colors">Pricing & Plans</Link></li>
            <li><Link href="#" className="hover:text-[#ff7e31] transition-colors">Our Methodology</Link></li>
          </ul>
        </div>

        {/* Links: Resources */}
        <div>
          <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6">Kaynaklar</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="#" className="hover:text-[#ff7e31] transition-colors">Editorial Blog</Link></li>
            <li><Link href="#" className="hover:text-[#ff7e31] transition-colors">Study Guides</Link></li>
            <li><Link href="#" className="hover:text-[#ff7e31] transition-colors">Help Center</Link></li>
            <li><Link href="#" className="hover:text-[#ff7e31] transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6">Bültana Katılın</h4>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
            Yeni çıkan elit eğitimlerden ilk sizin haberiniz olsun. Seçkin ağımıza katılın.
          </p>
          <div className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="E-posta adresi" 
              className="bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-[#ff7e31] transition-colors"
            />
            <button 
              type="button" 
              className="bg-gradient-to-r from-[#9e4200] to-[#ff7e31] text-white px-4 py-3 rounded-lg text-xs font-bold tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-transform"
            >
              Abone Ol
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="max-w-screen-2xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
        <p>© {new Date().getFullYear()} Baynal Group LMS. Tüm hakları saklıdır.</p>
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
          <Link href="#" className="hover:text-white transition-colors">Kullanım Koşulları</Link>
          <Link href="#" className="hover:text-white transition-colors">Çerez Politikası</Link>
        </div>
      </div>
    </footer>
  );
}
