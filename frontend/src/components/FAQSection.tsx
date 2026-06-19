import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Do children need a prior programming background to attend?",
    answer: "No, prior coding experience is not required! The workshop starts with foundational block coding and works its way up to simple robotics simulations and AI interactions. We group students dynamically based on their age and proficiency."
  },
  {
    question: "What hardware and software are required at home?",
    answer: "Students only need a laptop or desktop computer (Windows, macOS, or ChromeOS) with a stable internet connection, a web browser, and a webcam. All software platforms used during the workshop are browser-based, free, and educational."
  },
  {
    question: "How does the 'Online' mode work? Will they build real systems?",
    answer: "The sessions are conducted live by expert instructors via interactive webinars. We limit batch sizes to ensure personalized attention. Children will use highly engaging, physics-accurate simulators to build and program virtual robots, while also interacting with generative AI engines."
  },
  {
    question: "Is there a certificate provided at the end of the workshop?",
    answer: "Absolutely! Upon successful completion of all four weeks and submission of the final Capstone project, students will receive an official Kidrove 'AI & Robotics Certificate of Achievement' signed by the industry experts."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {FAQ_DATA.map((faq, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className={`border-2 rounded-[24px] transition-all duration-300 ${
              isOpen
                ? 'border-brand-sunshine bg-[#FFFDF9]/60 dark:bg-slate-900 shadow-[0_4px_0_#ffb703]'
                : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-slate-200 dark:hover:border-slate-800'
            }`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-5 text-left font-black text-brand-dark dark:text-white text-sm sm:text-base focus:outline-none cursor-pointer animate-none"
            >
              <span className="flex items-center gap-3 pr-4">
                <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-brand-sunshine' : 'text-slate-300 dark:text-slate-600'}`} />
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-slate-300 dark:text-slate-600 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-brand-sunshine' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-60 border-t border-slate-100 dark:border-slate-800' : 'max-h-0'
              }`}
            >
              <p className="p-5 text-xs sm:text-sm leading-relaxed text-slate-400 dark:text-slate-500 font-bold font-sans">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
