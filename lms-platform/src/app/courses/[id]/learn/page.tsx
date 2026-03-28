'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';

export default function CoursePlayerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Player State
  const [activeItem, setActiveItem] = useState<any>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  // Exam State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);

  // Progress State
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const docRef = doc(db, 'courses', id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setCourse(data);
          
          if (data.curriculum && data.curriculum.length > 0 && data.curriculum[0].items && data.curriculum[0].items.length > 0) {
            setActiveItem(data.curriculum[0].items[0]);
            setActiveSectionId(data.curriculum[0].id);
          }
        } else {
          console.error('Kurs bulunamadı!');
        }
      } catch (error) {
        console.error('Hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Handle Exam Item Activation
  useEffect(() => {
    if (activeItem?.type === 'exam' && activeItem.questions) {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setShowResults(false);

      if (activeItem.shuffleQuestions) {
        const shuffled = [...activeItem.questions].sort(() => Math.random() - 0.5);
        setShuffledQuestions(shuffled);
      } else {
        setShuffledQuestions(activeItem.questions);
      }
    }
  }, [activeItem]);

  // Exam Score Helper Functions (Must be before hooks/returns)
  const calculateScore = () => {
    let score = 0;
    shuffledQuestions.forEach((q) => {
       if (selectedAnswers[q.id] === q.correctAnswerIndex) {
         score += q.points || 0;
       }
    });
    return score;
  };

  let totalPossibleScore = 0;
  let userScore = 0;
  let passed = false;
  let passingScore = 70;

  if (activeItem?.type === 'exam' && shuffledQuestions.length > 0) {
    totalPossibleScore = shuffledQuestions.reduce((acc, q) => acc + (q.points || 0), 0);
    userScore = calculateScore();
    passingScore = activeItem.passingScore || 70;
    
    const percentage = totalPossibleScore > 0 ? (userScore / totalPossibleScore) * 100 : 0;
    passed = percentage >= passingScore;
  }

  useEffect(() => {
    if (activeItem?.type === 'exam' && showResults && passed) {
      setCompletedItems(prev => {
        if (!prev.includes(activeItem.id)) return [...prev, activeItem.id];
        return prev;
      });
    }
  }, [showResults, passed, activeItem]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-[#ff7e31] border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-medium tracking-wide animate-pulse">Ders Ortamı Yükleniyor...</h2>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <span className="material-symbols-outlined text-6xl text-slate-600 mb-6">error</span>
        <h2 className="text-2xl font-bold mb-4">Kurs Bulunamadı</h2>
        <button onClick={() => router.back()} className="text-[#ff7e31] hover:text-white transition-colors border border-slate-700 px-6 py-2 rounded-lg mt-4">
          Geri Dön
        </button>
      </main>
    );
  }

  if (!course.curriculum || course.curriculum.length === 0) {
    return (
      <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <span className="material-symbols-outlined text-6xl text-slate-600 mb-6">hourglass_empty</span>
        <h2 className="text-2xl font-bold mb-4">Bu Kursun Müfredatı Henüz Hazırlanmamış</h2>
        <button onClick={() => router.back()} className="text-[#ff7e31] hover:text-white transition-colors border border-slate-700 px-6 py-2 rounded-lg mt-4">
          Geri Dön
        </button>
      </main>
    );
  }

  // Check if it's a YouTube link
  const isYoutube = activeItem?.videoUrl && (activeItem.videoUrl.includes('youtube.com') || activeItem.videoUrl.includes('youtu.be'));
  const getYoutubeEmbedUrl = (url: string) => {
    let videoId = '';
    if (url.includes('youtu.be/')) {
       videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
       videoId = new URLSearchParams(url.split('?')[1]).get('v') || '';
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  };

  // Exam Interaction Functions
  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const totalItems = course?.curriculum?.reduce((acc: number, section: any) => acc + section.items.length, 0) || 0;
  const progressPercentage = totalItems > 0 ? Math.round((completedItems.length / totalItems) * 100) : 0;

  const toggleComplete = (itemId: string) => {
    setCompletedItems(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 bg-slate-900 text-white flex items-center justify-between px-6 shrink-0 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors text-sm font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kurs Detayına Dön
          </button>
          <div className="w-px h-6 bg-slate-700 hidden md:block"></div>
          <h1 className="text-sm font-bold truncate hidden md:block text-slate-300">{course.title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold tracking-tight text-slate-300">%{progressPercentage} Tamamlandı</span>
          <div className="w-32 md:w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#9e4200] to-[#ff7e31] transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
      </header>

      {/* Main Content: Player & Sidebar */}
      <main className="flex-1 max-w-screen-3xl mx-auto w-full">
        <div className="grid grid-cols-1 xl:grid-cols-4 h-full min-h-[calc(100vh-64px)]">
          
          {/* Left Side: Content Area (span-3) */}
          <div className="xl:col-span-3 flex flex-col border-r border-slate-200 bg-white">
            
            <div className="flex-1 bg-slate-50 flex flex-col relative w-full border-b border-slate-200">
              
              {/* VIDEO MODULE */}
              {activeItem?.type === 'video' && (
                <div className="w-full aspect-video bg-black relative shadow-sm max-h-[70vh] flex justify-center items-center overflow-hidden">
                  {activeItem.videoUrl ? (
                    isYoutube ? (
                      <iframe 
                        className="w-full h-full absolute inset-0"
                        src={getYoutubeEmbedUrl(activeItem.videoUrl)} 
                        title="Video Player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video 
                        className="w-full h-full object-contain"
                        controls
                        autoPlay
                      >
                        <source src={activeItem.videoUrl} type="video/mp4" />
                        Tarayıcınız video etiketini desteklemiyor.
                      </video>
                    )
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 bg-slate-900 border-b border-slate-800">
                      <span className="material-symbols-outlined text-6xl mb-4 text-slate-700">video_off</span>
                      <p className="font-medium text-slate-400">Bu ders için video içeriği atanmamış.</p>
                    </div>
                  )}
                </div>
              )}

              {/* DOCUMENT MODULE */}
              {activeItem?.type === 'document' && (
                <div className="w-full flex-1 flex flex-col items-center justify-center p-8 lg:p-12 text-center bg-white">
                  <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-5xl text-blue-500 drop-shadow-sm">picture_as_pdf</span>
                  </div>
                  <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">{activeItem.title}</h3>
                  <p className="text-slate-500 mb-8 max-w-md leading-relaxed">Bu eğitim içeriği bir PDF dökümanıdır. Dökümanı tarayıcınızda görüntülemek veya cihazınıza indirmek için aşağıdaki butonu kullanabilirsiniz.</p>
                  {activeItem.pdfUrl ? (
                    <a href={activeItem.pdfUrl} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">download</span>
                      DÖKÜMANI GÖRÜNTÜLE
                    </a>
                  ) : (
                    <button disabled className="bg-slate-200 text-slate-400 px-8 py-4 rounded-xl font-bold uppercase tracking-widest cursor-not-allowed">
                      DÖKÜMAN LİNKİ EKSİK
                    </button>
                  )}
                </div>
              )}

              {/* EXAM MODULE */}
              {activeItem?.type === 'exam' && (
                <div className="w-full flex-1 bg-white p-6 md:p-12 overflow-y-auto">
                  {!showResults ? (
                    shuffledQuestions.length > 0 ? (
                      <div className="max-w-3xl mx-auto py-8">
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                          <span className="text-sm font-bold uppercase tracking-widest text-[#ff7e31] bg-orange-50 px-4 py-2 rounded-lg border border-orange-100 shadow-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">quiz</span>
                            Soru {currentQuestionIndex + 1} / {shuffledQuestions.length}
                          </span>
                          <span className="text-sm font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-lg shadow-inner">
                            {shuffledQuestions[currentQuestionIndex].points || 0} Puan
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 leading-snug">
                          {shuffledQuestions[currentQuestionIndex].text}
                        </h3>

                        <div className="space-y-4">
                          {shuffledQuestions[currentQuestionIndex].options.map((opt: string, idx: number) => {
                            const qId = shuffledQuestions[currentQuestionIndex].id;
                            const isSelected = selectedAnswers[qId] === idx;
                            const isTrueFalse = shuffledQuestions[currentQuestionIndex].type === 'true-false';
                            
                            return (
                              <button
                                key={idx}
                                onClick={() => handleAnswerSelect(qId, idx)}
                                className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-5 ${
                                  isSelected 
                                    ? 'border-[#ff7e31] bg-orange-50/50 shadow-md ring-4 ring-orange-500/10' 
                                    : 'border-slate-200 hover:border-[#ff7e31]/40 hover:bg-orange-50/20 hover:shadow-sm'
                                }`}
                              >
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected ? 'border-[#ff7e31] bg-[#ff7e31]' : 'border-slate-300'
                                }`}>
                                  {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                                </div>
                                
                                {!isTrueFalse && (
                                  <span className={`text-slate-400 font-bold bg-white border border-slate-200 w-8 h-8 rounded-lg flex justify-center items-center shadow-sm ${isSelected ? 'text-[#ff7e31] border-orange-200' : ''}`}>
                                    {String.fromCharCode(65 + idx)}
                                  </span>
                                )}
                                
                                <span className={`text-lg font-medium flex-1 ${isSelected ? 'text-[#9e4200]' : 'text-slate-700'}`}>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-12 flex justify-end pt-8 border-t border-slate-100">
                          <button
                            onClick={handleNextQuestion}
                            disabled={selectedAnswers[shuffledQuestions[currentQuestionIndex].id] === undefined}
                            className="bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 hover:-translate-y-1 text-white px-8 py-4 rounded-xl font-bold border border-slate-800 uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl"
                          >
                            {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Sonraki Soru' : 'Sınavı Bitir'}
                            <span className="material-symbols-outlined text-[18px]">
                              {currentQuestionIndex < shuffledQuestions.length - 1 ? 'arrow_forward' : 'done_all'}
                            </span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-32 text-slate-500 font-medium h-full">
                        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">sentiment_dissatisfied</span>
                        Bu sınavda henüz hiç soru atanmamış.
                      </div>
                    )
                  ) : (
                    /* Results Screen */
                    <div className="max-w-2xl mx-auto text-center py-16 animate-fade-in">
                      <div className={`w-36 h-36 mx-auto rounded-full flex items-center justify-center mb-8 shadow-2xl ${
                        passed ? 'bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-500 shadow-emerald-500/20 border border-emerald-200' : 'bg-gradient-to-br from-red-100 to-red-50 text-red-500 shadow-red-500/20 border border-red-200'
                      }`}>
                        <span className="material-symbols-outlined text-[72px]" style={{fontVariationSettings:"'FILL' 1"}}>
                          {passed ? 'check_circle' : 'cancel'}
                        </span>
                      </div>
                      
                      <h2 className={`text-5xl font-black tracking-tighter mb-6 ${passed ? 'text-emerald-600' : 'text-red-600'}`}>
                        {passed ? 'Tebrikler, Geçtiniz!' : 'Sınavı Geçemediniz!'}
                      </h2>
                      
                      <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-lg mx-auto">
                        {passed 
                          ? 'Gereken barajı aşarak bu modülü başarıyla tamamladınız. Sonraki içeriğe ilerleyebilirsiniz.' 
                          : 'Maalesef bu modül için belirlenen geçme notunun altında kaldınız. Müfredatı tekrar incelemenizi öneririz.'}
                      </p>

                      <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 inline-block text-left w-full max-w-md mx-auto shadow-inner relative overflow-hidden">
                        {/* Decorative Background Icon */}
                        <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-[180px] text-slate-200/50 pointer-events-none select-none">military_tech</span>
                        
                        <div className="relative z-10">
                          <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-200">
                            <span className="text-slate-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                              <span className="material-symbols-outlined text-[16px]">score</span>
                              Sınav Puanınız
                            </span>
                            <span className={`text-4xl font-black tracking-tight ${passed ? 'text-emerald-600' : 'text-red-500'}`}>
                              {Math.round(totalPossibleScore > 0 ? (userScore / totalPossibleScore) * 100 : 0)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-200">
                            <span className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                              <span className="material-symbols-outlined text-[16px]">flag</span>
                              Hedef (Geçme Notu)
                            </span>
                            <span className="text-xl font-bold text-slate-800">{passingScore} Puan</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                              <span className="material-symbols-outlined text-[16px]">format_list_numbered</span>
                              Toplam Soru Skalası
                            </span>
                            <span className="text-xl font-bold text-slate-800">{shuffledQuestions.length} Soru</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-12">
                        {!passed && (
                           <button onClick={() => {
                             setCurrentQuestionIndex(0);
                             setSelectedAnswers({});
                             setShowResults(false);
                           }} className="bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-800 hover:text-slate-900 px-10 py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 mx-auto transition-all hover:shadow-lg">
                             <span className="material-symbols-outlined text-[18px]">refresh</span>
                             Sınavı Tekrar Başlat
                           </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Content Bottom Info Bar */}
            <div className="p-8 md:p-10 bg-white border-t border-slate-100 relative">
              
              {/* Mark Complete Toggle */}
              {activeItem && activeItem.type !== 'exam' && (
                 <div className="absolute top-8 right-8 flex items-center gap-3">
                   <span className="text-sm font-bold text-slate-600 hidden md:block">Öğrenimi Tamamla</span>
                   <button 
                     onClick={() => toggleComplete(activeItem.id)}
                     className={`w-14 h-8 rounded-full flex items-center transition-colors p-1 ${completedItems.includes(activeItem?.id) ? 'bg-emerald-500' : 'bg-slate-300'}`}
                   >
                     <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform ${completedItems.includes(activeItem?.id) ? 'translate-x-6' : 'translate-x-0'}`}></div>
                   </button>
                 </div>
              )}
              {activeItem?.type === 'exam' && completedItems.includes(activeItem?.id) && (
                 <div className="absolute top-8 right-8 flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg border border-emerald-200 shadow-sm">
                   <span className="material-symbols-outlined text-xl">verified</span>
                   <span className="text-sm font-bold uppercase tracking-widest hidden md:block">Sınav Tamamlandı</span>
                 </div>
              )}

              <div className="flex items-center gap-3 mb-4 mt-8 md:mt-0">
                <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded shadow-sm
                    ${activeItem?.type === 'video' ? 'text-[#9e4200] bg-orange-100 border border-orange-200' : 
                      activeItem?.type === 'document' ? 'text-blue-700 bg-blue-100 border border-blue-200' : 
                      'text-emerald-700 bg-emerald-100 border border-emerald-200'}
                  `}>
                    {activeItem?.type === 'video' ? 'VİDEO İÇERİĞİ' : activeItem?.type === 'document' ? 'PDF DOKÜMAN' : 'MODÜL SINAVI'}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                 {activeItem?.title || course.title}
              </h1>
              <h2 className="text-lg flex items-center gap-2 text-[#ff7e31] font-semibold mb-8">
                 <span className="material-symbols-outlined text-[20px]">
                   {activeItem?.type === 'video' ? 'smart_display' : activeItem?.type === 'document' ? 'integration_instructions' : 'psychology'}
                 </span>
                 {course.title} Modülü
              </h2>
              
              <div className="border-t border-slate-100 pt-8 mt-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">info</span>
                  Ders Bilgisi
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base max-w-3xl border-l-4 border-[#ff7e31] pl-6 py-2 bg-orange-50/50 rounded-r-xl">
                  {course.description || 'Bu ders için hazırlanan açıklama metni.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Curriculum Sidebar (span-1) */}
          <div className="xl:col-span-1 border-l border-slate-200 bg-slate-50 flex flex-col h-full xl:sticky xl:top-16 xl:h-[calc(100vh-64px)] overflow-hidden shrink-0">
            <div className="p-6 bg-white border-b border-slate-200 shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.03)] z-10 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ff7e31]">format_list_bulleted</span>
                  Kurs Müfredatı
                </h3>
                <p className="text-xs text-slate-500 mt-2 font-medium">{course.curriculum?.reduce((acc: number, section: any) => acc + section.items.length, 0)} Toplam Öğrenim Modülü</p>
              </div>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
              <div className="space-y-8">
                {course.curriculum?.map((section: any, idx: number) => (
                  <div key={section.id}>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 px-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      BÖLÜM {idx + 1}: {section.sectionTitle}
                    </h4>
                    <div className="space-y-2 relative">
                      {/* Visual Line */}
                      <div className="absolute left-6 top-6 bottom-6 w-px bg-slate-200 -z-10"></div>

                      {section.items.map((item: any) => {
                        const isActive = activeItem?.id === item.id;
                        return (
                          <button 
                            key={item.id}
                            onClick={() => { setActiveItem(item); setActiveSectionId(section.id); }}
                            className={`w-full text-left px-4 py-4 rounded-xl flex items-start gap-4 transition-all duration-300 border ${
                              isActive 
                                ? 'bg-white border-orange-200 shadow-md ring-2 ring-orange-500/10 scale-[1.02]' 
                                : 'bg-transparent border-transparent hover:bg-slate-100 hover:border-slate-200'
                            }`}
                          >
                            <div className={`relative w-10 h-10 rounded-full flex flex-col items-center justify-center shrink-0 border-2 transition-colors ${
                              isActive 
                                ? 'bg-[#ff7e31] text-white border-white shadow-xl shadow-orange-500/30' 
                                : 'bg-white text-slate-400 border-slate-200'
                            }`}>
                              <span className="material-symbols-outlined text-[18px]">
                                {item.type === 'video' ? 'play_arrow' : item.type === 'document' ? 'description' : 'quiz'}
                              </span>
                              {completedItems.includes(item.id) && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                                  <span className="material-symbols-outlined text-[10px] text-white font-bold" style={{fontVariationSettings:"'wght' 900"}}>check</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 py-0.5">
                              <h5 className={`text-sm font-bold leading-snug mb-1.5 ${
                                isActive ? 'text-[#9e4200]' : 'text-slate-700'
                              }`}>
                                {item.title}
                              </h5>
                              <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <span className={`material-symbols-outlined text-[14px] ${isActive ? 'text-[#ff7e31]' : ''}`}>
                                  {item.type === 'video' ? 'schedule' : item.type === 'document' ? 'file_present' : 'format_list_numbered'}
                                </span>
                                {item.type === 'video' ? item.duration : item.type === 'document' ? 'PDF DOKÜMAN' : `${item.questions?.length || 0} SORU`}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
      
      {/* Basic style for the custom-scrollbar to make scroll area elegant */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}} />
    </div>
  );
}
