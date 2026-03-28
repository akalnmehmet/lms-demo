import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex h-[calc(100vh-5rem)] w-72 flex-col fixed left-0 top-20 bg-white border-r border-slate-200/50 p-6 gap-5 z-40 sidebar-scroll">
      {/* User avatar */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-full navy-gradient flex items-center justify-center text-white font-black text-sm flex-shrink-0">A</div>
        <div>
          <p className="text-sm font-bold text-slate-900 leading-tight">Alex Sterling</p>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Premium Learning</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 flex-grow">
        <Link className="side-link active" href="/dashboard">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          Overview
        </Link>
        <Link className="side-link" href="/my-courses">
          <span className="material-symbols-outlined text-[20px]">school</span>
          My Courses
        </Link>
        <Link className="side-link" href="/my-certificates">
          <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
          My Certificates
        </Link>
        <Link className="side-link" href="#">
          <span className="material-symbols-outlined text-[20px]">military_tech</span>
          Achievements
        </Link>
        <Link className="side-link" href="/account">
          <span className="material-symbols-outlined text-[20px]">settings</span>
          Settings
        </Link>
      </nav>

      {/* Upgrade card */}
      <div className="mt-auto">
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-orange-800 uppercase tracking-tighter mb-1">Pro Plan</p>
          <p className="text-[11px] text-orange-700/70 mb-3">Unlock all masterclasses &amp; certificates.</p>
          <button className="w-full py-2 kinetic-gradient text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">Upgrade to Pro</button>
        </div>
        <div className="flex flex-col gap-1 border-t border-slate-100 pt-3">
          <Link className="side-link" href="#"><span className="material-symbols-outlined text-[18px]">help_outline</span> Help</Link>
          <Link className="side-link" href="#"><span className="material-symbols-outlined text-[18px]">logout</span> Logout</Link>
        </div>
      </div>
    </aside>
  );
}
