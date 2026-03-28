import Link from "next/link";
import Image from "next/image";

export default function CourseDetailPage() {
  return (
    <main className="bg-[#f6f3f2]">
      {/* ═══ HERO SECTION ═══ */}
      <section className="bg-gradient-to-br from-[#0f0f24] via-[#1A1A37] to-[#252548] text-white pt-32 pb-20 px-6 relative overflow-hidden">
        {/* decorative */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "30px 30px"}}></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-xs mb-6 flex items-center opacity-60">
            <Link href="/" className="text-[#5c5b7c] hover:text-[#ff7e31] transition-colors">Home</Link>
            <span className="text-slate-400 mx-1.5">›</span>
            <Link href="/courses" className="text-[#5c5b7c] hover:text-[#ff7e31] transition-colors">Courses</Link>
            <span className="text-slate-400 mx-1.5">›</span>
            <span className="text-white">Advanced Software Architecture</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left: course info */}
            <div className="lg:col-span-2 soft-reveal animation-delay-100 space-y-6">
              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full mb-4">Development · Advanced</span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05] mb-4">Advanced Software<br/>Architecture</h1>
                <p className="text-white/75 text-lg leading-relaxed max-w-2xl">
                  Design systems that scale to millions. Master microservices, event-driven architecture, CQRS, domain-driven design, and cloud-native deployment patterns used at elite engineering organizations.
                </p>
              </div>

              {/* Rating & Meta row */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex text-[#FBBF24]">
                    <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings:"'FILL' 1"}}>star_half</span>
                  </div>
                  <span className="text-orange-300 font-black text-sm">4.8</span>
                  <span className="text-white/50 text-xs">(3,241 ratings)</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/60 text-xs">
                  <span className="material-symbols-outlined text-[15px]">people</span>
                  <span>12,480 students enrolled</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/60 text-xs">
                  <span className="material-symbols-outlined text-[15px]">schedule</span>
                  <span>48 hours total · 24 modules</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/60 text-xs">
                  <span className="material-symbols-outlined text-[15px]">language</span>
                  <span>English · Subtitles available</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9e4200] to-[#FF7E31] flex items-center justify-center font-black text-white text-sm flex-shrink-0">DR</div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-widest font-semibold">Instructor</p>
                  <p className="text-sm font-bold text-white">Dr. Richard Vance</p>
                </div>
                <div className="hidden md:flex items-center gap-1.5 ml-4 text-white/50 text-xs">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span>Ex-Google · Staff Engineer</span>
                </div>
              </div>

              {/* Mobile hero CTA */}
              <div className="flex flex-wrap gap-4 lg:hidden">
                <Link href="/course-player" className="bg-gradient-to-br from-[#9e4200] to-[#FF7E31] text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:-translate-y-1 transition-transform">
                  <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings:"'FILL' 1"}}>play_circle</span>
                  Enroll Now — Start Course
                </Link>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                  <span>Certificate included</span>
                </div>
              </div>
            </div>

            {/* Right hero placeholder */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* ═══ MAIN 2-COLUMN LAYOUT ═══ */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* ═══ LEFT COLUMN ═══ */}
          <div className="lg:col-span-2 space-y-10">

            {/* What You'll Learn */}
            <section className="soft-reveal animation-delay-200 bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <h2 className="text-xl font-black tracking-tight text-slate-900 mb-1">What You'll Learn</h2>
              <div className="h-1 w-8 bg-orange-500 rounded-full mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Design scalable microservices with clear bounded contexts",
                  "Implement CQRS and Event Sourcing from scratch",
                  "Apply Domain-Driven Design to complex business domains",
                  "Architect cloud-native systems on AWS, GCP & Azure",
                  "Design distributed caching, message queues & data lakes",
                  "Build resilient systems with circuit breakers & bulkheads",
                  "Conduct architecture reviews and lead design decisions",
                  "Understand CAP theorem and distributed consensus protocols"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 flex-shrink-0 border border-orange-500/20 rounded-full bg-orange-50 flex items-center justify-center mt-0.5">
                      <span className="material-symbols-outlined text-orange-500 text-[14px]" style={{fontVariationSettings:"'FILL' 1"}}>check</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Description */}
            <section className="soft-reveal animation-delay-300 bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <h2 className="text-xl font-black tracking-tight text-slate-900 mb-1">Course Description</h2>
              <div className="h-1 w-8 bg-orange-500 rounded-full mb-6"></div>
              <div className="space-y-4 text-sm text-slate-600 leading-[1.75]">
                <p>This is not a beginner's guide to coding — this is an <strong className="text-slate-800">architect's playbook</strong>. Built for senior developers and engineering leads who need to design systems that serve millions of concurrent users without breaking under pressure.</p>
                <p>We start from first principles: why does software complexity compound? How do you draw the right lines between services? When should you embrace eventual consistency, and when does it destroy your product? Through 24 deep-dive modules, you will answer these questions empirically — with code, real post-mortems, and architectural diagrams from production-grade systems.</p>
                <p>Every module follows the <em>Analyze → Decide → Build → Harden</em> cadence. You will not merely watch theory — you will architect a multi-tenant SaaS platform from whiteboard to kubernetes deployment over the duration of the course.</p>
                <p>By the end, you will be capable of leading architecture reviews, writing ADRs (Architecture Decision Records), and making the high-stakes design calls that define a company's engineering trajectory.</p>
              </div>
              {/* Requirements chip row */}
              <div className="mt-6 pt-6 border-t border-slate-50">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Prerequisites</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">3+ years backend dev</span>
                  <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">REST API fluency</span>
                  <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">Basic SQL &amp; NoSQL</span>
                  <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">Git &amp; CI/CD basics</span>
                </div>
              </div>
            </section>

            {/* Instructor Bio */}
            <section className="soft-reveal animation-delay-500 bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <h2 className="text-xl font-black tracking-tight text-slate-900 mb-1">Your Instructor</h2>
              <div className="h-1 w-8 bg-orange-500 rounded-full mb-6"></div>
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0f0f24] to-[#252548] flex items-center justify-center text-white font-black text-2xl shadow-lg">DR</div>
                  <div className="mt-3 flex flex-col gap-1.5 items-center">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-amber-400 text-[14px]" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
                      <span className="text-[11px] font-bold text-slate-700">4.9 Rating</span>
                    </div>
                    <p className="text-[10px] text-slate-500">48,200 students</p>
                    <p className="text-[10px] text-slate-500">12 courses</p>
                  </div>
                </div>
                <div className="space-y-3 flex-1">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Dr. Richard Vance</h3>
                    <p className="text-xs font-semibold text-orange-600 mt-0.5">Principal Architect · Ex-Google · Speaker at QCon &amp; AWS re:Invent</p>
                  </div>
                  <p className="text-sm text-slate-600 leading-[1.7]">
                    Dr. Vance spent 11 years at Google as a Staff Software Engineer and Principal Architect, leading the redesign of critical infrastructure serving over 2 billion users. He holds a Ph.D. in Distributed Computing from CMU and has authored two books on scalable system design that have sold over 85,000 copies worldwide.
                  </p>
                  <p className="text-sm text-slate-600 leading-[1.7]">
                    He now teaches full-time at Baynal Group LMS and advises Series B &amp; C startups on engineering scale. His teaching philosophy: <em>"The best way to understand a system is to break it on purpose — in a safe environment."</em>
                  </p>
                  <div className="flex gap-3 pt-2">
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Google Alumnus</span>
                    <span className="bg-orange-50 text-orange-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Ph.D CMU</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ═══ RIGHT COLUMN — STICKY SIDEBAR ═══ */}
          <div className="sticky top-24 soft-reveal animation-delay-200">
            <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.10)] overflow-hidden border border-slate-100">
              {/* Thumbnail / video preview */}
              <div className="relative h-48 bg-gradient-to-br from-[#0f0f24] to-[#252548] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6jpaV_iCty_zhE8mYpFdecIyW3yqc8FLWGONvxjWrHzHge49oj4Bsqlir9iRB9f7wpueT1B3MZjtERwLMXBG-OULsN-gcZZaF3toEJLgn0lsgmTMIlDU2GmRoGxVsBAn1mcVRNEONBWUkKVq46P_NjJDTz7fwS0tQYeRGd97QuphTcwdA2TgedXtR-5vqKox2Rp_n1VRDeq6PM-Bodb372JSMD-HfVx5nPfSnu2afLoAHPH8y5THwFrfYp2_KThkkTiyreplyYe4"
                  className="w-full h-full object-cover opacity-60"
                  alt="Course preview thumbnail"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/50 hover:bg-white/30 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-white text-4xl" style={{fontVariationSettings:"'FILL' 1"}}>play_arrow</span>
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="p-6 space-y-5">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-slate-900">$199</span>
                    <span className="text-slate-400 line-through text-sm">$549</span>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">64% OFF</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    <span className="material-symbols-outlined text-[13px] text-orange-500">timer</span>
                    <strong className="text-orange-600">2 days</strong> left at this price!
                  </p>
                </div>

                <Link href="/course-player" className="bg-gradient-to-br from-[#9e4200] to-[#ff7e31] text-white w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 hover:-translate-y-1 transition-transform">
                  <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings:"'FILL' 1"}}>rocket_launch</span>
                  Start Course Now
                </Link>

                <div className="pt-4 border-t border-slate-50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">This course includes</p>
                  <div className="space-y-3">
                    {[
                      { icon: "ondemand_video", text: "48 hours of on-demand HD video" },
                      { icon: "article", text: "34 downloadable resources & diagrams" },
                      { icon: "code", text: "8 hands-on architecture labs" },
                      { icon: "all_inclusive", text: "Lifetime access & free updates" },
                      { icon: "workspace_premium", text: "Certificate of Completion" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700">
                        <span className="material-symbols-outlined text-orange-500 text-[18px]">{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
