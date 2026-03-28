import React from 'react';
import { ShieldCheck, Download } from 'lucide-react';

export default function Certificate() {
  return (
    <main className="min-h-screen py-16 px-6 flex flex-col items-center justify-center">
      {/* The Certificate */}
      <div className="cert-container bg-stone-50 cert-shadow relative p-8 md:p-12 mb-10 overflow-hidden transform transition-all">
        {/* Inner Border Structure */}
        <div className="cert-inner-border w-full h-full relative p-10 flex flex-col justify-between overflow-hidden">
          
          {/* Soft graphic watermark background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-[80%] h-[80%]">
              <path fill="currentColor" d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" />
            </svg>
          </div>

          {/* Top Header */}
          <div className="text-center relative z-10 flex flex-col items-center mt-4">
            <div className="flex items-center gap-3 mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-navy">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
              </svg>
              <span className="font-serif text-xl font-bold tracking-widest text-navy uppercase">Baynal Group LMS</span>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-navy">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
              </svg>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-navy mb-4 tracking-tight">Certificate of Completion</h1>
            <div className="w-32 h-1 bg-gradient-to-r from-orange to-[#ff6600] rounded-full mt-2"></div>
          </div>

          {/* Body Text */}
          <div className="text-center relative z-10 my-auto">
            <p className="text-lg md:text-xl font-medium text-slate-500 uppercase tracking-[0.2em] mb-8">This is to certify that</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 mb-8 italic">Alex Sterling</h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              has successfully completed the comprehensive professional masterclass program and fulfilled all requirements for
            </p>
            <h3 className="font-bold text-2xl md:text-3xl text-navy mt-6 mb-2">Advanced Software Architecture</h3>
          </div>

          {/* Bottom Section: Verification & Signatures */}
          <div className="relative z-10 flex justify-between items-end mt-12 w-full">
            
            {/* Left: Verification Area */}
            <div className="flex items-end gap-6">
              {/* QR Code SVG Placeholder */}
              <div className="w-24 h-24 bg-white p-2 shadow-sm border border-slate-200 rounded-lg">
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-slate-800">
                  <path d="M5 5h25v25H5zm5 5v15h15V10zM70 5h25v25H70zm5 5v15h15V10zM5 70h25v25H5zm5 5v15h15V75z" />
                  <path d="M12.5 12.5h10v10h-10zm65 0h10v10h-10zm-65 65h10v10h-10z" />
                  <rect x="40" y="5" width="10" height="10" />
                  <rect x="55" y="15" width="10" height="10" />
                  <rect x="40" y="25" width="20" height="10" />
                  <rect x="5" y="40" width="15" height="10" />
                  <rect x="25" y="40" width="10" height="20" />
                  <rect x="40" y="40" width="10" height="10" />
                  <rect x="55" y="40" width="40" height="10" />
                  <rect x="75" y="55" width="10" height="10" />
                  <rect x="40" y="55" width="25" height="10" />
                  <rect x="40" y="70" width="10" height="25" />
                  <rect x="55" y="70" width="20" height="10" />
                  <rect x="80" y="70" width="15" height="10" />
                  <rect x="55" y="85" width="10" height="10" />
                  <rect x="70" y="85" width="25" height="10" />
                </svg>
              </div>
              <div className="flex flex-col gap-1 mb-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Certificate ID</p>
                <p className="font-mono font-bold text-sm text-slate-700 bg-slate-100 px-3 py-1 rounded inline-block">SSA-CERT-ARCH-XYZ123</p>
                <p className="text-xs font-semibold text-slate-500 mt-1">Issued: March 24, 2026</p>
              </div>
            </div>

            {/* Right: Signature & Seal */}
            <div className="flex items-center gap-12">
              {/* Signature */}
              <div className="text-center flex flex-col items-center">
                <div className="w-48 h-16 relative flex items-center justify-center border-b border-slate-300">
                  {/* SVG Signature */}
                  <svg viewBox="0 0 300 100" className="w-full h-full text-navy opacity-80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M30 70 C 50 20, 70 90, 90 40 C 110 0, 120 80, 140 50 S 170 10, 180 60 C 190 80, 200 60, 220 50 S 260 90, 280 40" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-slate-800 mt-2">Dr. Eleanor Sterling</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Lead Instructor</p>
              </div>
              
              {/* Silver Seal */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Outer jagged edge */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex items-center justify-center">
                  {/* Dashed inner border for embossed look */}
                  <div className="w-[85%] h-[85%] rounded-full border border-dashed border-slate-500/50 flex items-center justify-center bg-gradient-to-tl from-slate-200 via-slate-100 to-white shadow-inner">
                    <div className="text-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto text-slate-400 mb-1">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                      </svg>
                      <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 leading-tight">Baynal Group<br/>Verified</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-center mt-4">
        <button className="flex items-center gap-2 bg-[#FF7E31] text-white px-8 py-3.5 rounded-lg text-sm font-bold uppercase tracking-widest shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:scale-95 transition-all">
          <ShieldCheck className="w-5 h-5" />
          Verify Certificate
        </button>
        <button className="flex items-center gap-2 bg-[#1A1A37] text-white px-8 py-3.5 rounded-lg text-sm font-bold uppercase tracking-widest shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:scale-95 transition-all">
          <Download className="w-5 h-5" />
          Download PDF
        </button>
      </div>

    </main>
  );
}
