import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* ── WELCOME BANNER ── */}
      <section className="soft-reveal delay-1 relative overflow-hidden rounded-2xl navy-gradient text-white p-8 md:p-12 shadow-[0_20px_60px_-12px_rgba(26,26,55,0.35)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-8 w-64 h-64 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-300">Student Portal</span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mt-1">Welcome Back, Alex!</h1>
            </div>
            <p className="text-secondary-fixed-dim text-base leading-relaxed max-w-md opacity-80">
              Your journey toward mastery continues. You're performing better than <strong className="text-orange-300">84%</strong> of peers this week.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/courses" className="inline-flex items-center gap-2 kinetic-gradient px-7 py-3.5 rounded-lg text-sm font-bold uppercase tracking-widest shadow-lg hover:translate-y-[-3px] active:scale-95 transition-all duration-200">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                Resume Next Lesson
              </Link>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span>Next Live: <strong className="text-white/80">Tomorrow, 10 AM</strong></span>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
              <span className="material-symbols-outlined text-orange-300 text-[16px]">play_lesson</span>
              <span className="text-xs font-semibold text-white/80">Continuing: <span className="text-white font-bold">Full-Stack Mastery — Module 3</span></span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10"/>
                <circle cx="60" cy="60" r="50" fill="none" stroke="#FF7E31" strokeWidth="10" strokeDasharray="314" strokeDashoffset="113" strokeLinecap="round" className="donut-ring"/>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black">64%</span>
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Complete</span>
              </div>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest opacity-60">Overall Progress</p>
          </div>
        </div>
      </section>

      {/* ── KPI STATS ROW ── */}
      <section className="soft-reveal delay-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="stat-card">
          <div className="flex justify-between items-start mb-3">
            <span className="material-symbols-outlined text-3xl text-slate-400">auto_stories</span>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">+2 this month</span>
          </div>
          <div className="text-4xl font-black text-slate-900 tracking-tighter">12</div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mt-1">Enrolled Courses</div>
        </div>
        <div className="stat-card">
          <div className="flex justify-between items-start mb-3">
            <span className="material-symbols-outlined text-3xl text-slate-400">verified</span>
            <span className="text-[10px] font-bold bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full">Level 4 Elite</span>
          </div>
          <div className="text-4xl font-black text-slate-900 tracking-tighter">08</div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mt-1">Completed</div>
        </div>
        <div className="stat-card">
          <div className="flex justify-between items-start mb-3">
            <span className="material-symbols-outlined text-3xl text-slate-400">notification_important</span>
            <span className="text-[10px] font-bold bg-red-50 text-red-700 px-2.5 py-1 rounded-full">Action Needed</span>
          </div>
          <div className="text-4xl font-black text-slate-900 tracking-tighter">04</div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mt-1">Upcoming Deadlines</div>
        </div>
      </section>

      {/* ── MY COURSES ── */}
      <section className="soft-reveal delay-3 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">My Courses</h2>
            <div className="h-1 w-10 bg-orange-500 rounded-full mt-1.5"></div>
          </div>
          <Link href="/courses" className="text-xs font-bold uppercase tracking-widest text-orange-600 hover:underline underline-offset-4 transition-all">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Card 1 */}
          <div className="course-card bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="h-40 overflow-hidden relative">
              <Image fill unoptimized className="object-cover transition-transform duration-500 hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAPjBKKt060ufdlG9c7zonON2dLuH7SXxRJlV9wleWdZIBSMS5Xf0gr0-Q-cOEgq8w1DL6N7XrqC1OcfYREZ_WYUx9t1Z-vp3lR_aAMhXFEQwlQP4SmZ4mrLQe6L5MG_CyorXme1pNn4QOScEE5cQpLZtaOJblfckA-khmdqSuwBlhMdbJRy4xZbMxXqXmfU4eegbExGgGPY2IKgZlF2qYQkFx216LXGYZszDpmm1trzKTUkwJ6FV7PRBAmubOrz4-BEJzUFMChKo" alt="Machine Learning"/>
              <div className="absolute top-3 left-3 bg-navy-deep/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Advanced</div>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 leading-tight">Machine Learning Bootcamp</h3>
              <p className="text-[11px] text-slate-500 line-clamp-2">Neural nets, transformers, and production ML deployments.</p>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progress</span>
                  <span className="text-[11px] font-black text-orange-600">65%</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: "65%" }}></div></div>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-50">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-slate-400">play_circle</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Module 7 of 12</span>
                </div>
                <button className="text-orange-600 font-black text-[10px] uppercase tracking-widest hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Continue <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="course-card bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="h-40 overflow-hidden relative">
              <Image fill unoptimized className="object-cover transition-transform duration-500 hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKG_av0mECtEAFFouclqEzi1PYslLOkXdrxq5p6g6SE5iBQn0Owta2AJWLiPmK-tGAkgCu0cUn9qNeAhHUH2AKs4TOipqoagjEQgE0bYDJ6jEmzPFW0w0qAtpCqNnVQY3mjZX7OSLlpkxY3QIUyMaI2dSFwHOMxz_ErzmupoeNkoZYavzYOmt_hpERK26QpcXmSsLP86P9mkACCYCrSyHzFLDK9-i-dJ4yNt1TnY6vYdToi2sKYq9t2afqSr0SHozOAUfscpa0SgA" alt="UI/UX Design"/>
              <div className="absolute top-3 left-3 bg-navy-deep/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Intermediate</div>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 leading-tight">UI/UX Advanced Design</h3>
              <p className="text-[11px] text-slate-500 line-clamp-2">Editorial approaches to premium digital experience design.</p>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progress</span>
                  <span className="text-[11px] font-black text-orange-600">20%</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: "20%" }}></div></div>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-50">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-slate-400">play_circle</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Module 3 of 15</span>
                </div>
                <button className="text-orange-600 font-black text-[10px] uppercase tracking-widest hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Continue <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="course-card bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="h-40 overflow-hidden relative">
              <Image fill unoptimized className="object-cover transition-transform duration-500 hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVJgAMnXnVDLZtiYG7RLZK3gV4ak2sAAaILiuqJj4zvgTA-SC809PM9M8VuQwbOSgWJa2fvQUezxvEI3r5KTluJ4vCQgCrjepcpbiQ_F1xHeEciPs0U0Os_ZHMhLddKRgcxdy7pfPLSFXga1Xm-tweUArGfdGNjiR6fy04mCTe_U8RaTTBadqFSrRn91clqPn_LvQdz9NvuWGRAtHqSs1aNTMamwPXE9GmIvdNx1jhCR0Yl0ggGAOEMMIk_D13TayL3O22uX6E9s0" alt="Full Stack"/>
              <div className="absolute top-3 left-3 bg-navy-deep/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Advanced</div>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 leading-tight">Full-Stack Architecture</h3>
              <p className="text-[11px] text-slate-500 line-clamp-2">Master distributed systems, APIs, and scalable deployments.</p>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progress</span>
                  <span className="text-[11px] font-black text-orange-600">78%</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: "78%" }}></div></div>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-50">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-slate-400">play_circle</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Module 9 of 14</span>
                </div>
                <button className="text-orange-600 font-black text-[10px] uppercase tracking-widest hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Continue <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="course-card bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="h-40 overflow-hidden relative">
              <Image fill unoptimized className="object-cover transition-transform duration-500 hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQgujRW79L40vULax98e5F7LHG3mvkGp5qSnBqIyOPUbY9cJubl8Lx8fw1XWQYX0WGbinOJQs-mYui0KiAS0oViGEOeyxSqilsE4WA_ZOr0QbWLlRIoniNQkSTDGMUo0r2duKy5eGMNVg4V7bCn1V456gc7u-GtzKmm5KfcRMzOa3xc9d73B6n2IlqFFDWU6kVwOU1jEhF2lzIzZ8CL4jdwKclyeecW9MycFEcprubLn-Lo0oq42WEQo2FKBXSgy9C34EnLJSMf7M" alt="Business"/>
              <div className="absolute top-3 left-3 bg-navy-deep/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Intermediate</div>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 leading-tight">Strategic Business Management</h3>
              <p className="text-[11px] text-slate-500 line-clamp-2">Executive-level frameworks for scaling and decision-making.</p>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progress</span>
                  <span className="text-[11px] font-black text-orange-600">40%</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: "40%" }}></div></div>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-50">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-slate-400">play_circle</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Module 4 of 10</span>
                </div>
                <button className="text-orange-600 font-black text-[10px] uppercase tracking-widest hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Continue <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── MIDDLE ROW: Progress Overview + Upcoming & Announcements ── */}
      <div className="soft-reveal delay-4 grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

        {/* Progress Overview (spans 2/3) */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-6">
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">Progress Overview</h2>
            <div className="h-1 w-8 bg-orange-500 rounded-full mt-1.5"></div>
          </div>
          <div className="grid grid-cols-3 gap-6">

            {/* Donut 1 */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f0eded" strokeWidth="9"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#FF7E31" strokeWidth="9" strokeDasharray="251.2" strokeDashoffset="90.4" strokeLinecap="round" className="donut-ring"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-slate-900">64%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-700">Overall</p>
                <p className="text-[10px] text-slate-500 mt-0.5">All 12 courses</p>
              </div>
            </div>

            {/* Donut 2 */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f0eded" strokeWidth="9"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#9e4200" strokeWidth="9" strokeDasharray="251.2" strokeDashoffset="138.2" strokeLinecap="round" className="donut-ring"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-slate-900">45%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-700">This Week</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Weekly goal</p>
              </div>
            </div>

            {/* Donut 3 */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f0eded" strokeWidth="9"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1A1A37" strokeWidth="9" strokeDasharray="251.2" strokeDashoffset="50.2" strokeLinecap="round" className="donut-ring"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-slate-900">80%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-700">Certifications</p>
                <p className="text-[10px] text-slate-500 mt-0.5">8 of 10 earned</p>
              </div>
            </div>
          </div>

          {/* Learning streak */}
          <div className="bg-surface-container-low rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-orange-600 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">14-Day Learning Streak 🔥</p>
                <p className="text-[11px] text-slate-500">Keep it up — you're on a roll!</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-[9px] font-black">M</div>
              <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-[9px] font-black">T</div>
              <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-[9px] font-black">W</div>
              <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-[9px] font-black">T</div>
              <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-[9px] font-black">F</div>
              <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-[9px] font-black">S</div>
              <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-[9px] font-black">S</div>
            </div>
          </div>
        </div>

        {/* Upcoming & Announcements (1/3) */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-6">
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">Upcoming</h2>
            <div className="h-1 w-8 bg-orange-500 rounded-full mt-1.5"></div>
          </div>

          {/* Deadlines */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-orange-600 mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              Deadlines
            </p>
            <div className="space-y-0">
              <div className="announce-item">
                <p className="text-xs font-bold text-slate-800">ML Bootcamp — Project 3</p>
                <p className="text-[10px] text-orange-600 font-semibold mt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">event</span> Due Tomorrow, 11:59 PM
                </p>
              </div>
              <div className="announce-item">
                <p className="text-xs font-bold text-slate-800">UI/UX Design Quiz</p>
                <p className="text-[10px] text-orange-500 font-semibold mt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">event</span> Due in 3 days
                </p>
              </div>
              <div className="announce-item">
                <p className="text-xs font-bold text-slate-800">Business Case Study</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">event</span> Due in 5 days
                </p>
              </div>
            </div>
          </div>

          {/* Live Sessions */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>live_tv</span>
              Live Sessions
            </p>
            <div className="space-y-0">
              <div className="announce-item flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">ML Office Hours</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Today — 3:00 PM PST</p>
                </div>
                <span className="live-badge"><span className="live-dot"></span>LIVE</span>
              </div>
              <div className="announce-item flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">UX Deep Dive Q&amp;A</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Tomorrow — 10:00 AM PST</p>
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">SOON</span>
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A37] mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
              Announcements
            </p>
            <div className="space-y-0">
              <div className="announce-item">
                <p className="text-xs font-bold text-slate-800">New: Advanced Python Module</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Added to ML Bootcamp — Week 8</p>
              </div>
              <div className="announce-item">
                <p className="text-xs font-bold text-slate-800">Certificate Update</p>
                <p className="text-[10px] text-slate-500 mt-0.5">New verifiable credential format live</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ACHIEVEMENT BADGES ── */}
      <section className="soft-reveal delay-5 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Achievement Badges</h2>
            <div className="h-1 w-10 bg-orange-500 rounded-full mt-1.5"></div>
          </div>
          <Link href="#" className="text-xs font-bold uppercase tracking-widest text-orange-600 hover:underline underline-offset-4">View All</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">

          <div className="badge-card">
            <div className="w-16 h-16 mx-auto rounded-full navy-gradient flex items-center justify-center mb-4 shadow-lg">
              <span className="material-symbols-outlined text-3xl text-orange-300" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            </div>
            <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Elite Scholar</p>
            <p className="text-[10px] text-slate-500 mt-1">Completed 8 courses</p>
            <div className="mt-3 inline-block bg-orange-50 text-orange-600 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Earned</div>
          </div>

          <div className="badge-card">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg">
              <span className="material-symbols-outlined text-3xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            </div>
            <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Streak Master</p>
            <p className="text-[10px] text-slate-500 mt-1">14-day learning streak</p>
            <div className="mt-3 inline-block bg-emerald-50 text-emerald-600 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Earned</div>
          </div>

          <div className="badge-card">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg">
              <span className="material-symbols-outlined text-3xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>code</span>
            </div>
            <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Code Architect</p>
            <p className="text-[10px] text-slate-500 mt-1">Top 10% in Full-Stack</p>
            <div className="mt-3 inline-block bg-purple-50 text-purple-600 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Earned</div>
          </div>

          <div className="badge-card opacity-60">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-200 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-3xl text-slate-400">lock</span>
            </div>
            <p className="text-xs font-black text-slate-700 uppercase tracking-tight">Grandmaster</p>
            <p className="text-[10px] text-slate-400 mt-1">Complete all 12 courses</p>
            <div className="mt-3">
              <div className="progress-bar-bg mx-auto max-w-[80px]"><div className="progress-bar-fill" style={{ width: "67%" }}></div></div>
              <p className="text-[9px] text-slate-400 mt-1">8 / 12 done</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── MY CERTIFICATES ── */}
      <section className="soft-reveal delay-6 space-y-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">My Certificates</h2>
          <div className="h-1 w-10 bg-orange-500 rounded-full mt-1.5"></div>
        </div>
        <div className="space-y-4">

          <div className="cert-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl navy-gradient flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-orange-300 text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Ethical Hacking Fundamentals</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Completed Jan 14, 2025 · Instructor: Silas Grey</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Verified · LinkedIn Ready</span>
                </div>
              </div>
            </div>
            <Link href="/certificate" className="flex items-center gap-2 kinetic-gradient text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md hover:translate-y-[-2px] active:scale-95 transition-all flex-shrink-0">
              <span className="material-symbols-outlined text-[16px]">download</span>
              Download
            </Link>
          </div>

          <div className="cert-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl navy-gradient flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-orange-300 text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Advanced UI Design Mastery</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Completed Feb 28, 2025 · Instructor: Sarah Jenkins</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Verified · LinkedIn Ready</span>
                </div>
              </div>
            </div>
            <Link href="/certificate" className="flex items-center gap-2 kinetic-gradient text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md hover:translate-y-[-2px] active:scale-95 transition-all flex-shrink-0">
              <span className="material-symbols-outlined text-[16px]">download</span>
              Download
            </Link>
          </div>

          <div className="cert-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl navy-gradient flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-orange-300 text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Digital Presence &amp; Branding</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Completed Mar 10, 2025 · Instructor: Julian Vane</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Verified · LinkedIn Ready</span>
                </div>
              </div>
            </div>
            <Link href="/certificate" className="flex items-center gap-2 kinetic-gradient text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md hover:translate-y-[-2px] active:scale-95 transition-all flex-shrink-0">
              <span className="material-symbols-outlined text-[16px]">download</span>
              Download
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
