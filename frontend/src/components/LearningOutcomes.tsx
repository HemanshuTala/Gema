import { motion } from 'framer-motion';
import { Code, Bot, Brain, Cpu, Rocket, GraduationCap, BookOpen, CheckCircle, Heart } from 'lucide-react';

export default function LearningOutcomes() {
  const outcomes = [
    {
      icon: Code,
      title: "Playful block programming",
      desc: "Drag, drop, and link puzzle blocks to create animations and mini-games.",
      color: "border-[#5C67F2]/10 dark:border-brand-indigo/15 hover:border-brand-indigo/30 shadow-[0_4px_0_rgba(92,103,242,0.05)]"
    },
    {
      icon: Bot,
      title: "Virtual Robotics Labs",
      desc: "Assemble robotic parts and direct them to navigate funny labyrinths.",
      color: "border-[#FFB703]/10 dark:border-brand-sunshine/15 hover:border-brand-sunshine/30 shadow-[0_4px_0_rgba(255,183,3,0.05)]"
    },
    {
      icon: Brain,
      title: "AI Brain Basics",
      desc: "Discover how smart machines recognise faces, read code, and think.",
      color: "border-[#8338EC]/10 dark:border-brand-purple/15 hover:border-brand-purple/30 shadow-[0_4px_0_rgba(131,56,236,0.05)]"
    },
    {
      icon: Cpu,
      title: "Fun Machine Sensors",
      desc: "Use virtual infrared lasers to stop robots colliding with walls.",
      color: "border-[#2EC4B6]/10 dark:border-brand-mint/15 hover:border-brand-mint/30 shadow-[0_4px_0_rgba(46,196,182,0.05)]"
    },
    {
      icon: Rocket,
      title: "Awesome graduation showcase",
      desc: "Design your custom graduation robot game and present it to peers.",
      color: "border-[#FF007F]/10 dark:border-brand-bubblegum/15 hover:border-brand-bubblegum/30 shadow-[0_4px_0_rgba(255,0,127,0.05)]"
    },
    {
      icon: GraduationCap,
      title: "Young Engineer certificate",
      desc: "Earn a glowing, shareable certificate to show off to friends and teachers.",
      color: "border-[#8338EC]/10 dark:border-brand-purple/15 hover:border-brand-purple/30 shadow-[0_4px_0_rgba(131,56,236,0.05)]"
    }
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-905 border-2 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-full text-xs font-black uppercase tracking-wider font-sans">
          <BookOpen className="w-4 h-4 text-brand-sunshine" /> Cool Curriculum & outcomes
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-brand-dark dark:text-white leading-tight">
          Super Skills We Learn!
        </h2>
        <p className="text-slate-400 dark:text-slate-500 text-sm font-bold font-sans">
          We take kids on a journey from basic block structures to training visual robot simulators.
        </p>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="child-card dark:bg-slate-900 dark:border-slate-800 p-4 border-slate-100 shadow-md">
            <div className="w-full h-64 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center border-2 border-slate-100/50 dark:border-slate-800">
              <img 
                src="/kids-class.png" 
                alt="Kids learning coding illustration" 
                className="w-full h-full object-cover animate-float-slow"
              />
            </div>
          </div>
          
          <div className="space-y-4 bg-[#F5F8FF] dark:bg-slate-900 border-2 border-[#DCE4FF] dark:border-slate-800 p-6 rounded-3xl">
            <h4 className="font-display font-black text-brand-dark dark:text-white text-lg flex items-center gap-2"><Heart className="w-5 h-5 text-brand-bubblegum" /> Why Kids Love It</h4>
            <div className="space-y-3 font-sans text-slate-500 dark:text-slate-400 text-xs font-bold">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#5C67F2] dark:text-[#8b93ff]" /> Game-like achievements and badges
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#5C67F2] dark:text-[#8b93ff]" /> Live interaction with other young programmers
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#5C67F2] dark:text-[#8b93ff]" /> Earn cute certificates on project submission
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {outcomes.map((outcome, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -5 }}
              className={`p-6 bg-white dark:bg-slate-900 border-2 rounded-[32px] transition-all duration-300 relative cursor-default ${outcome.color}`}
            >
              <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center text-brand-dark dark:text-white mb-4">
                <outcome.icon className="w-5 h-5" />
              </div>
              
              <h3 className="text-base font-black text-brand-dark dark:text-white">
                {outcome.title}
              </h3>
              
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 leading-relaxed font-bold font-sans">
                {outcome.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
