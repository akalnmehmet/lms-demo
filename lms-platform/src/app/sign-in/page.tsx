"use client";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [showPw, setShowPw] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .left-panel { background: linear-gradient(145deg, #0f0f24 0%, #1A1A37 40%, #252548 75%, #1e1e40 100%); position: relative; overflow: hidden; }
        .blob-1 { position: absolute; width: 420px; height: 420px; border-radius: 50%; background: radial-gradient(circle, rgba(255,126,49,0.18) 0%, transparent 70%); top: -80px; right: -80px; pointer-events: none; }
        .blob-2 { position: absolute; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(92,91,124,0.25) 0%, transparent 70%); bottom: 60px; left: -60px; pointer-events: none; }
        .blob-3 { position: absolute; width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle, rgba(255,126,49,0.10) 0%, transparent 70%); bottom: 36%; right: 15%; pointer-events: none; }
        .dot-pattern { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px); background-size: 28px 28px; pointer-events: none; }
        .feature-bullet { display: flex; align-items: flex-start; gap: 12px; }
        .bullet-icon { width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0; background: rgba(255,126,49,0.12); border: 1px solid rgba(255,126,49,0.2); display: flex; align-items: center; justify-content: center; margin-top: 2px; }
        .kinetic-gradient { background: linear-gradient(135deg, #9e4200 0%, #FF7E31 100%); }
        .form-input { width: 100%; padding: 13px 16px 13px 44px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 0.875rem; font-family: var(--font-inter), sans-serif; color: #111827; background: #fff; transition: border-color 200ms, box-shadow 200ms; outline: none; }
        .form-input::placeholder { color: #9ca3af; }
        .form-input:focus { border-color: #FF7E31; box-shadow: 0 0 0 3px rgba(255,126,49,0.12); }
        .signin-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #9e4200 0%, #FF7E31 100%); color: #fff; font-weight: 800; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.08em; border: none; border-radius: 8px; cursor: pointer; transition: transform 200ms ease-out, box-shadow 200ms ease-out, opacity 150ms; box-shadow: 0 8px 24px -6px rgba(158,66,0,0.35); }
        .signin-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 32px -6px rgba(158,66,0,0.42); }
        .signin-btn:active { transform: scale(0.98); opacity: 0.92; }
        .oauth-btn { width: 100%; padding: 11px 16px; border: 1.5px solid #e5e7eb; border-radius: 8px; background: #fff; font-size: 0.8rem; font-weight: 600; color: #374151; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: border-color 200ms, background 180ms; font-family: var(--font-inter), sans-serif; }
        .oauth-btn:hover { border-color: #d1d5db; background: #f9fafb; }
        .soft-reveal { opacity: 0; transform: translateY(20px); animation: softReveal 550ms cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes softReveal { to { opacity: 1; transform: translateY(0); } }
        .delay-1 { animation-delay: 0.06s; } .delay-2 { animation-delay: 0.14s; } .delay-3 { animation-delay: 0.22s; } .delay-4 { animation-delay: 0.30s; } .delay-5 { animation-delay: 0.38s; }
        .pw-toggle { cursor: pointer; color: #9ca3af; transition: color 160ms; }
        .pw-toggle:hover { color: #6b7280; }
        .or-divider { display: flex; align-items: center; gap: 12px; color: #9ca3af; font-size: 0.75rem; font-weight: 600; }
        .or-divider::before, .or-divider::after { content: ''; flex: 1; height: 1px; background: #e5e7eb; }
        .testimonial-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px 24px; backdrop-filter: blur(8px); }
        .stat-pill { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 99px; padding: 6px 16px; font-size: 0.7rem; font-weight: 700; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.06em; }
        .stat-pill strong { color: #FF7E31; }
      `}} />

      <div className="min-h-screen flex w-full">
        {/* LEFT PANEL — BRANDING */}
        <div className="left-panel hidden lg:flex flex-col justify-between w-[52%] min-h-screen p-12 xl:p-16">
          <div className="dot-pattern"></div>
          <div className="blob-1"></div>
          <div className="blob-2"></div>
          <div className="blob-3"></div>

          <div className="relative z-10 soft-reveal delay-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl kinetic-gradient flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-white text-[22px]" style={{fontVariationSettings: "'FILL' 1"}}>school</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">Baynal Group <span className="text-orange-400">Elite</span></span>
            </Link>
          </div>

          <div className="relative z-10 space-y-10">
            <div className="soft-reveal delay-2 space-y-5">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse flex-shrink-0"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-orange-300">Enterprise Learning Platform</span>
              </div>
              <h1 className="text-4xl xl:text-5xl font-black tracking-tight text-white leading-[1.05]">
                Empowering your<br/>workforce with<br/><span className="text-orange-400">next-generation</span><br/>learning.
              </h1>
              <p className="text-white/55 text-base leading-[1.75] max-w-sm">
                Join over <strong className="text-white/80">120,000 professionals</strong> who've accelerated their careers through expert-led, project-based courses designed for the real world.
              </p>
            </div>

            <div className="soft-reveal delay-3 space-y-5">
              <div className="feature-bullet">
                <div className="bullet-icon">
                  <span className="material-symbols-outlined text-orange-400 text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Industry-recognized certificates</p>
                  <p className="text-xs text-white/45 mt-0.5">LinkedIn-verifiable credentials trusted by Fortune 500 hiring teams</p>
                </div>
              </div>
              <div className="feature-bullet">
                <div className="bullet-icon">
                  <span className="material-symbols-outlined text-orange-400 text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>live_tv</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Live sessions &amp; expert Q&amp;A</p>
                  <p className="text-xs text-white/45 mt-0.5">Weekly live cohorts with instructors from Google, Amazon &amp; Meta</p>
                </div>
              </div>
              <div className="feature-bullet">
                <div className="bullet-icon">
                  <span className="material-symbols-outlined text-orange-400 text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>rocket_launch</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Learn at your pace, on any device</p>
                  <p className="text-xs text-white/45 mt-0.5">Lifetime access, mobile app &amp; offline downloads included</p>
                </div>
              </div>
            </div>

            <div className="soft-reveal delay-4 testimonial-card">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-white text-xs font-black flex-shrink-0">SP</div>
                <div className="flex-1">
                  <p className="text-sm text-white/75 leading-[1.6] italic">"I went from mid-level dev to Principal Engineer in 7 months. The architecture courses here are on a completely different level."</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div>
                      <p className="text-xs font-bold text-white">Sophia P.</p>
                      <p className="text-[10px] text-white/40">Principal Engineer · Stripe</p>
                    </div>
                    <div className="ml-auto flex">
                      <span className="material-symbols-outlined text-amber-400 text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="material-symbols-outlined text-amber-400 text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="material-symbols-outlined text-amber-400 text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="material-symbols-outlined text-amber-400 text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="material-symbols-outlined text-amber-400 text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 soft-reveal delay-5 flex flex-wrap gap-3">
            <div className="stat-pill"><strong>120k+</strong> Learners</div>
            <div className="stat-pill"><strong>4.9★</strong> Avg Rating</div>
            <div className="stat-pill"><strong>350+</strong> Courses</div>
            <div className="stat-pill"><strong>48</strong> Countries</div>
          </div>
        </div>

        {/* RIGHT PANEL — FORM */}
        <div className="flex-1 flex flex-col min-h-screen bg-white">
          <div className="flex justify-between items-center px-8 py-5 lg:px-12">
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <div className="w-8 h-8 rounded-lg kinetic-gradient flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[17px]" style={{fontVariationSettings: "'FILL' 1"}}>school</span>
              </div>
              <span className="text-base font-black tracking-tighter text-slate-900">Baynal Group LMS</span>
            </Link>
            <div className="hidden lg:block"></div>
            <p className="text-sm text-slate-500">
              New here?
              <Link href="/get-started" className="font-bold text-orange-600 hover:underline underline-offset-4 transition-colors ml-1">Create account →</Link>
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center px-8 py-12 lg:px-16">
            <div className="w-full max-w-[400px] space-y-8">
              <div className="soft-reveal delay-1 space-y-2">
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Welcome back.</h2>
                <p className="text-slate-500 text-sm">Sign in to continue your learning journey.</p>
              </div>

              <div className="soft-reveal delay-2 grid grid-cols-2 gap-3">
                <button className="oauth-btn" type="button">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button className="oauth-btn" type="button">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="8.5" height="8.5" fill="#F25022"/>
                    <rect x="9.5" y="0" width="8.5" height="8.5" fill="#7FBA00"/>
                    <rect x="0" y="9.5" width="8.5" height="8.5" fill="#00A4EF"/>
                    <rect x="9.5" y="9.5" width="8.5" height="8.5" fill="#FFB900"/>
                  </svg>
                  Microsoft
                </button>
              </div>

              <div className="soft-reveal delay-2 or-divider">or sign in with email</div>

              <form className="soft-reveal delay-3 space-y-5" id="signInForm" noValidate>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500" htmlFor="email">Work Email</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">mail</span>
                    <input
                      className="form-input"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500" htmlFor="password">Password</label>
                    <Link href="#" className="text-xs font-semibold text-orange-500 hover:underline underline-offset-4">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">lock</span>
                    <input
                      className="form-input"
                      id="password"
                      name="password"
                      type={showPw ? 'text' : 'password'}
                      placeholder="••••••••••"
                      autoComplete="current-password"
                      required
                      style={{ paddingRight: "44px" }}
                    />
                    <button
                      type="button"
                      className="pw-toggle absolute right-3.5 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPw(!showPw)}
                      tabIndex={-1}
                      aria-label="Toggle password visibility"
                    >
                      <span className="material-symbols-outlined text-[18px]">{showPw ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer select-none">
                    Remember me for 30 days
                  </label>
                </div>

                <div className="soft-reveal delay-4 pt-1">
                  <Link href="/dashboard" className="signin-btn flex items-center justify-center gap-2" style={{ textDecoration: 'none' }}>
                    <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>login</span>
                    Sign In
                  </Link>
                </div>
              </form>

              <div className="soft-reveal delay-5 text-center text-sm text-slate-500">
                Don't have an account?
                <Link href="/get-started" className="font-bold text-orange-600 hover:underline underline-offset-4 ml-1">Sign up free →</Link>
              </div>

              <div className="soft-reveal delay-5 pt-4 border-t border-slate-100 flex justify-center gap-6">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  SSL Encrypted
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold">
                  <span className="material-symbols-outlined text-[14px]">verified_user</span>
                  SOC 2 Compliant
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold">
                  <span className="material-symbols-outlined text-[14px]">privacy_tip</span>
                  GDPR Ready
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-5 lg:px-12 flex justify-between items-center border-t border-slate-100">
            <p className="text-[11px] text-slate-400">© 2025 Baynal Group LMS. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-[11px] text-slate-400 hover:text-orange-500 transition-colors">Privacy</Link>
              <Link href="#" className="text-[11px] text-slate-400 hover:text-orange-500 transition-colors">Terms</Link>
              <Link href="/contact" className="text-[11px] text-slate-400 hover:text-orange-500 transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
