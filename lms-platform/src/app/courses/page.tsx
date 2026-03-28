'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="pt-32 pb-20 px-8 max-w-screen-2xl mx-auto min-h-screen">
      {/* Header Section */}
      <header className="mb-12 soft-reveal">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-4 leading-none">
          Master the <span className="text-[#ff7e31]">Next Level</span>.
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          Curated excellence for modern professionals. Explore our selection of high-impact courses designed by industry leaders.
        </p>
      </header>

      {/* Search & Filter Bar */}
      <section className="mb-12 sticky top-24 z-40 soft-reveal" style={{ animationDelay: '0.1s' }}>
        <div className="bg-[#f6f3f2] p-6 rounded-xl flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <button className="bg-[#ff7e31] text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all shadow-sm">All Courses</button>
            <button className="bg-white text-slate-500 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#9e4200] transition-all border border-transparent hover:border-slate-300">Development</button>
            <button className="bg-white text-slate-500 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#9e4200] transition-all border border-transparent hover:border-slate-300">Design</button>
            <button className="bg-white text-slate-500 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#9e4200] transition-all border border-transparent hover:border-slate-300">Business</button>
            <button className="bg-white text-slate-500 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#9e4200] transition-all border border-transparent hover:border-slate-300">Marketing</button>
          </div>
          <div className="w-full md:w-80 group">
            <div className="relative flex items-center bg-white rounded-lg overflow-hidden border border-slate-200 group-focus-within:border-[#9e4200] transition-colors">
              <span className="material-symbols-outlined px-3 text-slate-400 group-focus-within:text-[#9e4200]">search</span>
              <input className="w-full py-3 bg-transparent border-none focus:ring-0 text-sm" placeholder="Filter by keywords..." type="text"/>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading ? (
          <div className="col-span-full py-20 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#ff7e31] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl font-bold text-slate-500">Kurslar yükleniyor...</p>
          </div>
        ) : courses.length > 0 ? (
          courses.map((course, index) => (
            <Link key={course.id} href={`/courses/${course.id}`} className="soft-reveal group bg-white rounded-lg flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(92,91,124,0.08)] transition-all duration-300 relative overflow-hidden" style={{ animationDelay: `${0.2 + (index * 0.05)}s`, textDecoration: 'none' }}>
              <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={course.title || "Course Thumbnail"} src={course.thumbnailUrl || course.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuB6jpaV_iCty_zhE8mYpFdecIyW3yqc8FLWGONvxjWrHzHge49oj4Bsqlir9iRB9f7wpueT1B3MZjtERwLMXBG-OULsN-gcZZaF3toEJLgn0lsgmTMIlDU2GmRoGxVsBAn1mcVRNEONBWUkKVq46P_NjJDTz7fwS0tQYeRGd97QuphTcwdA2TgedXtR-5vqKox2Rp_n1VRDeq6PM-Bodb372JSMD-HfVx5nPfSnu2afLoAHPH8y5THwFrfYp2_KThkkTiyreplyYe4"}/>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#9e4200] bg-[#ffdbcb] px-2 py-1 rounded">{course.category || "General"}</span>
                  <span className="text-[#ff7e31] font-black text-lg">{course.price ? `$${course.price}` : "Free"}</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-3 group-hover:text-[#9e4200] transition-colors">{course.title || "Untitled Course"}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">
                  {course.instructor ? `Eğitmen: ${course.instructor}` : (course.description || "No description available.")}
                </p>
                <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">{course.lessonsCount || course.lessons || 0} Lessons</span>
                  <span className="text-[#9e4200] font-bold text-xs tracking-widest uppercase flex items-center gap-1 group/btn">
                      İncele / Detay
                      <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff7e31] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-xl font-bold text-slate-500">Henüz kurs bulunmuyor.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="mt-24 bg-slate-900 text-white py-20 px-12 rounded-2xl relative overflow-hidden soft-reveal">
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Ready to lead the industry?</h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed">Join 50,000+ elite students mastering the crafts of the future. Unlimited access to all courses starting at $49/mo.</p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-[#9e4200] to-[#ff7e31] text-white px-10 py-4 rounded-lg font-black tracking-widest uppercase text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">Start Your Journey</button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-lg font-black tracking-widest uppercase text-sm hover:bg-white/20 transition-all">View Pricing</button>
          </div>
        </div>
        <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-[#ff7e31] opacity-20 blur-[120px] rounded-full"></div>
      </section>
    </main>
  );
}
