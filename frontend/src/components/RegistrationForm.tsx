import { useState } from 'react';
import { User, Mail, Phone, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FormFields {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export default function RegistrationForm() {
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key in keyof FormFields]?: boolean }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateField = (name: keyof FormFields, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return "Child's name is required";
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Parent email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const cleanPhone = value.replace(/[\s-()]/g, '');
        const phoneRegex = /^\+?[1-9]\d{1,14}$|^[0-9]{10}$/;
        if (!phoneRegex.test(cleanPhone)) return 'Please enter a valid 10-digit number';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormFields]) {
      const error = validateField(name as keyof FormFields, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormFields, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    let hasErrors = false;

    (Object.keys(fields) as Array<keyof FormFields>).forEach(key => {
      const error = validateField(key, fields[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true });

    if (hasErrors) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.55 }
      });

      setStatus('success');
      setFields({ name: '', email: '', phone: '' });
      setTouched({});
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Server is currently offline. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto font-sans">
      {status === 'success' ? (
        <div className="bg-white dark:bg-slate-900 border-2 border-[#2EC4B6]/25 dark:border-[#2ec4b6]/40 rounded-[32px] p-8 text-center shadow-[0_8px_0_#2ec4b6] animate-fade-in">
          <div className="w-16 h-16 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-mint">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>
          <h3 className="text-2xl font-black text-brand-dark dark:text-white mb-2">Registration Received</h3>
          <p className="text-slate-400 dark:text-slate-500 mb-6 text-sm font-bold font-sans leading-relaxed">
            Hooray! Registration is received. We have sent a confirmation checklist to your parent's email address.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="w-full py-4 bg-brand-indigo hover:opacity-90 text-white rounded-2xl font-black shadow-[0_4px_0_#474eb5] cursor-pointer"
          >
            Register Another Child
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[32px] p-8 shadow-[0_8px_0_rgba(92,103,242,0.02)]">
          <div className="mb-6">
            <h3 className="text-2xl font-black text-brand-dark dark:text-white">Reserve Your Seat</h3>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 font-bold font-sans">Batch starting 15 July. Fill out to book.</p>
          </div>

          {status === 'error' && (
            <div className="mb-6 flex items-start gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-brand-bubblegum text-xs font-bold font-sans">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <span>Oops! Submission error</span>
                <p className="font-normal text-slate-500 mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-brand-dark dark:text-slate-300 uppercase tracking-wider mb-2" htmlFor="name">
                Child's Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-350 dark:text-slate-600">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={fields.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Aarav Sharma"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-50/50 dark:bg-slate-950 border-2 rounded-2xl outline-none transition-all duration-200 text-brand-dark dark:text-white font-bold text-sm ${
                    touched.name && errors.name
                      ? 'border-brand-bubblegum focus:ring-4 focus:ring-brand-bubblegum/5'
                      : touched.name && !errors.name && fields.name
                      ? 'border-brand-mint focus:ring-4 focus:ring-brand-mint/5'
                      : 'border-slate-100 dark:border-slate-800 focus:border-slate-300 focus:ring-4 focus:ring-slate-500/10'
                  }`}
                />
              </div>
              {touched.name && errors.name && (
                <p className="mt-1.5 text-[10px] text-brand-bubblegum flex items-center gap-1 font-bold">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-black text-brand-dark dark:text-slate-300 uppercase tracking-wider mb-2" htmlFor="email">
                Parent's Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-350 dark:text-slate-600">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={fields.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. parent@example.com"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-50/50 dark:bg-slate-950 border-2 rounded-2xl outline-none transition-all duration-200 text-brand-dark dark:text-white font-bold text-sm ${
                    touched.email && errors.email
                      ? 'border-brand-rose focus:ring-4 focus:ring-brand-rose/5'
                      : touched.email && !errors.email && fields.email
                      ? 'border-brand-mint focus:ring-4 focus:ring-brand-mint/5'
                      : 'border-slate-100 dark:border-slate-800 focus:border-slate-300 focus:ring-4 focus:ring-slate-500/10'
                  }`}
                />
              </div>
              {touched.email && errors.email && (
                <p className="mt-1.5 text-[10px] text-brand-bubblegum flex items-center gap-1 font-bold">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-black text-brand-dark dark:text-slate-300 uppercase tracking-wider mb-2" htmlFor="phone">
                Contact Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-355 dark:text-slate-600">
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={fields.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 9876543210"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-50/50 dark:bg-slate-950 border-2 rounded-2xl outline-none transition-all duration-200 text-brand-dark dark:text-white font-bold text-sm ${
                    touched.phone && errors.phone
                      ? 'border-brand-rose focus:ring-4 focus:ring-brand-rose/5'
                      : touched.phone && !errors.phone && fields.phone
                      ? 'border-brand-mint focus:ring-4 focus:ring-brand-mint/5'
                      : 'border-slate-100 dark:border-slate-800 focus:border-slate-300 focus:ring-4 focus:ring-slate-500/10'
                  }`}
                />
              </div>
              {touched.phone && errors.phone && (
                <p className="mt-1.5 text-[10px] text-brand-bubblegum flex items-center gap-1 font-bold">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full mt-2 py-4 bg-brand-indigo hover:opacity-90 text-white rounded-2xl font-black text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-85 shadow-[0_6px_0_#474eb5]"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Booking Seat...
                </>
              ) : (
                <>
                  Book Workshop <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
