import Link from 'next/link';

interface CourseCardProps {
  id: string;
  thumbnail: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  price: string;
  title: string;
  description: string;
  lessons: number;
}

export default function CourseCard({
  id,
  thumbnail,
  category,
  categoryColor,
  categoryBg,
  price,
  title,
  description,
  lessons
}: CourseCardProps) {
  return (
    <Link href={`/course-detail`} className="soft-reveal group bg-white rounded-lg flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(92,91,124,0.08)] transition-all duration-300 relative overflow-hidden" style={{ textDecoration: 'none' }}>
      <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
        <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Course Thumbnail" src={thumbnail} />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <span 
            className="text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-1 rounded"
            style={{ color: categoryColor, backgroundColor: categoryBg }}
          >
            {category}
          </span>
          <span className="text-[#ff7e31] font-black text-lg">{price}</span>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-3 group-hover:text-[#9e4200] transition-colors">{title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">{description}</p>
        <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">{lessons} Lessons</span>
          <span className="text-[#9e4200] font-bold text-xs tracking-widest uppercase flex items-center gap-1 group/btn">
              View Details
              <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff7e31] opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </Link>
  );
}
