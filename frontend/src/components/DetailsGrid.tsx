import { motion } from 'framer-motion';
import { Users, Clock, MapPin, CreditCard, Calendar } from 'lucide-react';

export default function DetailsGrid() {
  const details = [
    { icon: Users, label: 'Super Age Group', value: '8–14 Years', color: 'text-brand-indigo dark:text-[#8b93ff] bg-[#5C67F2]/5 border-[#5C67F2]/10 dark:border-brand-indigo/20 shadow-[0_4px_0_#5c67f2]' },
    { icon: Clock, label: 'Camp Duration', value: '4 Fun Weeks', color: 'text-brand-sunshine bg-[#FFB703]/5 border-[#FFB703]/10 dark:border-brand-sunshine/20 shadow-[0_4px_0_#ffb703]' },
    { icon: MapPin, label: 'Learning Mode', value: 'Live Online', color: 'text-brand-mint bg-[#2EC4B6]/5 border-[#2EC4B6]/10 dark:border-brand-mint/20 shadow-[0_4px_0_#2ec4b6]' },
    { icon: CreditCard, label: 'Program Fee', value: '₹2,999', badge: '50% OFF', color: 'text-brand-bubblegum bg-[#FF007F]/5 border-[#FF007F]/10 dark:border-brand-bubblegum/20 shadow-[0_4px_0_#ff007f]' },
    { icon: Calendar, label: 'Camp Starts', value: '15 July 2026', color: 'text-brand-purple dark:text-[#a267ff] bg-[#8338EC]/5 border-[#8338EC]/10 dark:border-brand-purple/20 shadow-[0_4px_0_#8338ec]' },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-y-2 border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {details.map((detail, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className={`p-6 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-3xl flex flex-col justify-between relative transition-all duration-300 ${detail.color} cursor-default`}
            >
              {detail.badge && (
                <span className="absolute top-2 right-2 bg-brand-bubblegum text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider animate-pulse">
                  {detail.badge}
                </span>
              )}
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 mb-4 shadow-sm">
                  <detail.icon className="w-5 h-5" />
                </div>
                <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest font-sans">{detail.label}</p>
                <p className="text-brand-dark dark:text-white font-black text-base sm:text-lg mt-1 font-display">{detail.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
