'use client';

import Image from "next/image";
import { Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Home() {
  const [featuredCourses, setFeaturedCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const q = query(collection(db, "courses"), limit(3));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeaturedCourses(data);
      } catch (error) {
        console.error("Error fetching featured courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-8 bg-[#1A1A37] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-tertiary rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-8">
            <span className="inline-block bg-primary-container/20 text-primary-container px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
              The Digital Atelier
            </span>
            <h1 className="text-white text-5xl md:text-7xl font-black tracking-tight leading-[1.1] font-headline">
              Master Your Skills <br /> with <span className="text-primary-container">Baynal Group LMS</span>
            </h1>
            <p className="text-secondary-fixed-dim text-lg md:text-xl leading-relaxed max-w-2xl font-body">
              A curated editorial learning experience designed for high-end mastery. Reject the industrial grid and embrace the sophisticated path to excellence.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-gradient-to-br from-primary to-primary-container text-white px-10 py-5 rounded-lg text-sm font-bold uppercase tracking-widest hover:translate-y-[-4px] transition-all duration-300 editorial-shadow">
                Explore Courses
              </button>
              <button className="bg-transparent border border-outline-variant/20 text-white px-10 py-5 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all duration-300">
                Our Methodology
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl rotate-3 bg-surface-container-high relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKvsgls4KtCdRIPCGVhhCldZ_0igMu8lfXEE_IhA3f8ycgDtcLjLLqIc-IQglBlRWyBWl4ROyL-2fW8SaYPi5uyN7sniH7QUHAgi2sjGuyuE1ii5x64JwDi9855WU9-Rjz-Lx7tUW4xLfyzw8YT_vQa-ABYfn4SfKhqkWyz83wgTgkoYf_5lcAEwW9woHy74Ntvn3Ylzy3oE3tzEYtendst4duijejJjllTfn9haSYVZ7G9BHBDwGOhzhMQUDTCD1Spz-jQbcCvdY"
                alt="Professional student learning in a modern high-end studio environment"
                fill
                className="object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A37] via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl editorial-shadow animate-bounce-slow max-w-[240px]">
              <div className="flex items-center gap-4 mb-2">
                <Award className="w-6 h-6 text-primary-container fill-primary-container" />
                <span className="text-xs font-bold uppercase tracking-tighter text-secondary">Elite Content</span>
              </div>
              <p className="text-on-surface font-bold text-sm">Curated by world-class industry professionals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-surface py-20 px-8 relative z-20">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          <div className="text-center group">
            <div className="text-5xl font-black text-slate-900 tracking-tighter group-hover:text-primary transition-colors duration-300">10K+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-secondary mt-2">Active Students</div>
          </div>
          <div className="text-center group border-l border-outline-variant/20">
            <div className="text-5xl font-black text-slate-900 tracking-tighter group-hover:text-primary transition-colors duration-300">500+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-secondary mt-2">Elite Courses</div>
          </div>
          <div className="text-center group border-l border-outline-variant/20">
            <div className="text-5xl font-black text-slate-900 tracking-tighter group-hover:text-primary transition-colors duration-300">100+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-secondary mt-2">Master Mentors</div>
          </div>
          <div className="text-center group border-l border-outline-variant/20">
            <div className="text-5xl font-black text-slate-900 tracking-tighter group-hover:text-primary transition-colors duration-300">95%</div>
            <div className="text-xs font-bold uppercase tracking-widest text-secondary mt-2">Completion Rate</div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="bg-surface-container-low py-24 px-8 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 block">Curated Selection</span>
              <h2 className="text-4xl md:text-5xl font-black text-on-surface tracking-tight font-headline">Featured Courses</h2>
            </div>
            <Link href="/explore" className="text-sm font-bold uppercase tracking-widest text-primary border-b-2 border-primary hover:opacity-70 transition-all">
              Tüm Kursları Keşfet
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <div className="col-span-full py-20 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xl font-bold text-secondary">Kurslar Yükleniyor...</p>
              </div>
            ) : featuredCourses.length > 0 ? (
              featuredCourses.map((course, index) => (
                <div key={course.id} className={`group bg-surface-container-lowest p-4 rounded-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative ${index === 2 ? 'lg:mt-12' : ''}`}>
                  <div className="aspect-video rounded-md overflow-hidden bg-surface-variant mb-6 relative">
                    <img
                      src={course.thumbnailUrl || course.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDQgujRW79L40vULax98e5F7LHG3mvkGp5qSnBqIyOPUbY9cJubl8Lx8fw1XWQYX0WGbinOJQs-mYui0KiAS0oViGEOeyxSqilsE4WA_ZOr0QbWLlRIoniNQkSTDGMUo0r2duKy5eGMNVg4V7bCn1V456gc7u-GtzKmm5KfcRMzOa3xc9d73B6n2IlqFFDWU6kVwOU1jEhF2lzIzZ8CL4jdwKclyeecW9MycFEcprubLn-Lo0oq42WEQo2FKBXSgy9C34EnLJSMf7M"}
                      alt={course.title || "Course"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-[#1A1A37]/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">{course.category || "General"}</div>
                  </div>
                  <div className="px-2 pb-4">
                    <h3 className="text-xl font-bold text-on-surface mb-2 leading-tight">{course.title}</h3>
                    <p className="text-sm text-secondary mb-6 font-medium">Instructor: {course.instructor || "Belirtilmedi"}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-2/3 h-1 bg-surface-variant rounded-full overflow-hidden">
                        <div className="h-full bg-primary-container" style={{ width: '0%' }}></div>
                      </div>
                      <span className="text-[10px] font-black text-on-surface uppercase tracking-tighter">Başlanmadı</span>
                    </div>
                    <Link href={`/courses/${course.id}`} className="block text-center w-full bg-gradient-to-br from-primary to-primary-container text-white py-3 rounded text-xs font-bold uppercase tracking-widest transition-all duration-300 editorial-shadow">Detayları İncele</Link>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-primary-container w-0 group-hover:w-full transition-all duration-300"></div>
                </div>
              ))
            ) : (
               <div className="col-span-full py-20 text-center">
                 <p className="text-xl font-bold text-slate-500">Henüz öne çıkan kurs bulunmuyor.</p>
               </div>
            )}
          </div>
          
          <div className="flex justify-center mt-12 w-full">
            <Link href="/explore" className="bg-transparent border border-primary text-primary px-10 py-5 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-primary/5 transition-all duration-300">
              Tüm Kursları Keşfet
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
