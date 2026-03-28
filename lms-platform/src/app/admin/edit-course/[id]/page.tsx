'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [activeTab, setActiveTab] = useState<'general' | 'curriculum'>('general');
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    instructor: '',
    category: 'Development',
    level: 'Beginner',
    duration: '',
    price: '',
    outcomes: ''
  });

  const [curriculum, setCurriculum] = useState<any[]>([]);

  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing course data on mount
  useEffect(() => {
    if (!id) return;
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, 'courses', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            title: data.title || '',
            description: data.description || '',
            thumbnailUrl: data.thumbnailUrl || '',
            instructor: data.instructor || '',
            category: data.category || 'Development',
            level: data.level || 'Beginner',
            duration: data.duration || '',
            price: data.price?.toString() || '',
            outcomes: data.outcomes || ''
          });
          setCurriculum(data.curriculum || []);
        }
      } catch (error) {
        console.error('Kurs verisi alınamadı:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSection = () => {
    setCurriculum([
      ...curriculum,
      { id: Date.now().toString(), sectionTitle: `Yeni Bölüm ${curriculum.length + 1}`, items: [] }
    ]);
  };

  const handleUpdateSectionTitle = (sectionId: string, title: string) => {
    setCurriculum(curriculum.map(sec => sec.id === sectionId ? { ...sec, sectionTitle: title } : sec));
  };

  const handleRemoveSection = (sectionId: string) => {
    setCurriculum(curriculum.filter(sec => sec.id !== sectionId));
  };

  const handleAddItem = (sectionId: string, type: 'video' | 'document' | 'exam') => {
    const newItem: any = { id: Date.now().toString(), type, title: `Yeni ${type === 'video' ? 'Video' : type === 'document' ? 'PDF' : 'Sınav'}` };

    if (type === 'video') {
      newItem.videoUrl = '';
      newItem.duration = '';
    } else if (type === 'document') {
      newItem.pdfUrl = '';
    } else if (type === 'exam') {
      newItem.passingScore = 70;
      newItem.shuffleQuestions = false;
      newItem.questions = [];
    }

    setCurriculum(curriculum.map(sec => {
      if (sec.id === sectionId) {
        return { ...sec, items: [...sec.items, newItem] };
      }
      return sec;
    }));
  };

  const handleUpdateItem = (sectionId: string, itemId: string, field: string, value: any) => {
    setCurriculum(curriculum.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          items: sec.items.map((item: any) => item.id === itemId ? { ...item, [field]: value } : item)
        };
      }
      return sec;
    }));
  };

  const handleRemoveItem = (sectionId: string, itemId: string) => {
    setCurriculum(curriculum.map(sec => {
      if (sec.id === sectionId) {
        return { ...sec, items: sec.items.filter((item: any) => item.id !== itemId) };
      }
      return sec;
    }));
  };

  const handleAddQuestion = (sectionId: string, examId: string) => {
    const newQuestion = {
      id: Date.now().toString(),
      type: 'multiple-choice',
      text: 'Yeni Soru',
      points: 10,
      options: ['Seçenek A', 'Seçenek B', 'Seçenek C', 'Seçenek D'],
      correctAnswerIndex: 0
    };

    setCurriculum(curriculum.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          items: sec.items.map((item: any) => {
            if (item.id === examId && item.type === 'exam') {
              return { ...item, questions: [...(item.questions || []), newQuestion] };
            }
            return item;
          })
        };
      }
      return sec;
    }));
  };

  const handleUpdateQuestion = (sectionId: string, examId: string, questionId: string, field: string, value: any) => {
    setCurriculum(curriculum.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          items: sec.items.map((item: any) => {
            if (item.id === examId && item.type === 'exam') {
              return {
                ...item,
                questions: item.questions.map((q: any) => q.id === questionId ? { ...q, [field]: value } : q)
              };
            }
            return item;
          })
        };
      }
      return sec;
    }));
  };

  const handleQuestionTypeChange = (sectionId: string, examId: string, questionId: string, newType: 'multiple-choice' | 'true-false') => {
    setCurriculum(curriculum.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          items: sec.items.map((item: any) => {
            if (item.id === examId && item.type === 'exam') {
              return {
                ...item,
                questions: item.questions.map((q: any) => {
                  if (q.id === questionId) {
                    if (newType === 'true-false') {
                      return { ...q, type: newType, options: ['Doğru', 'Yanlış'], correctAnswerIndex: 0 };
                    } else {
                      return { ...q, type: newType, options: ['Seçenek A', 'Seçenek B', 'Seçenek C', 'Seçenek D'], correctAnswerIndex: 0 };
                    }
                  }
                  return q;
                })
              };
            }
            return item;
          })
        };
      }
      return sec;
    }));
  };

  const handleUpdateQuestionOption = (sectionId: string, examId: string, questionId: string, optionIndex: number, value: string) => {
    setCurriculum(curriculum.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          items: sec.items.map((item: any) => {
            if (item.id === examId && item.type === 'exam') {
              return {
                ...item,
                questions: item.questions.map((q: any) => {
                  if (q.id === questionId) {
                    const newOptions = [...q.options];
                    newOptions[optionIndex] = value;
                    return { ...q, options: newOptions };
                  }
                  return q;
                })
              };
            }
            return item;
          })
        };
      }
      return sec;
    }));
  };

  const handleRemoveQuestion = (sectionId: string, examId: string, questionId: string) => {
    setCurriculum(curriculum.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          items: sec.items.map((item: any) => {
            if (item.id === examId && item.type === 'exam') {
              return {
                ...item,
                questions: item.questions.filter((q: any) => q.id !== questionId)
              };
            }
            return item;
          })
        };
      }
      return sec;
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      await updateDoc(doc(db, 'courses', id), {
        ...formData,
        price: Number(formData.price),
        curriculum,
        updatedAt: new Date()
      });

      setStatus({ type: 'success', message: 'Eğitim başarıyla güncellendi! Yönlendiriliyorsunuz...' });

      setTimeout(() => {
        router.push('/explore');
      }, 2000);
    } catch (error: any) {
      console.error('Error updating document: ', error);
      setStatus({ type: 'error', message: `Hata oluştu: ${error.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f6f3f2] flex items-center justify-center font-sans">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 px-16 py-14 flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-[#FF7E31] animate-spin"></div>
          </div>
          <div className="text-center">
            <p className="text-slate-800 font-black text-lg tracking-tight">Kurs bilgileri yükleniyor...</p>
            <p className="text-slate-400 text-sm mt-1">Lütfen bekleyin</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f3f2] py-12 px-6 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">

        {/* Header */}
        <div className="bg-[#1A1A37] px-8 py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FF7E31]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#FF7E31] text-2xl">edit</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Kurs Düzenle</h1>
              <p className="text-slate-400 text-sm mt-1">Mevcut kurs bilgilerini ve müfredatını güncelleyin.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              handleSubmit(e as any);
            }}
            disabled={isSubmitting}
            className="bg-gradient-to-br from-[#9e4200] to-[#FF7E31] disabled:opacity-70 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-widest shadow-xl shadow-orange-500/20 flex items-center gap-2 hover:-translate-y-1 transition-all"
          >
            {isSubmitting ? 'Güncelleniyor...' : 'Güncelle'}
            {!isSubmitting && <span className="material-symbols-outlined text-[18px]">save</span>}
          </button>
        </div>

        {/* Status Message */}
        {status.message && (
          <div className={`mx-8 mt-8 p-4 rounded-lg flex items-center gap-3 text-sm font-bold ${
            status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            <span className="material-symbols-outlined">
              {status.type === 'success' ? 'check_circle' : 'error'}
            </span>
            {status.message}
          </div>
        )}

        {/* Tabs */}
        <div className="px-8 mt-8 border-b border-slate-200 flex gap-8">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`pb-4 text-sm font-bold tracking-widest uppercase transition-colors relative ${activeTab === 'general' ? 'text-[#FF7E31]' : 'text-slate-400 hover:text-slate-700'}`}
          >
            Genel Bilgiler
            {activeTab === 'general' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF7E31]"></div>}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('curriculum')}
            className={`pb-4 text-sm font-bold tracking-widest uppercase transition-colors relative ${activeTab === 'curriculum' ? 'text-[#FF7E31]' : 'text-slate-400 hover:text-slate-700'}`}
          >
            Müfredat Oluşturucu
            {activeTab === 'curriculum' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF7E31]"></div>}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8">

          {/* GENERAL TAB */}
          {activeTab === 'general' && (
            <div className="space-y-8 animate-fade-in relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Kurs Başlığı</label>
                  <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF7E31]/20 focus:border-[#FF7E31] outline-none transition-all placeholder-slate-400" placeholder="Örn: İleri Seviye Sistem Mimarisi" />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Detaylı Açıklama</label>
                  <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF7E31]/20 focus:border-[#FF7E31] outline-none transition-all placeholder-slate-400 resize-none" placeholder="Kursun içeriğini ve hedeflerini açıklayın..."></textarea>
                </div>

                {/* Thumbnail URL */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Kapak Fotoğrafı URL</label>
                  <input required type="url" name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF7E31]/20 focus:border-[#FF7E31] outline-none transition-all" placeholder="https://" />
                </div>

                {/* Instructor */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Eğitmen Adı</label>
                  <input required type="text" name="instructor" value={formData.instructor} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF7E31]/20 focus:border-[#FF7E31] outline-none transition-all" placeholder="Örn: Dr. Richard Vance" />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Kategori</label>
                  <select required name="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF7E31]/20 focus:border-[#FF7E31] outline-none transition-all appearance-none cursor-pointer">
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Technology">Technology</option>
                    <option value="Security">Security</option>
                    <option value="Creative">Creative</option>
                  </select>
                </div>

                {/* Level */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Zorluk Seviyesi</label>
                  <select required name="level" value={formData.level} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF7E31]/20 focus:border-[#FF7E31] outline-none transition-all appearance-none cursor-pointer">
                    <option value="Beginner">Başlangıç</option>
                    <option value="Intermediate">Orta Seviye</option>
                    <option value="Advanced">İleri Seviye</option>
                    <option value="Masterclass">Masterclass</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Tahmini Süre</label>
                  <input required type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF7E31]/20 focus:border-[#FF7E31] outline-none transition-all" placeholder="Örn: 48 Saat" />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Fiyat (₺)</label>
                  <input required type="number" step="0.01" min="0" name="price" value={formData.price} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF7E31]/20 focus:border-[#FF7E31] outline-none transition-all" placeholder="0.00" />
                </div>

                {/* Key Outcomes */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Kazanımlar <span className="text-[10px] text-slate-400 normal-case">(Virgülle ayırın)</span></label>
                  <input required type="text" name="outcomes" value={formData.outcomes} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF7E31]/20 focus:border-[#FF7E31] outline-none transition-all" placeholder="Örn: Güçlü API mimarileri kurma, Sunucusuz teknolojiler..." />
                </div>
              </div>
            </div>
          )}

          {/* CURRICULUM TAB */}
          {activeTab === 'curriculum' && (
            <div className="space-y-8 animate-fade-in relative min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">Müfredat Yapısı</h2>
                  <p className="text-sm text-slate-500 mt-1">Bölümler (Section) ve içeriklerini (Video, PDF, Sınav) sürükleyip bırakarak buradan yönetin.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddSection}
                  className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  YENİ BÖLÜM
                </button>
              </div>

              {curriculum.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">account_tree</span>
                  <p className="text-slate-600 font-bold mb-2">Henüz bir bölüm eklenmedi.</p>
                  <p className="text-sm text-slate-400 max-w-sm mx-auto">Öğrenciler için yapılandırılmış bir müfredat oluşturmak için yeni bölüm ekleyerek başlayın.</p>
                </div>
              ) : (
                <div className="space-y-6 pb-20">
                  {curriculum.map((section, sIndex) => (
                    <div key={section.id} className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
                      {/* Section Header */}
                      <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                        <div className="flex items-center gap-4 flex-1">
                          <span className="bg-slate-200 text-slate-600 font-bold min-w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-inner">
                            {sIndex + 1}
                          </span>
                          <input
                            type="text"
                            value={section.sectionTitle}
                            onChange={(e) => handleUpdateSectionTitle(section.id, e.target.value)}
                            className="bg-white border border-slate-200 px-3 py-1.5 rounded-md font-bold text-slate-900 w-1/2 focus:ring-2 focus:ring-[#FF7E31]/20 focus:border-[#FF7E31] outline-none shadow-sm"
                            placeholder="Bölüm Başlığı"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleRemoveSection(section.id)}
                            className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            title="Bölümü Sil"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="p-4 space-y-4">
                        {section.items.map((item: any, iIndex: number) => (
                          <div key={item.id} className="border border-slate-200 rounded-lg p-4 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col gap-4 relative pl-14">

                            {/* Visual Line Connectors */}
                            <div className="absolute left-7 top-0 bottom-0 w-px bg-slate-100 -z-10"></div>

                            {/* Type Icon Indicator */}
                            <div className="absolute left-4 top-4 w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm">
                              <span className="material-symbols-outlined text-[14px]">
                                {item.type === 'video' ? 'play_circle' : item.type === 'document' ? 'description' : 'quiz'}
                              </span>
                            </div>

                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                  <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded shadow-sm
                                    ${item.type === 'video' ? 'text-[#9e4200] bg-orange-100 border border-orange-200' :
                                      item.type === 'document' ? 'text-blue-700 bg-blue-100 border border-blue-200' :
                                      'text-emerald-700 bg-emerald-100 border border-emerald-200'}
                                  `}>
                                    {item.type === 'video' ? 'VİDEO' : item.type === 'document' ? 'PDF DOKÜMAN' : 'SINAV'}
                                  </span>
                                  <input
                                    type="text"
                                    value={item.title}
                                    onChange={(e) => handleUpdateItem(section.id, item.id, 'title', e.target.value)}
                                    className="border-b border-t-0 border-x-0 border-slate-200 bg-transparent px-2 py-1 flex-1 font-bold text-slate-800 text-sm focus:border-[#FF7E31] focus:ring-0 outline-none"
                                    placeholder="İçerik Başlığı"
                                  />
                                </div>

                                {/* Video Fields */}
                                {item.type === 'video' && (
                                  <div className="flex flex-col md:flex-row gap-4 mt-2 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                                    <div className="flex-1">
                                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Video URL (YouTube/MP4)</label>
                                      <input
                                        type="text"
                                        value={item.videoUrl}
                                        onChange={(e) => handleUpdateItem(section.id, item.id, 'videoUrl', e.target.value)}
                                        className="border border-slate-200 bg-white rounded px-3 py-2 w-full text-xs focus:border-[#FF7E31] outline-none shadow-sm"
                                        placeholder="https://"
                                      />
                                    </div>
                                    <div className="w-full md:w-32">
                                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Süre</label>
                                      <input
                                        type="text"
                                        value={item.duration}
                                        onChange={(e) => handleUpdateItem(section.id, item.id, 'duration', e.target.value)}
                                        className="border border-slate-200 bg-white rounded px-3 py-2 w-full text-xs focus:border-[#FF7E31] outline-none shadow-sm"
                                        placeholder="Örn: 10:30"
                                      />
                                    </div>
                                  </div>
                                )}

                                {/* Document Fields */}
                                {item.type === 'document' && (
                                  <div className="flex gap-4 mt-2 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                                    <div className="flex-1">
                                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">PDF Bağlantı URLsi</label>
                                      <input
                                        type="text"
                                        value={item.pdfUrl}
                                        onChange={(e) => handleUpdateItem(section.id, item.id, 'pdfUrl', e.target.value)}
                                        className="border border-slate-200 bg-white rounded px-3 py-2 w-full text-xs focus:border-[#FF7E31] outline-none shadow-sm"
                                        placeholder="https://..."
                                      />
                                    </div>
                                  </div>
                                )}

                                {/* Exam Fields */}
                                {item.type === 'exam' && (
                                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-2 shadow-inner">
                                    {/* Settings Bar */}
                                    <div className="flex flex-wrap gap-6 items-center border-b border-slate-200 pb-4 mb-4">
                                      <div className="flex items-center gap-3 bg-white px-3 py-1.5 border border-slate-200 rounded-md shadow-sm">
                                        <label className="text-xs font-bold text-slate-600">Geçme Notu:</label>
                                        <input
                                          type="number"
                                          value={item.passingScore}
                                          onChange={(e) => handleUpdateItem(section.id, item.id, 'passingScore', Number(e.target.value))}
                                          className="bg-transparent rounded w-12 text-xs font-black text-center text-[#FF7E31] outline-none"
                                          min="0" max="100"
                                        />
                                        <span className="text-xs font-bold text-slate-400">%</span>
                                      </div>

                                      <label className="flex items-center gap-2 cursor-pointer group">
                                        <div className="relative">
                                          <input
                                            type="checkbox"
                                            checked={item.shuffleQuestions}
                                            onChange={(e) => handleUpdateItem(section.id, item.id, 'shuffleQuestions', e.target.checked)}
                                            className="sr-only"
                                          />
                                          <div className={`block w-10 h-6 rounded-full transition-colors ${item.shuffleQuestions ? 'bg-[#FF7E31]' : 'bg-slate-300'}`}></div>
                                          <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${item.shuffleQuestions ? 'transform translate-x-4' : ''}`}></div>
                                        </div>
                                        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Soruları Karıştır</span>
                                      </label>
                                    </div>

                                    {/* Questions */}
                                    <div className="space-y-4">
                                      <div className="flex justify-between items-center">
                                        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 bg-slate-200 px-2 py-1 rounded">Sınav Soruları ({item.questions?.length || 0})</h4>
                                        <button
                                          type="button"
                                          onClick={() => handleAddQuestion(section.id, item.id)}
                                          className="text-[11px] font-bold tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1.5 rounded-md hover:bg-emerald-100 flex items-center gap-1 transition-colors"
                                        >
                                          <span className="material-symbols-outlined text-[14px]">add</span> YENİ SORU
                                        </button>
                                      </div>

                                      {item.questions?.map((q: any, qIndex: number) => (
                                        <div key={q.id} className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm relative group overflow-hidden">
                                          {/* Delete overlay */}
                                          <button
                                            type="button"
                                            onClick={() => handleRemoveQuestion(section.id, item.id, q.id)}
                                            className="absolute top-0 right-0 h-full w-12 bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity border-l border-red-100"
                                          >
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                          </button>

                                          <div className="pr-12">
                                            <div className="flex gap-3 mb-4 items-center">
                                              <span className="bg-slate-800 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-bold shrink-0 shadow-sm">{qIndex + 1}</span>
                                              <input
                                                type="text"
                                                value={q.text}
                                                onChange={(e) => handleUpdateQuestion(section.id, item.id, q.id, 'text', e.target.value)}
                                                className="flex-1 bg-slate-50 border border-slate-200 text-sm px-3 py-2 rounded-md outline-none focus:border-[#FF7E31] font-medium text-slate-800"
                                                placeholder="Soru metnini yazın..."
                                              />
                                              <select
                                                value={q.type || 'multiple-choice'}
                                                onChange={(e) => handleQuestionTypeChange(section.id, item.id, q.id, e.target.value as 'multiple-choice' | 'true-false')}
                                                className="bg-slate-50 border border-slate-200 text-xs px-2 py-2 rounded-md outline-none focus:border-[#FF7E31] text-slate-700 font-bold"
                                              >
                                                <option value="multiple-choice">Çoktan Seçmeli</option>
                                                <option value="true-false">Doğru / Yanlış</option>
                                              </select>
                                              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-3 py-2 rounded-md">
                                                <input
                                                  type="number"
                                                  value={q.points}
                                                  onChange={(e) => handleUpdateQuestion(section.id, item.id, q.id, 'points', Number(e.target.value))}
                                                  className="w-10 bg-transparent text-xs font-bold text-center text-slate-800 outline-none"
                                                  title="Soru Puanı"
                                                />
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Puan</span>
                                              </div>
                                            </div>

                                            {/* Options Grid */}
                                            <div className={`grid gap-3 pl-9 ${q.type === 'true-false' ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
                                              {q.options.map((opt: string, optIndex: number) => (
                                                <div
                                                  key={optIndex}
                                                  className={`flex items-center gap-3 p-2 rounded-md border transition-colors ${q.correctAnswerIndex === optIndex ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                                                >
                                                  <input
                                                    type="radio"
                                                    name={`correct-${q.id}`}
                                                    checked={q.correctAnswerIndex === optIndex}
                                                    onChange={() => handleUpdateQuestion(section.id, item.id, q.id, 'correctAnswerIndex', optIndex)}
                                                    className="w-4 h-4 cursor-pointer text-[#FF7E31] focus:ring-[#FF7E31]"
                                                    title="Doğru Cevabı İşaretle"
                                                  />
                                                  {q.type === 'true-false' ? (
                                                    <span className="flex-1 text-xs font-bold text-slate-700">{opt}</span>
                                                  ) : (
                                                    <input
                                                      type="text"
                                                      value={opt}
                                                      onChange={(e) => handleUpdateQuestionOption(section.id, item.id, q.id, optIndex, e.target.value)}
                                                      className="bg-transparent flex-1 text-xs outline-none text-slate-700 font-medium"
                                                      placeholder={`Seçenek ${String.fromCharCode(65 + optIndex)}`}
                                                    />
                                                  )}
                                                  {q.correctAnswerIndex === optIndex && (
                                                    <span className="material-symbols-outlined text-[16px] text-emerald-500 mr-1">check_circle</span>
                                                  )}
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(section.id, item.id)}
                                className="text-slate-400 hover:text-red-500 hover:bg-red-50 w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0"
                                title="İçeriği Sil"
                              >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Add Item Actions */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => handleAddItem(section.id, 'video')}
                            className="bg-orange-50/50 text-[#9e4200] border border-orange-200 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-orange-100 transition-colors shadow-sm"
                          >
                            <span className="material-symbols-outlined text-[16px]">play_circle</span>
                            VİDEO EKLE
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddItem(section.id, 'document')}
                            className="bg-blue-50/50 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-blue-100 transition-colors shadow-sm"
                          >
                            <span className="material-symbols-outlined text-[16px]">description</span>
                            PDF DOKÜMAN EKLE
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddItem(section.id, 'exam')}
                            className="bg-emerald-50/50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-100 transition-colors shadow-sm"
                          >
                            <span className="material-symbols-outlined text-[16px]">quiz</span>
                            SINAV EKRANI
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
