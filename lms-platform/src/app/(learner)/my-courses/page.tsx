"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function MyCourses() {
  const [activeTab, setActiveTab] = useState<"inprogress" | "completed" | "archived">("inprogress");

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* ── PAGE HEADER ── */}
      <div className="soft-reveal delay-1 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-1">Student Portal</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">My Learning</h1>
          <div className="h-1 w-10 bg-orange-500 rounded-full mt-2"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-500 font-medium shadow-sm">
            <span className="material-symbols-outlined text-[18px] text-slate-400">search</span>
            <input type="text" placeholder="Search your courses..." className="outline-none border-none bg-transparent text-sm font-medium text-slate-700 placeholder:text-slate-400 w-40"/>
          </div>
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 outline-none shadow-sm cursor-pointer">
            <option>Sort: Recent</option>
            <option>Sort: Progress</option>
            <option>Sort: A–Z</option>
          </select>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div className="soft-reveal delay-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl px-5 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-orange-500 text-[20px]">auto_stories</span>
          </div>
          <div>
            <p className="text-xl font-black text-slate-900">12</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Enrolled</p>
          </div>
        </div>
        <div className="bg-white rounded-xl px-5 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-emerald-500 text-[20px]">verified</span>
          </div>
          <div>
            <p className="text-xl font-black text-slate-900">8</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Completed</p>
          </div>
        </div>
        <div className="bg-white rounded-xl px-5 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-blue-500 text-[20px]">schedule</span>
          </div>
          <div>
            <p className="text-xl font-black text-slate-900">4</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">In Progress</p>
          </div>
        </div>
        <div className="bg-white rounded-xl px-5 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-purple-500 text-[20px]">workspace_premium</span>
          </div>
          <div>
            <p className="text-xl font-black text-slate-900">5</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Certificates</p>
          </div>
        </div>
      </div>

      {/* ── TABBED COURSE GRID ── */}
      <section className="soft-reveal delay-3">

        {/* Tab bar */}
        <div className="flex items-center gap-8 border-b border-slate-200 mb-7" id="tabBar">
          <button 
            className={`tab-btn ${activeTab === 'inprogress' ? 'active' : ''}`} 
            onClick={() => setActiveTab('inprogress')}
          >
            In Progress <span className="ml-1.5 text-[10px] font-black bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">4</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`} 
            onClick={() => setActiveTab('completed')}
          >
            Completed <span className="ml-1.5 text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">8</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'archived' ? 'active' : ''}`} 
            onClick={() => setActiveTab('archived')}
          >
            Archived <span className="ml-1.5 text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">0</span>
          </button>
        </div>

        {/* IN PROGRESS tab */}
        {activeTab === 'inprogress' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6">

          {/* Card 1: Advanced Software Architecture — 38% */}
          <div className="course-card">
            <div className="h-40 overflow-hidden relative">
              <Image fill unoptimized className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6jpaV_iCty_zhE8mYpFdecIyW3yqc8FLWGONvxjWrHzHge49oj4Bsqlir9iRB9f7wpueT1B3MZjtERwLMXBG-OULsN-gcZZaF3toEJLgn0lsgmTMIlDU2GmRoGxVsBAn1mcVRNEONBWUkKVq46P_NjJDTz7fwS0tQYeRGd97QuphTcwdA2TgedXtR-5vqKox2Rp_n1VRDeq6PM-Bodb372JSMD-HfVx5nPfSnu2afLoAHPH8y5THwFrfYp2_KThkkTiyreplyYe4" alt="Software Architecture"/>
              <div className="absolute top-3 left-3 navy-gradient text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Advanced</div>
              <div className="absolute top-3 right-3 bg-orange-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">38%</div>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Module 1 of 24</p>
                <h3 className="text-sm font-black text-slate-900 leading-tight mt-0.5">Advanced Software Architecture</h3>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progress</span>
                  <span className="text-[11px] font-black text-orange-600">38%</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill" style={{width:"38%"}}></div></div>
              </div>
              <p className="text-[10px] text-slate-400">Last studied <strong className="text-slate-600">2 days ago</strong> · 1h 44m remaining</p>
              <Link href="/course-player" className="continue-btn" style={{textDecoration:"none"}}>
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                Continue Course
              </Link>
            </div>
          </div>

          {/* Card 2: Machine Learning Bootcamp — 65% */}
          <div className="course-card">
            <div className="h-40 overflow-hidden relative">
              <Image fill unoptimized className="object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAPjBKKt060ufdlG9c7zonON2dLuH7SXxRJlV9wleWdZIBSMS5Xf0gr0-Q-cOEgq8w1DL6N7XrqC1OcfYREZ_WYUx9t1Z-vp3lR_aAMhXFEQwlQP4SmZ4mrLQe6L5MG_CyorXme1pNn4QOScEE5cQpLZtaOJblfckA-khmdqSuwBlhMdbJRy4xZbMxXqXmfU4eegbExGgGPY2IKgZlF2qYQkFx216LXGYZszDpmm1trzKTUkwJ6FV7PRBAmubOrz4-BEJzUFMChKo" alt="Machine Learning"/>
              <div className="absolute top-3 left-3 navy-gradient text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Advanced</div>
              <div className="absolute top-3 right-3 bg-orange-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">65%</div>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Module 8 of 18</p>
                <h3 className="text-sm font-black text-slate-900 leading-tight mt-0.5">Machine Learning Bootcamp</h3>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progress</span>
                  <span className="text-[11px] font-black text-orange-600">65%</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill" style={{width:"65%"}}></div></div>
              </div>
              <p className="text-[10px] text-slate-400">Last studied <strong className="text-slate-600">Today</strong> · 4h 20m remaining</p>
              <Link href="/course-player" className="continue-btn" style={{textDecoration:"none"}}>
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                Continue Course
              </Link>
            </div>
          </div>

          {/* Card 3: Full-Stack Mastery — 40% */}
          <div className="course-card">
            <div className="h-40 overflow-hidden relative bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
              <span className="material-symbols-outlined text-white/30 text-[80px]">code</span>
              <div className="absolute top-3 left-3 navy-gradient text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Intermediate</div>
              <div className="absolute top-3 right-3 bg-orange-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">40%</div>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Module 3 of 12</p>
                <h3 className="text-sm font-black text-slate-900 leading-tight mt-0.5">Full-Stack Mastery: Architecture &amp; Logic</h3>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progress</span>
                  <span className="text-[11px] font-black text-orange-600">40%</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill" style={{width:"40%"}}></div></div>
              </div>
              <p className="text-[10px] text-slate-400">Last studied <strong className="text-slate-600">3 days ago</strong> · 6h 05m remaining</p>
              <Link href="/course-player" className="continue-btn" style={{textDecoration:"none"}}>
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                Continue Course
              </Link>
            </div>
          </div>

          {/* Card 4: Cloud-Native DevOps — 12% */}
          <div className="course-card">
            <div className="h-40 overflow-hidden relative bg-gradient-to-br from-sky-700 to-teal-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-white/30 text-[80px]">cloud</span>
              <div className="absolute top-3 left-3 navy-gradient text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Beginner</div>
              <div className="absolute top-3 right-3 bg-orange-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">12%</div>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Module 1 of 16</p>
                <h3 className="text-sm font-black text-slate-900 leading-tight mt-0.5">Cloud-Native DevOps with Kubernetes</h3>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progress</span>
                  <span className="text-[11px] font-black text-orange-600">12%</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill" style={{width:"12%"}}></div></div>
              </div>
              <p className="text-[10px] text-slate-400">Last studied <strong className="text-slate-600">1 week ago</strong> · 18h 30m remaining</p>
              <Link href="/course-player" className="continue-btn" style={{textDecoration:"none"}}>
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                Continue Course
              </Link>
            </div>
          </div>

        </div>
        )}

        {/* COMPLETED tab (hidden by default) */}
        {activeTab === 'completed' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Completed Card 1 */}
          <div className="course-card opacity-90">
            <div className="h-40 overflow-hidden relative bg-gradient-to-br from-emerald-700 to-teal-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-white/30 text-[80px]">psychology</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <span className="material-symbols-outlined text-white text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Completed</div>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">✓ All 14 Modules</p>
                <h3 className="text-sm font-black text-slate-900 leading-tight mt-0.5">UX Design Fundamentals</h3>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progress</span>
                  <span className="text-[11px] font-black text-emerald-600">100%</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill" style={{width:"100%",background:"linear-gradient(90deg,#059669,#10b981)"}}></div></div>
              </div>
              <p className="text-[10px] text-slate-400">Completed <strong className="text-slate-600">Jan 12, 2025</strong></p>
              <Link href="/course-player" className="continue-btn" style={{background:"linear-gradient(135deg,#065f46,#059669)", textDecoration:"none"}}>
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>replay</span>
                Review Course
              </Link>
            </div>
          </div>

          {/* Completed Card 2 */}
          <div className="course-card opacity-90">
            <div className="h-40 overflow-hidden relative bg-gradient-to-br from-violet-700 to-indigo-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-white/30 text-[80px]">data_object</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <span className="material-symbols-outlined text-white text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Completed</div>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">✓ All 10 Modules</p>
                <h3 className="text-sm font-black text-slate-900 leading-tight mt-0.5">Python for Data Science</h3>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progress</span>
                  <span className="text-[11px] font-black text-emerald-600">100%</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill" style={{width:"100%",background:"linear-gradient(90deg,#059669,#10b981)"}}></div></div>
              </div>
              <p className="text-[10px] text-slate-400">Completed <strong className="text-slate-600">Nov 28, 2024</strong></p>
              <Link href="/course-player" className="continue-btn" style={{background:"linear-gradient(135deg,#065f46,#059669)", textDecoration:"none"}}>
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>replay</span>
                Review Course
              </Link>
            </div>
          </div>

        </div>
        )}

        {/* ARCHIVED tab (hidden by default) */}
        {activeTab === 'archived' && (
        <div>
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-300 text-[32px]">inventory_2</span>
            </div>
            <p className="text-base font-bold text-slate-700">No archived courses</p>
            <p className="text-sm text-slate-400 max-w-xs">Courses you archive will appear here. You can archive a course from its settings menu.</p>
          </div>
        </div>
        )}

      </section>

      {/* ── BROWSE MORE CTA ── */}
      <div className="soft-reveal delay-5 bg-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl kinetic-gradient flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">Discover more courses</h3>
            <p className="text-xs text-slate-500 mt-0.5">350+ expert-led courses across 20 specializations</p>
          </div>
        </div>
        <Link href="/courses" className="kinetic-gradient text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:translate-y-[-2px] transition-all flex-shrink-0" style={{textDecoration:"none"}}>Browse Catalog →</Link>
      </div>

    </div>
  );
}
