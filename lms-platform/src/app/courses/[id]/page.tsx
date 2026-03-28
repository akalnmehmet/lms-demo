'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import Link from 'next/link';
import { PlayCircle, FileText, CheckSquare } from 'lucide-react';

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const docRef = doc(db, 'courses', id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCourse({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error('Böyle bir kurs bulunamadı!');
        }
      } catch (error) {
        console.error('Kurs getirilirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-8 flex flex-col items-center justify-center bg-[#fcfcfc]">
        <div className="w-16 h-16 border-4 border-[#ff7e31] border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 animate-pulse">Kurs detayları yükleniyor...</h2>
        <p className="text-slate-500 mt-2">Lütfen bekleyin, veriler Firebase'den alınıyor.</p>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-8 flex flex-col items-center justify-center bg-[#fcfcfc]">
        <div className="bg-white p-12 rounded-2xl shadow-xl text-center max-w-lg w-full border border-slate-100">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-6">error</span>
          <h2 className="text-3xl font-black tracking-tighter text-slate-900 mb-4">Kurs Bulunamadı</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">Aradığınız kurs yayından kaldırılmış veya bağlantı hatalı olabilir.</p>
          <Link href="/courses" className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold tracking-wide hover:bg-slate-800 transition-colors inline-block">
            Kurslara Dön
          </Link>
        </div>
      </main>
    );
  }

  // Check if it's a YouTube link
  const isYoutube = course.videoUrl && (course.videoUrl.includes('youtube.com') || course.videoUrl.includes('youtu.be'));
  const getYoutubeEmbedUrl = (url: string) => {
    let videoId = '';
    if (url.includes('youtu.be/')) {
       videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
       videoId = new URLSearchParams(url.split('?')[1]).get('v') || '';
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-screen-xl mx-auto">
      {/* Header Info */}
      <header className="mb-10 soft-reveal">
        <Link href="/courses" className="text-slate-500 hover:text-[#ff7e31] font-medium text-sm flex items-center gap-1 mb-6 transition-colors inline-flex">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Tüm Kurslara Dön
        </Link>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-bold tracking-[0.1em] uppercase text-[#9e4200] bg-[#ffdbcb] px-3 py-1.5 rounded-md">
            {course.category || 'Genel'}
          </span>
          {course.level && (
            <span className="text-xs font-bold tracking-[0.1em] uppercase text-slate-700 bg-slate-200 px-3 py-1.5 rounded-md">
              {course.level}
            </span>
          )}
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 leading-[1.1]">
          {course.title || 'İsimsiz Kurs'}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed">
          {course.shortDescription || course.description?.substring(0, 150) || 'Bu eğitim ile kariyerinizde bir sonraki adıma geçin. Sektörün en iyi pratiklerini öğrenin ve uygulamaya hemen başlayın.'}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start soft-reveal" style={{ animationDelay: '0.1s' }}>
        {/* Left: Video & Description */}
        <div className="lg:col-span-2 space-y-12">
          {/* Video Player */}
          <div className="aspect-video w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative border border-slate-800">
            {course.videoUrl ? (
              isYoutube ? (
                <iframe 
                  className="w-full h-full absolute inset-0"
                  src={getYoutubeEmbedUrl(course.videoUrl)} 
                  title="Course Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster={course.thumbnailUrl || ''}
                >
                  <source src={course.videoUrl} type="video/mp4" />
                  Tarayıcınız video etiketini desteklemiyor.
                </video>
              )
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                <span className="material-symbols-outlined text-6xl mb-4">smart_display</span>
                <p className="font-medium text-slate-500">Video içeriği bulunmuyor veya link geçersiz.</p>
              </div>
            )}
          </div>

          {/* Description */}
          <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#ff7e31]">info</span>
              Kurs Hakkında
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
              {course.description || 'Bu kurs için detaylı bir açıklama henüz girilmemiştir.'}
            </div>
          </section>

          {/* Curriculum */}
          {course.curriculum && course.curriculum.length > 0 && (
            <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 mt-12">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-[#ff7e31]">format_list_bulleted</span>
                Kurs Müfredatı
              </h2>
              
              <div className="space-y-4">
                {course.curriculum.map((section: any, idx: number) => (
                  <div key={section.id || idx} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                      <h3 className="font-bold text-slate-800 flex items-center gap-3">
                        <span className="text-[#ff7e31] font-black text-sm">Bölüm {idx + 1}:</span>
                        {section.sectionTitle}
                      </h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {section.items && section.items.map((item: any, itemIdx: number) => (
                        <div key={item.id || itemIdx} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white hover:bg-slate-50/50 transition-colors">
                          <div className="flex items-start sm:items-center gap-3">
                            {item.type === 'video' && <PlayCircle className="w-5 h-5 text-[#ff7e31] shrink-0" />}
                            {item.type === 'document' && <FileText className="w-5 h-5 text-blue-500 shrink-0" />}
                            {item.type === 'exam' && <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0" />}
                            <span className="text-sm font-bold text-slate-700">{item.title}</span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs font-bold text-slate-400 shrink-0 ml-8 sm:ml-0">
                            {item.type === 'video' && item.duration && (
                              <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-slate-500">
                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                {item.duration}
                              </span>
                            )}
                            {item.type === 'exam' && item.questions && (
                              <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-slate-500">
                                <span className="material-symbols-outlined text-[14px]">quiz</span>
                                {item.questions.length} Soru
                              </span>
                            )}
                            {item.type === 'document' && (
                              <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded uppercase tracking-widest text-[10px] text-slate-500">
                                PDF
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right: Sidebar Panel */}
        <div className="lg:col-span-1 border-t lg:border-t-0 p-8 lg:p-0 border-slate-100 soft-reveal" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sticky top-32">
            <div className="mb-8">
              <span className="text-4xl font-black text-slate-900 tracking-tight">
                {course.price ? `₺${course.price}` : 'Ücretsiz'}
              </span>
              {course.originalPrice && (
                <span className="text-lg text-slate-400 line-through ml-3 font-medium">
                  ₺{course.originalPrice}
                </span>
              )}
            </div>

            <Link href={`/courses/${course.id}/learn`} className="w-full bg-gradient-to-r from-[#9e4200] to-[#ff7e31] hover:scale-[1.02] active:scale-95 text-white py-4 rounded-xl font-black tracking-widest uppercase text-sm shadow-xl shadow-orange-500/20 transition-all mb-3 flex items-center justify-center gap-2" style={{ textDecoration: 'none' }}>
              <span className="material-symbols-outlined text-xl">play_circle</span>
              EĞİTİME BAŞLA
            </Link>

            <Link href={`/admin/edit-course/${course.id}`} className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-[#ff7e31] hover:bg-orange-50 border border-slate-200 hover:border-orange-200 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all mb-6" style={{ textDecoration: 'none' }}>
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Eğitimi Düzenle
            </Link>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-[#ff7e31]">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400">Eğitmen</span>
                  <strong className="text-slate-900">{course.instructor || 'Belirtilmedi'}</strong>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-[#ff7e31]">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400">Tahmini Süre</span>
                  <strong className="text-slate-900">{course.duration ? course.duration : 'Belirtilmedi'}</strong>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-[#ff7e31]">
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400">Ders Sayısı</span>
                  <strong className="text-slate-900">{course.lessonsCount || course.lessons || 0} Ders</strong>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-[#ff7e31]">
                  <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400">Sertifika</span>
                  <strong className="text-slate-900">Bitirme Sertifikası</strong>
                </div>
              </li>
            </ul>

            <div className="border-t border-slate-100 pt-6">
              <p className="text-xs text-slate-500 text-center leading-relaxed">
                Bu eğitime katıldığınızda Kullanıcı Sözleşmesi'ni kabul etmiş sayılırsınız.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
