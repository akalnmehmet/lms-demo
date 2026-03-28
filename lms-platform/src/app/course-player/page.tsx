"use client";

import Link from "next/link";
import { useState } from "react";

export default function CoursePlayer() {
  const [playing, setPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "resources" | "qa">("overview");

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .player-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 60;
          height: 56px; background: #0f0f24; border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; padding: 0 20px; gap: 16px;
        }
        .player-shell { display: flex; height: 100vh; padding-top: 56px; background: #0f0f24; color: #e2e8f0; font-family: var(--font-inter), sans-serif;}
        .video-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
        .video-wrapper {
          position: relative; width: 100%; background: #000; aspect-ratio: 16 / 9;
          max-height: calc(100vh - 56px - 200px); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .video-placeholder {
          width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;
          background: radial-gradient(ellipse at center, #1A1A37 0%, #0f0f24 100%);
        }
        .play-btn {
          width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #9e4200, #FF7E31);
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          box-shadow: 0 0 0 12px rgba(255,126,49,0.15); transition: transform 200ms, box-shadow 200ms;
        }
        .play-btn:hover { transform: scale(1.08); box-shadow: 0 0 0 16px rgba(255,126,49,0.12); }
        .video-controls { background: #111129; padding: 10px 20px; display: flex; flex-direction: column; gap: 8px; flex-shrink: 0; }
        .progress-track { height: 4px; background: rgba(255,255,255,0.12); border-radius: 99px; cursor: pointer; position: relative; }
        .progress-fill { height: 4px; width: 38%; border-radius: 99px; background: linear-gradient(90deg, #FF7E31, #ff6600); }
        .progress-thumb { position: absolute; top: 50%; transform: translateY(-50%); left: 38%; width: 12px; height: 12px; border-radius: 50%; background: #FF7E31; margin-left: -6px; box-shadow: 0 0 0 3px rgba(255,126,49,0.3); }
        .controls-row { display: flex; align-items: center; gap: 16px; }
        .ctrl-btn { background: none; border: none; color: rgba(255,255,255,0.6); cursor: pointer; transition: color 180ms, transform 150ms; display: flex; align-items: center; }
        .ctrl-btn:hover { color: #fff; transform: scale(1.1); }
        .ctrl-btn.active { color: #FF7E31; }
        .info-panel { flex: 1; overflow-y: auto; padding: 20px 24px; background: #13132b; scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent; }
        .tab-link { background: none; border: none; color: rgba(255,255,255,0.45); cursor: pointer; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 6px 0; border-bottom: 2px solid transparent; transition: color 200ms, border-color 200ms; }
        .tab-link.active { color: #FF7E31; border-bottom-color: #FF7E31; }
        .course-sidebar { width: 340px; flex-shrink: 0; background: #111129; display: flex; flex-direction: column; overflow: hidden; border-left: 1px solid rgba(255,255,255,0.05); }
        .sidebar-header { padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); flex-shrink: 0; }
        .sidebar-scroll { overflow-y: auto; flex: 1; scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.08) transparent; }
        .mod-section summary { list-style: none; cursor: pointer; padding: 12px 20px; display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 180ms; }
        .mod-section summary:hover { background: rgba(255,255,255,0.06); }
        .mod-section[open] summary { background: rgba(255,126,49,0.08); }
        .mod-section summary::-webkit-details-marker { display: none; }
        .lesson-row { display: flex; align-items: center; gap: 10px; padding: 10px 20px; border-bottom: 1px solid rgba(255,255,255,0.03); cursor: pointer; transition: background 160ms; position: relative; }
        .lesson-row:hover { background: rgba(255,255,255,0.04); }
        .lesson-row.active { background: rgba(255,126,49,0.10); }
        .lesson-row.active::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: #FF7E31; border-radius: 0 3px 3px 0; }
        .lesson-row.completed .lesson-icon { color: #FF7E31; }
        .lesson-icon { color: rgba(255,255,255,0.3); flex-shrink: 0; }
        .note-area { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; color: #e2e8f0; font-size: 0.8rem; padding: 10px 14px; resize: none; font-family: var(--font-inter), sans-serif; line-height: 1.6; transition: border-color 200ms; }
        .note-area:focus { outline: none; border-color: #FF7E31; }
      `}} />

      {/* ═══ TOP PLAYER NAV ═══ */}
      <header className="player-nav">
        <Link href="/course-detail" className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-xs font-semibold">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span className="hidden sm:inline">Back to Course</span>
        </Link>
        <div className="w-px h-6 bg-white/10"></div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest truncate">Advanced Software Architecture</p>
          <p className="text-sm font-bold text-white truncate">1.1 — Why Architecture Matters: The Hidden Cost of Complexity</p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="text-[11px] text-white/50 font-semibold">Your progress</div>
          <div className="w-32 h-1.5 bg-white/10 rounded-full">
            <div className="h-1.5 rounded-full bg-gradient-to-r from-orange-600 to-orange-400" style={{width: "38%"}}></div>
          </div>
          <span className="text-[11px] font-black text-orange-400">38%</span>
        </div>
        <div className="flex items-center gap-3 ml-4">
          <button className="text-white/50 hover:text-white transition-colors flex items-center gap-1 text-xs font-semibold">
            <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
            <span className="hidden lg:inline">Save</span>
          </button>
          <Link href="/dashboard" className="kinetic-gradient text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-lg">Dashboard</Link>
        </div>
      </header>

      {/* ═══ MAIN SHELL ═══ */}
      <div className="player-shell">

        {/* ═══ VIDEO PANEL ═══ */}
        <div className="video-panel">

          <div className="video-wrapper">
            <div className="video-placeholder w-full h-full">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{background: "radial-gradient(ellipse at 60% 40%, rgba(255,126,49,0.3) 0%, transparent 60%)"}}></div>
              <div className="play-btn z-10" onClick={() => setPlaying(!playing)}>
                <span className="material-symbols-outlined text-white text-4xl" style={{fontVariationSettings: "'FILL' 1", marginLeft: "4px"}}>
                  {playing ? 'pause' : 'play_arrow'}
                </span>
              </div>
              <div className="z-10 text-center">
                <p className="text-white/70 text-sm font-semibold">Module 1, Lesson 1</p>
                <p className="text-white/40 text-xs mt-1">Why Architecture Matters: The Hidden Cost of Complexity</p>
                <p className="text-white/30 text-[10px] mt-2">28 min · HD 1080p</p>
              </div>
              <button className="absolute bottom-6 right-6 bg-black/60 border border-white/10 text-white/60 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                Skip Intro →
              </button>
            </div>
          </div>

          <div className="video-controls">
            <div className="progress-track">
              <div className="progress-fill"></div>
              <div className="progress-thumb"></div>
            </div>
            <div className="controls-row">
              <button className="ctrl-btn" onClick={() => setPlaying(!playing)}>
                <span className="material-symbols-outlined text-[26px]" style={{fontVariationSettings: "'FILL' 1"}}>
                  {playing ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <button className="ctrl-btn" title="Previous lesson">
                <span className="material-symbols-outlined text-[22px]">skip_previous</span>
              </button>
              <button className="ctrl-btn" title="Next lesson">
                <span className="material-symbols-outlined text-[22px]">skip_next</span>
              </button>
              <span className="text-[11px] text-white/40 font-mono tabular-nums">10:44 / 28:00</span>
              <div className="flex-1"></div>
              <button className="ctrl-btn" title="Captions">
                <span className="material-symbols-outlined text-[20px]">closed_caption</span>
              </button>
              <button className="ctrl-btn text-[11px] font-black px-2 py-0.5 border border-white/20 rounded">1×</button>
              <button className="ctrl-btn text-[10px] font-bold">1080p</button>
              <button className="ctrl-btn" title="Picture-in-picture">
                <span className="material-symbols-outlined text-[20px]">picture_in_picture_alt</span>
              </button>
              <button className="ctrl-btn" title="Fullscreen">
                <span className="material-symbols-outlined text-[22px]">fullscreen</span>
              </button>
              <div className="flex items-center gap-2">
                <button className="ctrl-btn"><span className="material-symbols-outlined text-[20px]">volume_up</span></button>
                <div className="w-20 h-1 bg-white/15 rounded-full">
                  <div className="h-1 rounded-full bg-white/70" style={{width: "80%"}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="info-panel">
            <div className="flex gap-8 border-b border-white/10 mb-5">
              <button className={`tab-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
              <button className={`tab-link ${activeTab === 'notes' ? 'active' : ''}`} onClick={() => setActiveTab('notes')}>My Notes</button>
              <button className={`tab-link ${activeTab === 'resources' ? 'active' : ''}`} onClick={() => setActiveTab('resources')}>Resources</button>
              <button className={`tab-link ${activeTab === 'qa' ? 'active' : ''}`} onClick={() => setActiveTab('qa')}>Q &amp; A</button>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-base font-black text-white tracking-tight">Why Architecture Matters: The Hidden Cost of Complexity</h2>
                  <p className="text-xs text-white/40 mt-1">Module 1 · Lesson 1 · 28 min · Updated March 2025</p>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">
                  In this opening lesson, Dr. Vance dissects why software complexity compounds exponentially rather than linearly, and why ignoring architectural decisions early on leads to catastrophic rework costs. We examine three real-world post-mortems — one from Twitter, one from Monzo Bank, and one from an anonymous Fortune 500 — to understand the exact moment architectural debt became unserviceable.
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  You will walk away with a mental model for evaluating any system's "architectural load" and a vocabulary to articulate these concerns to both peers and leadership.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="bg-white/10 text-white/50 text-[10px] font-bold px-3 py-1 rounded-full">#architecture</span>
                  <span className="bg-white/10 text-white/50 text-[10px] font-bold px-3 py-1 rounded-full">#complexity</span>
                  <span className="bg-white/10 text-white/50 text-[10px] font-bold px-3 py-1 rounded-full">#post-mortems</span>
                </div>
                <div className="flex gap-3 pt-4">
                  <button className="flex items-center gap-2 bg-white/10 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg hover:bg-white/20 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Mark Complete
                  </button>
                  <Link href="#" className="flex items-center gap-2 kinetic-gradient text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
                    Next Lesson <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-3">
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Notes for this lesson</p>
                <textarea className="note-area" rows={6} placeholder="Take notes here… they'll be saved to your account." defaultValue="- Complexity grows O(n²) with number of teams, not O(n)&#10;- Twitter's 'Fail Whale' era: caused by monolith + sharding done wrong&#10;- Key quote: 'The most expensive refactor is the one you have to do at 3x scale'"></textarea>
                <button className="kinetic-gradient text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-lg">Save Note</button>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-3">
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-4">Downloadable Resources</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-orange-400 text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>picture_as_pdf</span>
                    <span className="text-sm text-white/80 flex-1">Module 1 Architecture Slides.pdf</span>
                    <span className="material-symbols-outlined text-white/30 text-[18px]">download</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-blue-400 text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>description</span>
                    <span className="text-sm text-white/80 flex-1">Complexity Assessment Worksheet.docx</span>
                    <span className="material-symbols-outlined text-white/30 text-[18px]">download</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-emerald-400 text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>link</span>
                    <span className="text-sm text-white/80 flex-1">Further Reading: Martin Fowler's Architecture Blog</span>
                    <span className="material-symbols-outlined text-white/30 text-[18px]">open_in_new</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'qa' && (
              <div className="space-y-4">
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Questions from this lesson</p>
                <div className="bg-white/5 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black">JM</div>
                    <div>
                      <span className="text-xs font-bold text-white/80">James M.</span>
                      <span className="text-[10px] text-white/30 ml-2">3 days ago</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/60">Is the O(n²) complexity analogy based on Conway's Law? Would love to see a concrete formula.</p>
                  <div className="pl-9 mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full kinetic-gradient flex items-center justify-center text-white text-[9px] font-black">DR</div>
                      <span className="text-[10px] font-bold text-orange-400">Dr. Vance · Instructor</span>
                    </div>
                    <p className="text-xs text-white/50">Yes! It aligns with Dunbar's number applied to teams. I'll drop the full derivation in the resources doc.</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 border border-white/10 text-white/50 text-xs font-bold px-4 py-2 rounded-lg hover:border-orange-400 hover:text-orange-400 transition-colors">
                  <span className="material-symbols-outlined text-[16px]">add</span> Ask a Question
                </button>
              </div>
            )}

          </div>
        </div>

        {/* ═══ SIDEBAR ═══ */}
        <aside className="course-sidebar hidden lg:flex flex-col">
          <div className="sidebar-header">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Course Content</p>
            <h3 className="text-sm font-black text-white leading-tight">Advanced Software Architecture</h3>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1 h-1 bg-white/10 rounded-full">
                <div className="h-1 rounded-full bg-orange-500" style={{width: "38%"}}></div>
              </div>
              <span className="text-[10px] font-black text-orange-400 whitespace-nowrap">38% complete</span>
            </div>
          </div>

          <div className="sidebar-scroll">

            {/* Module 1 */}
            <details className="mod-section" open>
              <summary>
                <div>
                  <p className="text-xs font-bold text-white/80">Module 1: Foundations</p>
                  <p className="text-[10px] text-white/35 mt-0.5">4 lessons · 2h 15m</p>
                </div>
                <span className="material-symbols-outlined text-white/30 text-[18px]">expand_more</span>
              </summary>
              <div>
                <div className="lesson-row active completed">
                  <span className="material-symbols-outlined lesson-icon text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/90 truncate">1.1 Why Architecture Matters</p>
                    <p className="text-[10px] text-white/35">28 min</p>
                  </div>
                  <span className="text-[9px] font-bold text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded">NOW</span>
                </div>
                <div className="lesson-row">
                  <span className="material-symbols-outlined lesson-icon text-[18px]">radio_button_unchecked</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/60 truncate">1.2 Monolith vs. Distributed</p>
                    <p className="text-[10px] text-white/30">34 min</p>
                  </div>
                </div>
                <div className="lesson-row">
                  <span className="material-symbols-outlined lesson-icon text-[18px]">radio_button_unchecked</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/60 truncate">1.3 Architectural Fitness Functions</p>
                    <p className="text-[10px] text-white/30">22 min</p>
                  </div>
                </div>
                <div className="lesson-row">
                  <span className="material-symbols-outlined lesson-icon text-[18px]">quiz</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/60 truncate">Module 1 Assessment</p>
                    <p className="text-[10px] text-white/30">15 min</p>
                  </div>
                </div>
              </div>
            </details>

            {/* Module 2 */}
            <details className="mod-section">
              <summary>
                <div>
                  <p className="text-xs font-bold text-white/80">Module 2: Domain-Driven Design</p>
                  <p className="text-[10px] text-white/35 mt-0.5">5 lessons · 3h 40m</p>
                </div>
                <span className="material-symbols-outlined text-white/30 text-[18px]">expand_more</span>
              </summary>
              <div>
                <div className="lesson-row">
                  <span className="material-symbols-outlined lesson-icon text-[18px]">play_circle</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/60 truncate">2.1 Ubiquitous Language &amp; Bounded Contexts</p>
                    <p className="text-[10px] text-white/30">45 min</p>
                  </div>
                </div>
                <div className="lesson-row">
                  <span className="material-symbols-outlined lesson-icon text-[18px]">play_circle</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/60 truncate">2.2 Aggregates, Entities &amp; Value Objects</p>
                    <p className="text-[10px] text-white/30">52 min</p>
                  </div>
                </div>
                <div className="lesson-row">
                  <span className="material-symbols-outlined lesson-icon text-[18px]">play_circle</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/60 truncate">2.3 Context Mapping &amp; Integration Patterns</p>
                    <p className="text-[10px] text-white/30">38 min</p>
                  </div>
                </div>
                <div className="lesson-row">
                  <span className="material-symbols-outlined lesson-icon text-[18px]">code</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/60 truncate">Workshop: Model an E-Commerce Domain</p>
                    <p className="text-[10px] text-white/30">60 min</p>
                  </div>
                </div>
              </div>
            </details>

            {/* Module 3 */}
            <details className="mod-section">
              <summary>
                <div>
                  <p className="text-xs font-bold text-white/80">Module 3: Event-Driven &amp; CQRS</p>
                  <p className="text-[10px] text-white/35 mt-0.5">6 lessons · 4h 10m</p>
                </div>
                <span className="material-symbols-outlined text-white/30 text-[18px]">expand_more</span>
              </summary>
              <div>
                <div className="lesson-row">
                  <span className="material-symbols-outlined lesson-icon text-[18px]">play_circle</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/60 truncate">3.1 Event Sourcing from First Principles</p>
                    <p className="text-[10px] text-white/30">42 min</p>
                  </div>
                </div>
                <div className="lesson-row">
                  <span className="material-symbols-outlined lesson-icon text-[18px]">play_circle</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/60 truncate">3.2 CQRS: Separating Read &amp; Write Models</p>
                    <p className="text-[10px] text-white/30">55 min</p>
                  </div>
                </div>
                <div className="lesson-row">
                  <span className="material-symbols-outlined lesson-icon text-[18px]">play_circle</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/60 truncate">3.3 Kafka, RabbitMQ &amp; Message Bus Design</p>
                    <p className="text-[10px] text-white/30">48 min</p>
                  </div>
                </div>
              </div>
            </details>

            {/* Remaining modules collapsed */}
            <div className="px-5 py-4 text-center">
              <p className="text-[11px] text-white/35">+ 21 more modules locked</p>
              <Link href="/course-detail" className="text-orange-400 text-[11px] font-bold hover:underline">View full curriculum →</Link>
            </div>

          </div>
        </aside>

      </div>
    </>
  );
}
