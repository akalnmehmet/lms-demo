export default function ContactPage() {
  return (
    <main className="pt-32 pb-20 px-8 max-w-screen-2xl mx-auto">
      {/* Hero Section */}
      <header className="mb-20 text-center md:text-left">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-4">Get in <span className="text-[#ff7e31]">Touch</span></h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">Have questions about our premium tracks? Our elite support team is ready to help you navigate your learning journey.</p>
      </header>

      {/* Main Content: Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Office & Details */}
        <div className="lg:col-span-5 space-y-8">
          <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h2 className="font-bold text-2xl mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#ff7e31]">location_on</span>
              Office Headquarters
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-slate-400">map</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Address</p>
                  <p className="text-slate-900 font-medium">123 Excellence Blvd, Suite 400<br/>Design District, CA 90210</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-slate-400">call</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Phone</p>
                  <p className="text-slate-900 font-medium">+1 (555) 012-3456</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-slate-400">mail</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email</p>
                  <p className="text-slate-900 font-medium">support@skillschoolelite.edu</p>
                </div>
              </div>
            </div>
          </section>

          {/* Map Widget */}
          <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-inner bg-slate-100 group">
            <img alt="Location Map" className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAplFcWfUrYAR55hfqKb1c4oTiF6fB9Q_Z48dx_Mv9hu9skNPFlEq9H8-dXnyJH9vpmcf-dCGmXzQ-p5d8Kd1yQrwAcvMd1ATfS-F41ojs1jxxWonC8HUk25E8-s3uDcqhHq8MtKZdi4KgQN18IJ7faE_6ozb2nRhFH4L0ZrgZ6wgkY73Y2kkaKrH7A0Uu-FiW-z5GPMP6tWtFlsq6C3Ejuwb6wGuikbIIrwCemx7_0CS71PYlOkk0NJf8G-raOAFzDomq8Rke705Q"/>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 bg-[#ff7e31] rounded-full animate-ping opacity-20"></div>
              <div className="absolute w-4 h-4 bg-[#9e4200] rounded-full border-2 border-white shadow-xl"></div>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold tracking-wider shadow-lg">
              VIEW ON GOOGLE MAPS
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7">
          <form className="bg-slate-50 p-8 md:p-12 rounded-xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Full Name</label>
                <input className="w-full bg-white border-none ring-1 ring-slate-200 rounded-lg p-4 focus:ring-2 focus:ring-[#9e4200] transition-all outline-none" placeholder="Jane Doe" type="text"/>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Email Address</label>
                <input className="w-full bg-white border-none ring-1 ring-slate-200 rounded-lg p-4 focus:ring-2 focus:ring-[#9e4200] transition-all outline-none" placeholder="jane@example.com" type="email"/>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Subject</label>
              <select className="w-full bg-white border-none ring-1 ring-slate-200 rounded-lg p-4 focus:ring-2 focus:ring-[#9e4200] transition-all outline-none appearance-none">
                <option>Technical Support</option>
                <option>Billing Inquiry</option>
                <option>Course Access</option>
                <option>Partnerships</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Message</label>
              <textarea className="w-full bg-white border-none ring-1 ring-slate-200 rounded-lg p-4 focus:ring-2 focus:ring-[#9e4200] transition-all outline-none resize-none" placeholder="How can we help you master your craft?" rows={6}></textarea>
            </div>
            <button className="w-full bg-gradient-to-r from-[#9e4200] to-[#ff7e31] text-white py-5 rounded-lg font-bold uppercase tracking-[0.2em] hover:translate-y-[-4px] transition-all shadow-xl shadow-[#ff7e31]/20 flex items-center justify-center gap-3" type="button">
              Send Message
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-32 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#9e4200] mb-4 block">Knowledge Base</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {/* FAQ 1 */}
          <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 open:bg-white open:shadow-xl open:shadow-slate-900/5">
            <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-lg text-slate-900">
              How to reset password?
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-[#9e4200]">expand_more</span>
            </summary>
            <div className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-200 pt-4">
              To reset your password, visit the login page and click "Forgot Password." You will receive an encrypted link via your registered email to create a new secure credential.
            </div>
          </details>
          {/* FAQ 2 */}
          <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 open:bg-white open:shadow-xl open:shadow-slate-900/5">
            <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-lg text-slate-900">
              Payment methods?
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-[#9e4200]">expand_more</span>
            </summary>
            <div className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-200 pt-4">
              We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay. For corporate elite tiers, we also offer wire transfer options.
            </div>
          </details>
          <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 open:bg-white open:shadow-xl open:shadow-slate-900/5">
            <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-lg text-slate-900">
              Can I access courses offline?
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-[#9e4200]">expand_more</span>
            </summary>
            <div className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-200 pt-4">
              Premium members can download lesson resources and videos via our mobile app for offline mastery during travel or transit.
            </div>
          </details>
          <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 open:bg-white open:shadow-xl open:shadow-slate-900/5">
            <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-lg text-slate-900">
              Refund policy?
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-[#9e4200]">expand_more</span>
            </summary>
            <div className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-200 pt-4">
              We offer a 14-day "Excellence Guarantee." If the course content doesn't meet your professional standards, we provide a full refund, no questions asked.
            </div>
          </details>
          <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 open:bg-white open:shadow-xl open:shadow-slate-900/5">
            <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-lg text-slate-900">
              Certificates of completion?
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-[#9e4200]">expand_more</span>
            </summary>
            <div className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-200 pt-4">
              Every Baynal Group LMS course includes a verified digital certificate. These can be directly integrated into your LinkedIn profile or portfolio.
            </div>
          </details>

        </div>
      </section>
    </main>
  );
}
