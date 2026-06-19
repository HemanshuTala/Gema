import { useRef, useState, useEffect } from 'react';
import { 
  CheckCircle2, PhoneCall, Mail, Shield, Award, Heart, Sun, Moon, Zap
} from 'lucide-react';
import HeroSection from './components/HeroSection';
import DetailsGrid from './components/DetailsGrid';
import LearningOutcomes from './components/LearningOutcomes';
import RegistrationForm from './components/RegistrationForm';
import FAQSection from './components/FAQSection';

export default function App() {
  const formRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme from system settings or state
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleEnrollClick = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreClick = () => {
    outcomesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FCFDFF] dark:bg-slate-950 text-[#2B2D42] dark:text-slate-100 selection:bg-[#FFB703]/20 selection:text-brand-dark font-sans overflow-x-hidden relative grid-bg transition-colors duration-300">
      
      {/* Playful background gradients */}
      <div className="absolute top-0 left-0 w-full h-[650px] playful-gradient-bg pointer-events-none -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b-2 border-slate-100 dark:border-slate-800 py-4 px-6 md:px-12 flex justify-between items-center transition-all">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-indigo flex items-center justify-center text-white font-extrabold text-lg shadow-[0_4px_0_#474eb5]">
            K
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-brand-dark dark:text-white">Kidrove</span>
            <span className="text-[9px] block font-black text-slate-400 dark:text-slate-500 tracking-widest uppercase -mt-1 font-sans">Camp</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Light/Dark Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-9 h-9 rounded-xl border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            onClick={handleEnrollClick}
            className="px-5 py-2.5 bg-brand-indigo hover:opacity-90 text-white rounded-xl text-xs font-black shadow-[0_4px_0_#474eb5] cursor-pointer"
          >
            Enroll Now
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection onEnrollClick={handleEnrollClick} onExploreClick={handleExploreClick} />

      {/* Details Grid */}
      <DetailsGrid />

      {/* Learning Outcomes Section */}
      <div ref={outcomesRef}>
        <LearningOutcomes />
      </div>

      {/* Registration Form & Split Info */}
      <section ref={formRef} className="py-20 bg-slate-50/50 dark:bg-slate-900/30 border-t-2 border-slate-100/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-bubblegum/5 border-2 border-brand-bubblegum/10 rounded-full text-brand-bubblegum text-xs font-black uppercase tracking-wider w-fit">
              <Zap className="w-3.5 h-3.5" /> Limited Intake Slots
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-brand-dark dark:text-white tracking-tight leading-[1.1]">
              Give Your Kid the <br />Ultimate Coding Advantage!
            </h2>
            <p className="text-slate-400 dark:text-slate-500 text-sm sm:text-base leading-relaxed font-bold font-sans">
              Upon booking, your child will receive full access to pre-class setup tutorials, interactive programming guides, and our 24/7 student support community.
            </p>

            <div className="space-y-4 pt-2 font-sans">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-mint/10 flex items-center justify-center text-brand-mint">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">100% money-back guarantee within the first week</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-mint/10 flex items-center justify-center text-brand-mint">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Small class sizes with personalized mentoring</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-mint/10 flex items-center justify-center text-brand-mint">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Lifetime access to class records & materials</span>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-8 font-sans">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center text-brand-sunshine shadow-sm">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] block font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Call Support</span>
                  <span className="text-sm font-black text-brand-dark dark:text-white">+91 98765 43210</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center text-brand-sunshine shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] block font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Support Email</span>
                  <span className="text-sm font-black text-brand-dark dark:text-white">support@kidrove.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <RegistrationForm />
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 border-t border-slate-100 dark:border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark dark:text-white leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 dark:text-slate-500 text-sm font-bold font-sans">
            Everything you need to know about the AI & Robotics Summer Workshop.
          </p>
        </div>

        <FAQSection />
      </section>

      {/* Redesigned Premium Playful Footer */}
      <footer className="bg-[#F4F7FB] dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t-2 border-slate-100 dark:border-slate-900 py-16 px-6 md:px-12 relative overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-indigo flex items-center justify-center text-white font-extrabold text-base shadow-sm">
                K
              </div>
              <span className="text-lg font-black text-brand-dark dark:text-white tracking-tight font-display">Kidrove Academy</span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-bold">
              We build next-generation educational simulators and gamified workspaces to make learning technology safe, interactive, and exciting.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-brand-dark dark:text-white text-xs font-black uppercase tracking-wider font-display border-b-2 border-slate-200/50 dark:border-slate-800 pb-2 w-fit">Navigation</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-400">
              <li>
                <button onClick={handleEnrollClick} className="hover:text-brand-indigo dark:hover:text-white transition-colors cursor-pointer text-left">
                  Register Form
                </button>
              </li>
              <li>
                <button onClick={handleExploreClick} className="hover:text-brand-indigo dark:hover:text-white transition-colors cursor-pointer text-left">
                  Explore Outcomes
                </button>
              </li>
              <li>
                <span className="text-slate-300 dark:text-slate-700">Free Sandbox</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Safety Indicators */}
          <div className="space-y-3">
            <h4 className="text-brand-dark dark:text-white text-xs font-black uppercase tracking-wider font-display border-b-2 border-slate-200/50 dark:border-slate-800 pb-2 w-fit">Trust & Safety</h4>
            <ul className="space-y-2.5 text-xs font-bold text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-mint shrink-0" /> 100% Kid-Safe Platform
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-sunshine shrink-0" /> Certified Coding Mentors
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-brand-bubblegum shrink-0" /> COPPA Compliant Tools
              </li>
            </ul>
          </div>

          {/* Column 4: Parent Reviews */}
          <div className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
            <h4 className="text-brand-dark dark:text-white text-xs font-black uppercase tracking-wider font-display">Parent Feedback</h4>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 italic leading-relaxed font-bold">
              "My 10yo daughter built three simulator courses this month. The interactive format is spectacular!"
            </p>
            <span className="text-[10px] text-brand-indigo dark:text-brand-sunshine block font-black font-sans">— Mr. Sharma, Parent</span>
          </div>

        </div>

        {/* Lower Banner */}
        <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 dark:text-slate-500 text-[10px] font-bold relative z-10 gap-4">
          <p>© 2026 Kidrove Academy. All rights reserved. Empowering tomorrow's creators.</p>
          <div className="flex gap-6">
            <span className="hover:text-brand-indigo dark:hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-brand-indigo dark:hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
