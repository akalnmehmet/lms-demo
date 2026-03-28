import Link from "next/link";

export default function MyCertificates() {
    return (
        <div className="max-w-5xl mx-auto space-y-10">

            {/* Header */}
            <section className="soft-reveal delay-1 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">My Certificates</h1>
                    <p className="text-slate-500 font-medium max-w-lg">View, download, and verify your earned credentials. Your achievements representing your commitment to digital mastery.</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        3 Verified Credentials
                    </span>
                </div>
            </section>

            {/* Certificates Grid */}
            <section className="soft-reveal delay-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Certificate 1: Advanced Software Architecture */}
                <div className="cert-preview-card flex flex-col items-stretch group">
                    <div className="top-accent"></div>
                    <div className="p-8 flex flex-col flex-1 relative overflow-hidden">
                        <span className="material-symbols-outlined absolute -right-6 -top-6 text-[120px] text-slate-50 opacity-50 z-0">workspace_premium</span>

                        <div className="relative z-10 flex flex-col h-full items-start">
                            <div className="w-14 h-14 rounded-full navy-gradient text-white flex items-center justify-center mb-6 shadow-lg shadow-navy/20">
                                <span className="material-symbols-outlined text-3xl">architecture</span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 leading-tight mb-2">Advanced Software Architecture</h3>
                            <p className="text-xs text-slate-500 font-medium mb-6 flex-1">Completed March 24, 2026</p>

                            <div className="w-full flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                    Verified
                                </div>
                                <Link href="/certificate" className="bg-[#1A1A37] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#252548] transition-colors shadow-md">
                                    View Certificate
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Certificate 2: UI/UX Design */}
                <div className="cert-preview-card flex flex-col flex-auto group">
                    <div className="top-accent"></div>
                    <div className="p-8 flex flex-col flex-1 relative overflow-hidden">
                        <span className="material-symbols-outlined absolute -right-6 -top-6 text-[120px] text-slate-50 opacity-50 z-0">workspace_premium</span>

                        <div className="relative z-10 flex flex-col h-full items-start">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
                                <span className="material-symbols-outlined text-3xl">brush</span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 leading-tight mb-2">UI/UX Design Masterclass</h3>
                            <p className="text-xs text-slate-500 font-medium mb-6 flex-1">Completed February 12, 2026</p>

                            <div className="w-full flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                    Verified
                                </div>
                                <Link href="/certificate" className="bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:text-navy hover:border-navy transition-colors">
                                    View Certificate
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Certificate 3: Data Science 101 */}
                <div className="cert-preview-card flex flex-col flex-auto group">
                    <div className="top-accent"></div>
                    <div className="p-8 flex flex-col flex-1 relative overflow-hidden">
                        <span className="material-symbols-outlined absolute -right-6 -top-6 text-[120px] text-slate-50 opacity-50 z-0">workspace_premium</span>

                        <div className="relative z-10 flex flex-col h-full items-start">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-teal-500/20">
                                <span className="material-symbols-outlined text-3xl">query_stats</span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 leading-tight mb-2">Data Science &amp; Machine Learning 101</h3>
                            <p className="text-xs text-slate-500 font-medium mb-6 flex-1">Completed January 05, 2026</p>

                            <div className="w-full flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                    Verified
                                </div>
                                <Link href="/certificate" className="bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:text-navy hover:border-navy transition-colors">
                                    View Certificate
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </div>
    );
}
