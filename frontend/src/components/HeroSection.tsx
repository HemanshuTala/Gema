import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Star } from 'lucide-react';

interface HeroSectionProps {
  onEnrollClick: () => void;
  onExploreClick: () => void;
}

const CustomSparkle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={`w-8 h-8 ${className}`}>
    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" fill="currentColor" />
  </svg>
);

export default function HeroSection({ onEnrollClick, onExploreClick }: HeroSectionProps) {
  return (
    <section className="pt-16 pb-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative">
      
      {/* Decorative Custom SVGs */}
      <CustomSparkle className="absolute top-10 left-10 text-brand-sunshine opacity-40 dark:opacity-60 animate-float-slow" />
      <CustomSparkle className="absolute top-1/2 left-4 text-brand-indigo dark:text-[#8b93ff] opacity-30 dark:opacity-50 animate-float-fast w-6 h-6" />
      <CustomSparkle className="absolute bottom-10 left-1/3 text-brand-bubblegum opacity-30 dark:opacity-50 animate-float-slow w-7 h-7" />
      <CustomSparkle className="absolute top-12 right-10 text-brand-mint opacity-40 dark:opacity-60 animate-float-fast w-8 h-8" />
      
      {/* Background Soft Blobs */}
      <svg className="absolute -top-10 left-1/4 w-72 h-72 text-brand-indigo/5 dark:text-brand-indigo/2 pointer-events-none -z-10" viewBox="0 0 200 200">
        <path fill="currentColor" d="M45,-60.8C59.3,-50.2,72.6,-38.1,78.2,-22.8C83.8,-7.4,81.7,11.2,74.5,27.1C67.3,43.1,55.1,56.5,40.1,64.9C25.1,73.3,7.4,76.8,-10.8,75C-29,73.2,-47.7,66.1,-59.5,52.8C-71.3,39.6,-76.3,20.2,-77.1,0.5C-77.9,-19.2,-74.6,-39.2,-63.3,-50.2C-52.1,-61.2,-32.9,-63.2,-15.8,-63.3C1.4,-63.4,18.7,-61.7,30.8,-61.4C42.8,-61,49.8,-62.1,45,-60.8Z" transform="translate(100 100)" />
      </svg>

      {/* Left text column */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-7 space-y-6 text-center lg:text-left relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF0F5] dark:bg-[#ff007f]/5 border-2 border-[#FFB3D1] dark:border-brand-bubblegum/20 rounded-full text-brand-bubblegum text-xs font-black uppercase tracking-wider animate-bounce" style={{ animationDuration: '3s' }}>
          <Sparkles className="w-3.5 h-3.5 text-brand-bubblegum" /> Super Fun Summer Camp 2026
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-dark dark:text-white leading-[1.08] font-display">
          Discover the Magic of <br />
          <span className="text-brand-indigo dark:text-[#8b93ff]">AI & Robotics!</span>
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-bold font-sans">
          Welcome to the ultimate online playroom! Kids aged 8–14 learn to program cool virtual robots, design interactive computer games, and discover how smart AIs think.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
          <button
            onClick={onEnrollClick}
            className="px-8 py-4 bg-brand-bubblegum hover:opacity-90 text-white rounded-3xl font-black text-base transition-all duration-300 transform hover:-translate-y-1 shadow-[0_8px_0_#c7005f] active:translate-y-0 active:shadow-none flex items-center justify-center gap-2 cursor-pointer"
          >
            Enroll Child Now <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={onExploreClick}
            className="px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-800 rounded-3xl font-bold transition-all duration-300 cursor-pointer shadow-[0_4px_0_#e2e8f0] dark:shadow-[0_4px_0_#0f172a]"
          >
            See What We Learn
          </button>
        </div>

        {/* Social reviews */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <img 
                key={i} 
                src={`https://images.unsplash.com/photo-${i === 1 ? '1534528741775-53994a69daeb' : i === 2 ? '1507003211169-0a1dd7228f2d' : i === 3 ? '1494790108377-be9c29b29330' : '1500648767791-00dcc994a43e'}?w=80&fit=crop&crop=faces&q=80`} 
                alt="student" 
                className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 object-cover shadow-sm" 
              />
            ))}
          </div>
          <div className="text-left font-sans">
            <div className="flex items-center text-[#FFB703]">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current animate-pulse" />)}
              <span className="ml-2 text-brand-dark dark:text-white font-black text-sm">4.9/5 Star Rating</span>
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-xs font-bold">Loved by 12,000+ kids and parents worldwide!</p>
          </div>
        </div>
      </motion.div>

      {/* Right image frame */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="lg:col-span-5 relative flex justify-center z-10"
      >
        <div className="relative w-full max-w-sm sm:max-w-md">
          {/* Neon/Sunshine glow background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-sunshine/10 rounded-full blur-[80px]" />
          
          <div className="relative child-card dark:bg-slate-900 dark:border-slate-800 p-4 border-slate-100 shadow-lg overflow-hidden">
            <div className="w-full h-80 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center border-2 border-slate-100/50 dark:border-slate-800">
              <img 
                src="/cute-robot.png" 
                alt="Cute Kids Coding Robot" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 animate-float-slow"
              />
            </div>
            
            <div className="mt-4 p-2 font-sans text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-[#E8F8F5] dark:bg-emerald-500/10 text-brand-mint text-[10px] font-black uppercase tracking-wider mb-2">
                Fun Play-Based Lessons
              </div>
              <h3 className="font-display font-black text-brand-dark dark:text-white text-base">Meet Sparky - Your Virtual Robot!</h3>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 font-bold">
                Build block programs to make Sparky dance, navigate fun labyrinths, and play audio games.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
