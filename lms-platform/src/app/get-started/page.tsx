import Link from "next/link";

export default function GetStartedPage() {
  return (
    <main className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden bg-[#181835]">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <pattern height="10" id="grid" patternUnits="userSpaceOnUse" width="10">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1"></path>
            </pattern>
          </defs>
          <rect fill="url(#grid)" height="100" width="100"></rect>
        </svg>
      </div>
      
      {/* Gradient Accents */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#9e4200] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#6049c5] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
      
      <section className="relative z-10 w-full max-w-[1200px] px-6 py-12 flex flex-col md:flex-row items-center gap-16">
        {/* Left Side: Editorial Content */}
        <div className="w-full md:w-1/2 space-y-8">
          <div className="inline-block px-4 py-1.5 bg-[#9e4200]/10 border border-[#9e4200]/20 rounded-full">
            <span className="text-[#ff7e31] text-xs font-bold tracking-[0.1em] uppercase">The Digital Atelier</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-tight">
            Refine Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7e31] to-[#a694ff]">Craft Today.</span>
          </h1>
          <p className="text-[#c5c3e9] text-lg md:text-xl font-light leading-relaxed max-w-md">
            Join a community of elite professionals mastering the intersection of design, technology, and strategy.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">4.9/5</div>
              <div className="text-xs text-[#c5c3e9] uppercase tracking-widest font-semibold">Student Rating</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">120+</div>
              <div className="text-xs text-[#c5c3e9] uppercase tracking-widest font-semibold">Expert Courses</div>
            </div>
          </div>
        </div>
        
        {/* Right Side: Registration Card */}
        <div className="w-full md:w-[480px]">
          <div className="bg-white rounded-lg shadow-[0_40px_60px_-15px_rgba(27,28,28,0.08)] p-8 md:p-10 border border-slate-200">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">Create Account</h2>
              <p className="text-slate-500 text-sm">Start your premium learning journey</p>
            </div>
            <form action="#" className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                <input className="w-full bg-[#f6f3f2] border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#9e4200] focus:ring-1 focus:ring-[#9e4200] transition-all" placeholder="Alex Sterling" type="text"/>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email</label>
                <input className="w-full bg-[#f6f3f2] border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#9e4200] focus:ring-1 focus:ring-[#9e4200] transition-all" placeholder="alex@baynalgroup.com" type="email"/>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
                <div className="relative">
                  <input className="w-full bg-[#f6f3f2] border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#9e4200] focus:ring-1 focus:ring-[#9e4200] transition-all" placeholder="••••••••" type="password"/>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer text-xl">visibility</span>
                </div>
              </div>
              <div className="flex items-start gap-3 py-2">
                <input className="mt-1 w-4 h-4 text-[#9e4200] bg-[#f6f3f2] border-slate-300 rounded focus:ring-[#9e4200]" id="terms" type="checkbox"/>
                <label className="text-xs text-slate-500 leading-normal" htmlFor="terms">
                  I agree to the <Link className="text-[#9e4200] font-semibold hover:underline" href="#">Terms of Service</Link> and <Link className="text-[#9e4200] font-semibold hover:underline" href="#">Privacy Policy</Link>.
                </label>
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-[#9e4200] to-[#ff7e31] text-white font-bold rounded-lg shadow-lg shadow-[#9e4200]/20 hover:translate-y-[-4px] active:scale-95 transition-all duration-300 uppercase tracking-widest text-xs" type="button">
                Join Now
              </button>
            </form>
            <div className="mt-10 pt-8 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-500">
                Already have an account? 
                <Link className="text-[#9e4200] font-bold hover:underline ml-1" href="/sign-in">Log In</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
