'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Check,
  Calendar,
  Clock,
  MapPin,
  Award,
  Star,
  User,
  Shield,
  HeartPulse,
  Sparkles,
  Baby,
  FileText,
  Activity,
  Scissors,
  Smile,
  Instagram,
  Facebook,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Heart,
  BriefcaseMedical,
} from 'lucide-react';
import drMridula from '../assets/dr-mridula.jpg';
import drMridulaPhoto from '../assets/dr-mridula-dentist.jpg';
import inside1 from '../assets/inside1.jpg';
import inside2 from '../assets/inside2.jpg';
import outsideClinic from '../assets/outside.jpg';

// Define the shape of our stored appointment values
interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  timeSlot: string;
  notes?: string;
  createdAt: string;
  bookingCode: string;
}

export default function RootsOfWisdomPage() {
  // Navigation states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Active appointment booking state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingService, setBookingService] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTimeSlot, setBookingTimeSlot] = useState('Morning (10:00 AM - 2:00 PM)');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<Appointment | null>(null);
  const [savedAppointments, setSavedAppointments] = useState<Appointment[]>([]);

  // Testimonials sliding index
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Handle scroll trigger for navbar shadow styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync saved appointments on mount
  useEffect(() => {
    const localData = localStorage.getItem('roots_wisdom_bookings');
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        const timer = setTimeout(() => {
          setSavedAppointments(parsed);
        }, 0);
        return () => clearTimeout(timer);
      } catch (err) {
        console.error('Error loading appointments', err);
      }
    }
  }, []);

  // Form submission logic
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingDate) {
      alert('Please fill in Name, Phone, and Preferred Date.');
      return;
    }

    const uniqueCode = `ROW-${2026}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      name: bookingName,
      phone: bookingPhone,
      email: bookingEmail,
      service: bookingService || 'General Consultation',
      date: bookingDate,
      timeSlot: bookingTimeSlot,
      notes: bookingNotes,
      createdAt: new Date().toLocaleDateString(),
      bookingCode: uniqueCode,
    };

    const updated = [newAppointment, ...savedAppointments];
    setSavedAppointments(updated);
    localStorage.setItem('roots_wisdom_bookings', JSON.stringify(updated));

    setBookingSuccess(newAppointment);

    // Reset fields except basic details if they want to book again
    setBookingNotes('');
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingSuccess(null);
    setBookingName('');
    setBookingPhone('');
    setBookingEmail('');
    setBookingNotes('');
    setBookingService('');
  };

  const openBookingWithService = (serviceName: string) => {
    setBookingService(serviceName);
    setIsBookingModalOpen(true);
  };

  // 9 services details
  const services = [
    {
      id: 'prev',
      title: 'Preventive Dentistry',
      description: 'Regular check-ups, deep cleanings, fluoride treatments to protect and secure oral health.',
      icon: <Shield className="w-8 h-8 text-[#0A6B6B]" />,
    },
    {
      id: 'rest',
      title: 'Restorative Dentistry',
      description: 'High-quality aesthetic fillings, resilient crowns, bridges to restore your natural bite smoothly.',
      icon: <Activity className="w-8 h-8 text-[#0A6B6B]" />,
    },
    {
      id: 'endo',
      title: 'Endodontics',
      description: 'Incredibly precise, painless root canal treatments designed to keep your original tooth roots healthy.',
      icon: <HeartPulse className="w-8 h-8 text-[#0A6B6B]" />,
    },
    {
      id: 'surg',
      title: 'Oral Surgery',
      description: 'Advanced wisdom tooth extractions, modern TMJ relief, and specialist-led cyst removals.',
      icon: <Scissors className="w-8 h-8 text-[#0A6B6B]" />,
    },
    {
      id: 'cosm',
      title: 'Cosmetic Dentistry',
      description: 'Stunning premium smile makeovers, pristine porcelain veneers, and bright teeth whitening plans.',
      icon: <Sparkles className="w-8 h-8 text-[#0A6B6B]" />,
    },
    {
      id: 'impl',
      title: 'Dental Implants',
      description: 'Durable, lifetime permanent solutions for missing teeth with surgeon-vouched materials.',
      icon: <BriefcaseMedical className="w-8 h-8 text-[#0A6B6B]" />,
    },
    {
      id: 'ortho',
      title: 'Orthodontics',
      description: 'Clear aesthetic aligners and traditional braces for comfortable, highly precise teeth realignment.',
      icon: <Smile className="w-8 h-8 text-[#0A6B6B]" />,
    },
    {
      id: 'paed',
      title: 'Paediatric Dentistry',
      description: 'Warm, fun, and extremely gentle dental checkups and procedures custom-made for youngsters.',
      icon: <Baby className="w-8 h-8 text-[#0A6B6B]" />,
    },
    {
      id: 'gum',
      title: 'Gum Care & Periodontics',
      description: 'Deep therapeutic scaling, root planing, and micro-aesthetic gum surgeries to secure your smile.',
      icon: <Stethoscope className="w-8 h-8 text-[#0A6B6B]" />,
    },
  ];

  // Testimonials Array
  const testimonials = [
    {
      stars: 5,
      text: "Dr. Mridula was outstanding — knowledgeable, gentle, and explained everything clearly. The equipment was state-of-the-art and the clinic was immaculately clean. I received exceptional care for my tooth implant procedure.",
      author: "Girija Shreedharan",
      role: "Dental Implant Patient",
    },
    {
      stars: 5,
      text: "I got my bridge work done and I am quite happy with the outcome. Dr. Mridula and her team really help patients explain their problems in detail. The doctor spends enough time explaining various treatment options.",
      author: "Ramasubramanian K",
      role: "Bridge Work Patient",
    },
    {
      stars: 5,
      text: "Excellent surgical hand, highly skilled and professional. My personal recommendation for Dr. Mridula who performed dental extraction for my 80-year-old diabetic father. The whole process was painless and flawless.",
      author: "Dr. Girish Bakshi",
      role: "Oral Surgery Patient",
    }
  ];

  // Handle testimonial sliding triggers
  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-[#0A6B6B] selection:text-white pb-14 md:pb-0 font-sans text-[#0A2E2E]">

      {/* SECTION 1 — STICKY NAVBAR */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          scrolled ? 'bg-white shadow-brand py-3' : 'bg-white/95 md:bg-[#FAF7F2]/90 backdrop-blur-md py-4'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Logo Brand left */}
          <a href="#" className="flex items-center gap-2 group focus:outline-none">
            <div className="bg-[#0A6B6B]/10 p-1.5 rounded-lg transition-transform group-hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0A6B6B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4 .5 10a7 7 0 0 1-8.5 8Z" />
                <path d="M19 2c-2.26 4.33-5.27 7.14-8 8" />
              </svg>
            </div>
            <span className="font-serif font-semibold text-lg md:text-xl tracking-tight text-[#0A6B6B] hover:opacity-90">
              Roots of Wisdom
            </span>
          </a>

          {/* Center: Navigation links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="font-medium text-sm text-[#0A2E2E] hover:text-[#0A6B6B] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#C9A84C] after:transition-all"
            >
              About
            </a>
            <a
              href="#doctor"
              className="font-medium text-sm text-[#0A2E2E] hover:text-[#0A6B6B] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#C9A84C] after:transition-all"
            >
              Meet the Doctor
            </a>
            <a
              href="#services"
              className="font-medium text-sm text-[#0A2E2E] hover:text-[#0A6B6B] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#C9A84C] after:transition-all"
            >
              Services
            </a>
            <a
              href="#testimonials"
              className="font-medium text-sm text-[#0A2E2E] hover:text-[#0A6B6B] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#C9A84C] after:transition-all"
            >
              Testimonials
            </a>
            <a
              href="#visit"
              className="font-medium text-sm text-[#0A2E2E] hover:text-[#0A6B6B] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#C9A84C] after:transition-all"
            >
              Contact
            </a>
          </nav>

          {/* Right: Book Appointment CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => {
                setBookingService('');
                setIsBookingModalOpen(true);
              }}
              id="nav-book-cta"
              className="bg-[#C9A84C] hover:bg-[#b0903b] active:scale-95 text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all focus:outline-none"
            >
              Book Appointment
            </button>
          </div>

          {/* Hamburger (Mobile) */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#0A6B6B] hover:bg-[#E8F4F4] p-1.5 rounded-lg transition-all focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Slide Down */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden bg-white border-t border-[#0A6B6B]/10"
            >
              <div className="px-5 py-6 space-y-4 flex flex-col">
                <a
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-medium text-base text-[#0A2E2E] hover:text-[#0A6B6B] py-1 border-b border-[#FAF7F2]"
                >
                  About
                </a>
                <a
                  href="#doctor"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-medium text-base text-[#0A2E2E] hover:text-[#0A6B6B] py-1 border-b border-[#FAF7F2]"
                >
                  Meet the Doctor
                </a>
                <a
                  href="#services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-medium text-base text-[#0A2E2E] hover:text-[#0A6B6B] py-1 border-b border-[#FAF7F2]"
                >
                  Services
                </a>
                <a
                  href="#testimonials"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-medium text-base text-[#0A2E2E] hover:text-[#0A6B6B] py-1 border-b border-[#FAF7F2]"
                >
                  Testimonials
                </a>
                <a
                  href="#visit"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-medium text-base text-[#0A2E2E] hover:text-[#0A6B6B] py-1 border-b border-[#FAF7F2]"
                >
                  Contact
                </a>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setBookingService('');
                      setIsBookingModalOpen(true);
                    }}
                    className="w-full text-center bg-[#C9A84C] hover:bg-[#b0903b] text-white font-medium text-base py-3 rounded-lg shadow-sm transition-all"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main landing container with padding top for sticky navbar */}
      <main className="flex-grow pt-16 md:pt-20">

        {/* SECTION 2 — HERO */}
        <section
          id="hero"
          className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#E8F4F4] to-[#FAF7F2] py-12 md:py-16 overflow-hidden"
        >
          {/* Subtle leaves watermark decorations */}
          <div className="absolute top-10 right-10 text-[#0A6B6B]/5 pointer-events-none transform rotate-45 select-none hidden md:block">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.25.25 2.44.69 3.53C3.65 13.1 5.92 11 9 11c1.9 0 3.73.74 5 2l1-1a7 7 0 0 0-8.5-8.5C12.5 5 14 5.52 16 3c1 2 2 4 .5 10a7 7 0 0 1-5.5 6.8c.84.13 1.69.2 2.56.2 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </div>

          <div className="max-w-[1200px] mx-auto px-4 md:px-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* LEFT COLUMN (55%) */}
              <div className="col-span-1 md:col-span-7 flex flex-col items-start text-left z-10">
                
                {/* Micro capsule badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#0A6B6B]/20 bg-[#E8F4F4] text-xs md:text-sm font-medium text-[#0A6B6B] mb-6 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
                  <span>4.9 / 133 Google Reviews</span>
                </span>

                <h1 className="font-serif text-[#0A2E2E] text-4xl sm:text-5xl lg:text-[56px] leading-[1.15] font-semibold tracking-tight">
                  Personalised Care <br className="hidden sm:inline" />
                  <span className="text-[#0A6B6B]">with Precision</span>
                </h1>

                <p className="mt-5 text-[#0A2E2E]/80 font-sans text-base md:text-[17px] leading-relaxed max-w-xl">
                  All your dental needs under one roof — Vashi&apos;s most trusted, specialist-led dental clinic. Experience high-end treatment in Navi Mumbai.
                </p>

                {/* Desktop and Tablet Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setBookingService('');
                      setIsBookingModalOpen(true);
                    }}
                    className="bg-[#C9A84C] hover:bg-[#b0903b] active:scale-95 text-white font-medium text-base px-8 py-3.5 rounded-lg shadow-md transition-all text-center focus:outline-none"
                  >
                    Book Appointment
                  </button>
                  <a
                    href="#services"
                    className="border border-[#0A6B6B] hover:bg-[#0A6B6B]/5 text-[#0A6B6B] font-medium text-base px-8 py-3.5 rounded-lg transition-all text-center focus:outline-none"
                  >
                    View Services
                  </a>
                </div>

                {/* Highlight indicators */}
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm text-[#0A6B6B]/80">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#C9A84C]" /> Women-Owned
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#C9A84C]" /> LGBTQ+ Friendly
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#C9A84C]" /> Advanced Technology
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN (45%) */}
              <div className="col-span-1 md:col-span-5 relative mt-6 md:mt-0 flex justify-center">
                <div className="relative w-full max-w-[420px] aspect-[3/4] overflow-hidden rounded-r-3xl rounded-none border-t border-b border-r border-[#0A6B6B]/10 shadow-xl">
                  <img
                    src={drMridula.src}
                    alt="Dr. Mridula Sankaran, Founder & Surgeon at Roots of Wisdom"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                  />
                  {/* Subtle Elegant botanical organic stamp in the corner */}
                  <div className="absolute bottom-4 right-4 bg-white/95 px-3 py-1.5 rounded-md border border-[#0A6B6B]/15 text-[10px] tracking-widest text-[#0A6B6B] uppercase font-sans">
                    Roots of Wisdom Dental
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 3 — TRUST BAR */}
        <section
          id="trust-bar"
          className="bg-[#E8F4F4]/80 py-8 border-y border-[#0A6B6B]/10"
        >
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 items-center justify-center">
              
              {/* Item 1 */}
              <div className="flex flex-col items-center text-center px-4">
                <Smile className="w-8 h-8 text-[#0A6B6B] mb-2 filter drop-shadow-xs" />
                <span className="text-xl md:text-2xl font-serif font-bold text-[#0A2E2E]">9</span>
                <span className="text-xs md:text-sm text-[#0A6B6B] font-sans font-medium">Dental Specialties</span>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-center text-center px-4 md:border-l border-[#0A6B6B]/15">
                <Star className="w-8 h-8 text-[#C9A84C] mb-2 fill-[#C9A84C]" />
                <span className="text-xl md:text-2xl font-serif font-bold text-[#0A2E2E]">4.9</span>
                <span className="text-xs md:text-sm text-[#0A6B6B] font-sans font-medium">Google Rating (133 reviews)</span>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-center text-center px-4 border-l border-[#0A6B6B]/15 cursor-pointer">
                <Stethoscope className="w-8 h-8 text-[#0A6B6B] mb-2" />
                <span className="text-xl md:text-2xl font-serif font-bold text-[#0A2E2E]">Specialist-Led</span>
                <span className="text-xs md:text-sm text-[#0A6B6B] font-sans font-medium">Practice Quality</span>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col items-center text-center px-4 border-l border-[#0A6B6B]/15">
                <Award className="w-8 h-8 text-[#C9A84C] mb-2" />
                <span className="text-xl md:text-2xl font-serif font-bold text-[#0A2E2E]">Best Clinic</span>
                <span className="text-xs md:text-sm text-[#0A6B6B] font-sans font-medium">In Vashi</span>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4 — ABOUT THE CLINIC */}
        <section
          id="about"
          className="py-16 md:py-24 bg-[#FAF7F2] overflow-hidden"
        >
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
              
              {/* LEFT copy block (60%) */}
              <div className="md:col-span-7 flex flex-col justify-center text-left">
                <span className="text-[#C9A84C] uppercase text-xs md:text-sm tracking-[2px] font-bold mb-3 block">
                  About Us
                </span>
                <h2 className="font-serif text-[#0A2E2E] text-3xl md:text-4xl font-semibold leading-[1.2] mb-6">
                  Where Every Smile Gets Expert Care
                </h2>
                <div className="text-[#0A2E2E]/85 text-base md:text-[16px] leading-[1.7] space-y-4 font-sans">
                  <p>
                    At Roots of Wisdom Dental Clinic, we believe a healthy smile is the foundation of confidence and well-being. Located in the heart of Vashi, our clinic offers a full spectrum of preventive, restorative, and cosmetic dental services in a warm, welcoming environment.
                  </p>
                  <p>
                    We combine advanced diagnostics and therapeutic technology with personalized treatment pathways to guarantee optimal outcomes for every patient. From minor dental cleanings to complex maxillofacial surgical reconstructions, we work with empathy and premium precision.
                  </p>
                </div>
              </div>

              {/* RIGHT highlight pillars (40%) */}
              <div className="md:col-span-5 flex flex-col justify-center space-y-4">
                
                {/* Pillar 1 */}
                <div className="bg-white p-5 rounded-xl border-l-[4px] border-[#0A6B6B] shadow-brand hover:translate-x-1 hover:border-[#C9A84C] transition-all duration-300">
                  <h3 className="font-sans font-bold text-[#0A2E2E] text-[15px] flex items-center gap-2 mb-1.5">
                    <Heart className="w-4 h-4 text-[#C9A84C] shrink-0" /> Patient-First Approach
                  </h3>
                  <p className="text-xs md:text-sm text-[#0A2E2E]/80 leading-relaxed font-sans">
                    Treatments tailored to your specific physical state, comfort limits, and preferences.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="bg-white p-5 rounded-xl border-l-[4px] border-[#0A6B6B] shadow-brand hover:translate-x-1 hover:border-[#C9A84C] transition-all duration-300">
                  <h3 className="font-sans font-bold text-[#0A2E2E] text-[15px] flex items-center gap-2 mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#C9A84C] shrink-0" /> Advanced Technology
                  </h3>
                  <p className="text-xs md:text-sm text-[#0A2E2E]/80 leading-relaxed font-sans">
                    Cutting-edge dental imaging, diagnostics, and sterile implant techniques ensure clean surgery.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="bg-white p-5 rounded-xl border-l-[4px] border-[#0A6B6B] shadow-brand hover:translate-x-1 hover:border-[#C9A84C] transition-all duration-300">
                  <h3 className="font-sans font-bold text-[#0A2E2E] text-[15px] flex items-center gap-2 mb-1.5">
                    <FileText className="w-4 h-4 text-[#C9A84C] shrink-0" /> Personalised Treatment Plans
                  </h3>
                  <p className="text-xs md:text-sm text-[#0A2E2E]/80 leading-relaxed font-sans">
                    Meticulously structured timelines, absolute clarity on treatment phases, with zero hidden extras.
                  </p>
                </div>

                {/* Identity Badges side-by-side below pills */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#0A6B6B]/15 px-3 py-2 rounded-lg text-xs font-semibold text-[#0A6B6B] justify-center select-none shadow-xs">
                    <User className="w-3.5 h-3.5 text-[#0A6B6B]" />
                    <span>Women-Owned</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#0A6B6B]/15 px-3 py-2 rounded-lg text-xs font-semibold text-[#0A6B6B] justify-center select-none shadow-xs">
                    <Heart className="w-3.5 h-3.5 text-[#0A6B6B] fill-[#0A6B6B]" />
                    <span>LGBTQ+ Friendly</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* SECTION 5 — CLINIC PHOTOS */}
        <section id="gallery" className="py-12 md:py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="text-center mb-8">
              <h3 className="font-serif text-[#0A2E2E] text-2xl md:text-3xl font-semibold">Clinic Photos</h3>
              <p className="text-sm text-[#0A2E2E]/75 mt-2">A quick look at our treatment rooms and reception area.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="overflow-hidden rounded-xl shadow-sm">
                <img src={inside1.src} alt="Clinic treatment room" className="w-full h-[360px] object-cover rounded-lg" />
              </div>
              <div className="overflow-hidden rounded-xl shadow-sm flex flex-col gap-4">
                <img src={inside2.src} alt="Clinic interior" className="w-full h-[220px] object-cover rounded-lg" />
                <div className="flex items-center gap-4">
                  <div className="flex-1 overflow-hidden rounded-lg">
                    <img src={outsideClinic.src} alt="Clinic exterior" className="w-full h-[120px] object-cover" />
                  </div>
                  <div className="flex-1 text-sm text-[#0A2E2E]/80">
                    <p className="font-sans font-semibold">Our Clinic</p>
                    <p className="mt-1">Welcoming reception and modern treatment rooms — available by appointment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 — MEET THE DOCTOR */}
        <section
          id="doctor"
          className="py-16 md:py-24 bg-white"
        >
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
              
              {/* LEFT Photo column (40%) */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[340px] aspect-[4/5] overflow-hidden rounded-2xl shadow-brand-hover relative border border-[#0A6B6B]/10">
                  <img
                    src={drMridulaPhoto.src}
                    alt="Dr. Mridula Sankaran - MDS Maxillofacial Surgeon Juhu Nagar Vashi"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E2E]/40 to-transparent pointer-events-none" />
                </div>
                <p className="mt-4 font-sans text-xs text-[#0A6B6B] font-semibold tracking-wide">
                  Dr. Mridula Sankaran, MDS Juhu Nagar
                </p>
              </div>

              {/* RIGHT Content card column (60%) with left accent border */}
              <div className="md:col-span-7">
                <div className="bg-white border-l-[6px] border-[#0A6B6B] p-6 sm:p-8 rounded-r-xl shadow-brand">
                  
                  <span className="text-[#C9A84C] uppercase text-xs tracking-[2px] font-bold mb-2 block">
                    Meet the Doctor
                  </span>
                  
                  <h3 className="font-serif text-[#0A2E2E] text-3xl sm:text-[38px] font-semibold leading-tight">
                    Dr. Mridula Sankaran
                  </h3>
                  
                  <p className="text-xs md:text-sm font-sans font-bold text-[#C9A84C] mt-2 tracking-wide uppercase">
                    B.D.S, M.D.S – Oral & Maxillofacial Surgery, Implantologist
                  </p>
                  
                  <p className="text-[#0A6B6B] font-sans text-[15px] font-medium italic mt-1 mb-4">
                    Founder & Oral and Maxillofacial Surgeon
                  </p>

                  <div className="w-16 h-[1.5px] bg-[#0A6B6B]/20 mb-5" />

                  <p className="text-[#0A2E2E]/85 font-sans text-sm md:text-base leading-relaxed mb-6">
                    Dr. Mridula Sankaran is a highly skilled and compassionate dental surgeon with advanced expertise in wisdom tooth extraction, complex dental implantology, cyst removals, and comprehensive surgical therapies. 
                  </p>
                  <p className="text-[#0A2E2E]/85 font-sans text-sm md:text-base leading-relaxed mb-6">
                    Her clinical methodology blends unmatched scientific precision with soft clinical empathy, ensuring even highly nervous restorative or emergency patients feel relaxed, deeply informed, and fully confident throughout their healing journey.
                  </p>

                  <h4 className="font-sans font-bold text-[#0A2E2E] text-[13px] uppercase tracking-wider mb-3">
                    Core Specialities & Focus:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#E8F4F4] text-[#0A6B6B] font-sans font-semibold text-xs px-3 py-1.5 rounded-md border border-[#0A6B6B]/10">
                      Wisdom Tooth Extractions
                    </span>
                    <span className="bg-[#E8F4F4] text-[#0A6B6B] font-sans font-semibold text-xs px-3 py-1.5 rounded-md border border-[#0A6B6B]/10">
                      Dental Implants
                    </span>
                    <span className="bg-[#E8F4F4] text-[#0A6B6B] font-sans font-semibold text-xs px-3 py-1.5 rounded-md border border-[#0A6B6B]/10">
                      Cyst Removals
                    </span>
                    <span className="bg-[#E8F4F4] text-[#0A6B6B] font-sans font-semibold text-xs px-3 py-1.5 rounded-md border border-[#0A6B6B]/10">
                      Oral Surgery & Reconstructions
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 6 — OUR SERVICES */}
        <section
          id="services"
          className="py-16 md:py-24 bg-[#FAF7F2]"
        >
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            
            {/* Centered Heading */}
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="text-[#C9A84C] uppercase text-xs md:text-sm tracking-[2px] font-bold mb-2.5 block">
                What We Offer
              </span>
              <h2 className="font-serif text-[#0A2E2E] text-3xl md:text-4xl font-semibold mb-4 leading-tight">
                Our Services
              </h2>
              <div className="w-16 h-1 bg-[#0A6B6B] mx-auto mb-4" />
              <p className="text-sm md:text-base text-[#0A2E2E]/80 leading-relaxed font-sans">
                Comprehensive, specialist-led dental care tailored to your family&apos;s dynamic biological stages and treatment timelines.
              </p>
            </div>

            {/* 3x3 Service Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="bg-white rounded-xl p-6 shadow-brand border-t-[3px] border-transparent hover:border-[#C9A84C] hover:shadow-brand-hover transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Left Icon Container */}
                    <div className="bg-[#E8F4F4] p-3 rounded-xl w-fit mb-5 transition-transform group-hover:scale-105">
                      {svc.icon}
                    </div>
                    {/* Title */}
                    <h3 className="font-sans font-bold text-lg text-[#0A2E2E] mb-2.5 group-hover:text-[#0A6B6B] transition-colors">
                      {svc.title}
                    </h3>
                    {/* Description */}
                    <p className="text-sm text-[#0A2E2E]/75 leading-relaxed font-sans mb-5">
                      {svc.description}
                    </p>
                  </div>

                  {/* Card Interactions Action button */}
                  <div className="pt-2 border-t border-[#FAF7F2] flex items-center justify-between">
                    <button
                      onClick={() => openBookingWithService(svc.title)}
                      className="text-xs font-semibold text-[#0A6B6B] hover:text-[#C9A84C] transition-colors flex items-center gap-1 focus:outline-none"
                    >
                      Book Procedure &rarr;
                    </button>
                    <span className="text-[10px] text-[#0A2E2E]/40 font-mono">
                      Specialist-Led
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION 7 — WHY CHOOSE US */}
        <section
          id="why-choose"
          className="py-16 md:py-20 bg-[#0A4F4F] text-white overflow-hidden relative"
        >
          {/* Faint gold circles backdrop to mimic luxury */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-48 h-48 bg-[#C9A84C]/5 rounded-full filter blur-xl select-none" />
          <div className="absolute bottom-1 right-10 w-72 h-72 bg-[#FAF7F2]/5 rounded-full filter blur-3xl select-none" />

          <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10 text-center">
            
            <h2 className="font-serif text-white text-3xl md:text-4xl font-semibold mb-12 text-center md:mb-16">
              Why Choose Roots of Wisdom
            </h2>

            {/* 3 Columns details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-left">
              
              {/* Col 1 */}
              <div className="flex flex-col items-start bg-[#0A2E2E]/30 p-6 rounded-xl border border-white/5 shadow-brand">
                <div className="bg-[#C9A84C]/25 border border-[#C9A84C]/35 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white filter drop-shadow-sm">
                  <Activity className="w-5 h-5 text-white animate-pulse" />
                </div>
                <h3 className="font-sans font-bold text-lg text-white mb-2 tracking-wide">
                  Advanced Technology
                </h3>
                <p className="text-sm text-white/80 leading-relaxed font-sans">
                  We use state-of-the-art imaging, diagnostics, and surgical protocols to enforce absolute clinical precision and perfect results.
                </p>
              </div>

              {/* Col 2 */}
              <div className="flex flex-col items-start bg-[#0A2E2E]/30 p-6 rounded-xl border border-white/5 shadow-brand">
                <div className="bg-[#C9A84C]/25 border border-[#C9A84C]/35 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white filter drop-shadow-sm">
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
                <h3 className="font-sans font-bold text-lg text-white mb-2 tracking-wide">
                  Gentle, Compassionate Care
                </h3>
                <p className="text-sm text-white/80 leading-relaxed font-sans">
                  Calm, reassuring treatments intentionally structured around sensitive patients. We minimize pain and maximize support.
                </p>
              </div>

              {/* Col 3 */}
              <div className="flex flex-col items-start bg-[#0A2E2E]/30 p-6 rounded-xl border border-white/5 shadow-brand">
                <div className="bg-[#C9A84C]/25 border border-[#C9A84C]/35 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white filter drop-shadow-sm">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-sans font-bold text-lg text-white mb-2 tracking-wide">
                  Personalised Treatment Plans
                </h3>
                <p className="text-sm text-white/80 leading-relaxed font-sans">
                  Rigorous care plans completely calibrated to your timeline and dental goals, keeping budget options completely clear.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 8 — TESTIMONIALS */}
        <section
          id="testimonials"
          className="py-16 md:py-24 bg-[#FAF7F2]"
        >
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">
              <div className="text-left">
                <span className="text-[#C9A84C] uppercase text-xs md:text-sm tracking-[2px] font-bold mb-2 block animate-pulse">
                  Authentic Stories
                </span>
                <h2 className="font-serif text-[#0A2E2E] text-3xl md:text-4xl font-semibold leading-tight">
                  What Our Patients Say
                </h2>
                <p className="text-[#0A6B6B] text-sm md:text-base font-sans mt-2">
                  Rated 4.9 ⭐ by 133 happy patients on Google
                </p>
              </div>
              <div className="mt-4 md:mt-0 hidden md:block">
                <a
                  href="https://g.co/kgs/vashi-roots-of-wisdom-reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sm text-[#0A6B6B] hover:text-[#C9A84C] flex items-center gap-1 group font-sans transition-colors"
                >
                  View Google Reviews &rarr;
                </a>
              </div>
            </div>

            {/* Desktop Testimonial Cards Layout (3 columns) */}
            <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((test, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-brand hover:shadow-brand-hover transition-all duration-300 border-b-[3px] border-[#0A6B6B] flex flex-col justify-between"
                >
                  <div>
                    {/* Stars render */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(test.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
                      ))}
                    </div>
                    {/* Text */}
                    <p className="text-sm md:text-[15px] text-[#0A2E2E]/85 leading-relaxed font-sans italic">
                      &ldquo;{test.text}&rdquo;
                    </p>
                  </div>
                  {/* Bio details below */}
                  <div className="mt-6 pt-4 border-t border-[#FAF7F2] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E8F4F4] text-[#0A6B6B] font-serif font-bold text-lg flex items-center justify-center uppercase">
                      {test.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-[#0A2E2E] text-sm leading-tight">
                        — {test.author}
                      </h4>
                      <p className="font-sans text-xs text-[#0A6B6B]">
                        {test.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Swipe/Carousel layout with dots */}
            <div className="md:hidden">
              <div className="bg-white rounded-xl p-6 shadow-brand border-b-[3px] border-[#0A6B6B] min-h-[260px] flex flex-col justify-between relative">
                <div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonials[testimonialIndex].stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#0A2E2E] italic leading-relaxed font-sans">
                    &ldquo;{testimonials[testimonialIndex].text}&rdquo;
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#FAF7F2] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8F4F4] text-[#0A6B6B] font-serif font-bold text-lg flex items-center justify-center uppercase">
                    {testimonials[testimonialIndex].author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-[#0A2E2E] text-sm">
                      — {testimonials[testimonialIndex].author}
                    </h4>
                    <span className="font-sans text-xs text-[#0A6B6B]">
                      {testimonials[testimonialIndex].role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Slider Controls indicator */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-1">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === testimonialIndex ? 'bg-[#0A6B6B] w-6' : 'bg-[#0A6B6B]/20'
                      }`}
                      aria-label={`Show testimonial slide ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-1.5 rounded-lg border border-[#0A6B6B]/20 hover:bg-white text-[#0A6B6B]"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-1.5 rounded-lg border border-[#0A6B6B]/20 hover:bg-white text-[#0A6B6B]"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile View Google Reviews button */}
              <div className="mt-6">
                <a
                  href="https://g.co/kgs/vashi-roots-of-wisdom-reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[#E8F4F4] text-[#0A6B6B] font-semibold text-sm py-3 rounded-lg border border-[#0A6B6B]/15"
                >
                  View Google Reviews (4.9 ⭐) →
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 9 — BOOKING CTA BANNER */}
        <section
          id="booking-cta-banner"
          className="relative py-20 md:py-24 bg-[#0A6B6B] text-white text-center overflow-hidden"
        >
          {/* Accent textures */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A84C]/5 rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-tr-full pointer-events-none" />

          <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
            <h2 className="font-serif text-3xl md:text-5xl lg:text-[44px] font-medium leading-tight text-white mb-4">
              Ready for a Healthier Smile?
            </h2>
            <p className="text-white/70 max-w-lg mx-auto font-sans text-sm md:text-[17px] mb-8 leading-relaxed">
              Book your appointment today — new dental patients and consultation inquiries are always welcome.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Call trigger */}
              <a
                href="tel:+916363012740"
                className="w-full sm:w-auto bg-[#C9A84C] hover:bg-[#b0903b] active:scale-95 text-[#0A2E2E] font-bold text-base px-8 py-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5 text-[#0A2E2E]" />
                Call +91 6363012740
              </a>
              {/* WhatsApp trigger */}
              <a
                href="https://wa.me/916363012740"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 active:scale-95 font-bold text-base px-8 py-4 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 10 — VISIT OUR CLINIC */}
        <section
          id="visit"
          className="py-16 md:py-24 bg-[#FAF7F2]"
        >
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-stretch">
              
              {/* LEFT Details block (50%) */}
              <div className="md:col-span-6 flex flex-col justify-between">
                <div>
                  <span className="text-[#C9A84C] uppercase text-xs md:text-sm tracking-[2px] font-bold mb-2 block">
                    Find Us Here
                  </span>
                  <h2 className="font-serif text-[#0A2E2E] text-3xl md:text-4xl font-semibold mb-6">
                    Visit Our Clinic
                  </h2>

                  {/* Address */}
                  <div className="flex items-start gap-3.5 mb-6 text-left">
                    <div className="bg-[#0A6B6B]/15 text-[#0A6B6B] p-2.5 rounded-lg shrink-0 mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-[#0A2E2E] text-base mb-1">
                        Clinic Address
                      </h4>
                      <p className="text-sm text-[#0A2E2E]/80 leading-relaxed font-sans">
                        Shop No. 5, Sulochana Building, Intercity CHS, Juhu Nagar, Sector-16, Vashi, Navi Mumbai – 400703
                      </p>
                      <span className="text-xs text-[#0A6B6B] block mt-1 font-semibold font-sans">
                        Navi Mumbai Vashi Hub
                      </span>
                    </div>
                  </div>

                  {/* Operating Hours Table */}
                  <div className="border border-[#0A6B6B]/15 rounded-xl bg-white p-5 shadow-sm mb-6 w-full overflow-hidden">
                    <h4 className="font-sans font-bold text-[#0A2E2E] text-base mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#C9A84C]" /> Opening Hours
                    </h4>
                    <div className="space-y-2.5 font-sans divide-y divide-[#FAF7F2]">
                      <div className="flex justify-between text-sm py-1.5">
                        <span className="text-[#0A2E2E]/70">Tuesday – Sunday</span>
                        <span className="font-semibold text-[#0A2E2E]">10:00 AM – 2:00 PM | 4:30 PM – 9:00 PM</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2">
                        <span className="text-[#0A2E2E]/70">Monday</span>
                        <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md text-xs uppercase tracking-wider">
                          Closed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Call click-action */}
                <div className="pt-2">
                  <a
                    href="tel:+916363012740"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b0903b] hover:shadow-md text-white font-bold px-6 py-3.5 rounded-lg transition-all focus:outline-none"
                  >
                    <Phone className="w-4 h-4" />
                    Call to Book: +91 6363012740
                  </a>
                </div>
              </div>

              {/* RIGHT Map block (50%) */}
              <div className="md:col-span-6 flex flex-col justify-center">
                <div className="w-full h-[320px] md:h-[400px] overflow-hidden rounded-xl border border-[#0A6B6B]/15 shadow-brand relative">
                  {/* Google Maps iFrame embedding pointed relative to Sector 16, Vashi */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15082.874126016943!2d72.98183123327574!3d19.076109082055773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1f000ee3f9d%3A0xf4b5a40f4032b49a!2sRoots%20of%20Wisdom!5e0!3m2!1sen!2sin!4v1780916055553!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Roots of Wisdom Location Map"
                  ></iframe>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* SECTION 11 — FOOTER */}
      <footer id="footer" className="bg-[#0A2E2E] text-white py-12 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-left mb-10">
            
            {/* Column 1 — Brand info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4 .5 10a7 7 0 0 1-8.5 8Z" />
                </svg>
                <h3 className="font-serif font-semibold text-lg text-[#C9A84C] tracking-wide">
                  Roots of Wisdom
                </h3>
              </div>
              <p className="text-xs text-white/55 uppercase tracking-widest font-sans mb-3 font-semibold">
                Personalised Care with Precision
              </p>
              <p className="text-sm text-white/70 max-w-xs font-sans leading-relaxed mb-4">
                Specialist-led dental care combining rigorous clinical guidelines with empathetic hospitality in Vashi, Navi Mumbai.
              </p>
              {/* Social links */}
              <div className="flex gap-3 pt-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 hover:text-[#C9A84C] text-white p-2 rounded-lg transition-all"
                  aria-label="Instagram Profile Link"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 hover:text-[#C9A84C] text-white p-2 rounded-lg transition-all"
                  aria-label="Facebook Page Link"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://g.page/roots-wisdom-dental"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 hover:text-[#C9A84C] text-white p-2.5 rounded-lg text-xs font-bold leading-none tracking-wider font-sans transition-all"
                  aria-label="Google Local Map Review"
                >
                  G ⭐ 4.9
                </a>
              </div>
            </div>

            {/* Column 2 — Quick Links */}
            <div>
              <h4 className="font-serif font-bold text-[#C9A84C] text-lg mb-4">
                Quick Navigation
              </h4>
              <ul className="space-y-2.5 font-sans text-sm">
                <li>
                  <a href="#" className="text-white/75 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-white/75 hover:text-white transition-colors">
                    About Roots of Wisdom
                  </a>
                </li>
                <li>
                  <a href="#doctor" className="text-white/75 hover:text-white transition-colors">
                    Meet Specialist Doctor
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-white/75 hover:text-white transition-colors">
                    Services & Procedures
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-white/75 hover:text-white transition-colors">
                    Testimonials & Cases
                  </a>
                </li>
                <li>
                  <a href="#visit" className="text-white/75 hover:text-white transition-colors">
                    Location & Contact Info
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 — Contact short form */}
            <div>
              <h4 className="font-serif font-bold text-[#C9A84C] text-lg mb-4">
                Clinic Location
              </h4>
              <ul className="space-y-3.5 font-sans text-sm text-white/80">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C9A84C] shrink-0 mt-1" />
                  <span>
                    Shop No. 5, Sulochana Bldg, Intercity CHS, Sector-16, Vashi, Navi Mumbai - 400703
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#C9A84C] shrink-0" />
                  <a href="tel:+916363012740" className="hover:text-white transition-colors font-semibold">
                    +91 6363012740
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#C9A84C] shrink-0 mt-1" />
                  <div className="text-xs text-white/70 leading-relaxed">
                    <p className="font-semibold text-white">Tue–Sun: 10AM–2PM | 4:30PM–9PM</p>
                    <p className="text-red-400">Monday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar area */}
          <div className="border-t border-white/10 pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-sans">
            <div>
              <p>&copy; {new Date().getFullYear()} Roots of Wisdom Dental Clinic. All rights reserved.</p>
              <p className="mt-1 text-[10px]">Registration: Shop No. 5, Sulochana Juhu Nagar Vashi</p>
            </div>
            
            {/* Identity badges bottom */}
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-white/60 bg-white/5 px-2.5 py-1 rounded">
                <User className="w-3.5 h-3.5 text-white/60" /> Women-Owned
              </span>
              <span className="flex items-center gap-1.5 text-white/60 bg-white/5 px-2.5 py-1 rounded">
                <Heart className="w-3.5 h-3.5 text-white/60 fill-white/60" /> LGBTQ+ Friendly
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING ELEMENTS — FIXED WHATSAPP BUTTON (z-9999) */}
      <a
        href="https://wa.me/916363012740"
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-floating-bubble"
        className="fixed bottom-20 md:bottom-6 right-5 z-50 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 hover:rotate-3"
        title="Chat with us list on WhatsApp"
        aria-label="Contact clinic over WhatsApp button"
      >
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
          className="text-white filter drop-shadow-sm"
        >
          <path d="M17.472 14.382c-.022-.015-.072-.041-.122-.069l-.339-.189c-.195-.11-.47-.215-.65-.11s-.33.375-.455.515c-.125.14-.25.31-.385.28-.135-.03-.54-.18-1.03-.62-.38-.34-.635-.755-.71-.88-.075-.125-.015-.19.045-.25.053-.053.125-.145.188-.218.063-.073.083-.125.125-.21.04-.085.02-.16-.01-.225-.03-.065-.25-.6-.342-.82-.091-.218-.184-.188-.25-.188l-.208-.008c-.145.003-.38.055-.58.269-.2.22-.76.74-.76 1.81 0 1.07.78 2.1 0 2.1a10.015 10.015 0 0 0 .58 1.15c.61 1.07 1.48 1.84 2.41 2.37.52.29 1.03.48 1.54.54.51.06 1.02-.04 1.41-.11.41-.07.84-.41.97-.8.13-.39.13-.73.09-.8-.03-.07-.13-.12-.25-.18zm3.536-11.83C18.225 1.54 14.73 1.54 11.238 1.54a10.27 10.27 0 0 0-8.887 5.166A10.233 10.233 0 0 0 1.536 12.03a10.15 10.15 0 0 0 1.63 5.485L1.516 23l5.63-1.47a10.18 10.18 0 0 0 4.884 1.25c5.688 0 10.29-4.602 10.29-10.29 0-2.75-1.07-5.33-3.02-7.29zM12.03 21.196a8.55 8.55 0 0 1-4.37-1.196l-.31-.186-3.25.85.865-3.17-.2-.32a8.55 8.55 0 0 1-1.31-4.62c0-4.73 3.85-8.58 8.58-8.58 2.29 0 4.44.89 6.06 2.51a8.53 8.53 0 0 1 2.51 6.06c-.006 4.734-3.856 8.582-8.575 8.582z" />
        </svg>
      </a>

      {/* MOBILE BOTTOM FIXED STICKY ACTION RIBBON BAR (56px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white h-14 border-t border-[#0A6B6B]/15 flex items-stretch">
        <a
          href="tel:+916363012740"
          className="flex-1 bg-[#0A6B6B] text-white flex items-center justify-center gap-2 text-sm font-semibold hover:bg-[#0A4F4F]"
        >
          <Phone className="w-4 h-4 text-white" />
          Call Now
        </a>
        <a
          href="https://wa.me/916363012740"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 text-sm font-semibold hover:bg-[#20ba59]"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          WhatsApp
        </a>
      </div>


      {/* INTERACTIVE APPOINTMENT SCHEDULER MODAL */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
            
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeBookingModal}
              className="absolute inset-0 bg-[#0A2E2E]/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal card content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white w-full max-w-lg rounded-2xl shadow-brand-hover overflow-hidden z-10 border border-[#0A6B6B]/10 max-h-[90vh] flex flex-col"
            >
              {/* Header block with Doctor & brand styling */}
              <div className="bg-[#0A6B6B] text-white p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-xl md:text-2xl text-white">
                    Book Your Appointment
                  </h3>
                  <p className="text-white/70 text-xs font-sans mt-1">
                    Roots of Wisdom Dental Clinic | Dr. Mridula Sankaran
                  </p>
                </div>
                <button
                  onClick={closeBookingModal}
                  className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-all focus:outline-none"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Success View */}
              {bookingSuccess ? (
                <div className="p-6 overflow-y-auto text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 animate-bounce">
                    <Check className="w-8 h-8 stroke-[3px]" />
                  </div>
                  <h4 className="font-serif font-bold text-2xl text-[#0A2E2E] mb-1">
                    Booking Confirmed!
                  </h4>
                  <p className="text-sm text-green-600 font-semibold font-sans mb-4">
                    See you on {bookingSuccess.date}
                  </p>
                  
                  <div className="bg-[#FAF7F2] border border-[#0A6B6B]/10 rounded-xl p-4 w-full text-left space-y-2 mb-6 text-sm font-sans">
                    <div className="flex justify-between border-b border-[#0A6B6B]/5 pb-1">
                      <span className="text-[#0A2E2E]/60">Patient Name</span>
                      <span className="font-bold text-[#0A2E2E]">{bookingSuccess.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#0A6B6B]/5 pb-1">
                      <span className="text-[#0A2E2E]/60">Treatment Type</span>
                      <span className="font-semibold text-[#0A2E2E]">{bookingSuccess.service}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#0A6B6B]/5 pb-1">
                      <span className="text-[#0A2E2E]/60">Time Preference</span>
                      <span className="text-[#0A2E2E]">{bookingSuccess.timeSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#0A2E2E]/60">Booking ID Ref</span>
                      <span className="font-mono font-black text-[#C9A84C]">{bookingSuccess.bookingCode}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#0A2E2E]/60 leading-relaxed mb-6">
                    Our coordinator will text or call you on <strong className="text-[#0A2E2E]">{bookingSuccess.phone}</strong> shortly to confirm the exact hour slot. Thank you for placing your trust in us!
                  </p>

                  <div className="flex gap-3 w-full">
                    <a
                      href={`https://wa.me/916363012740?text=Hi%2C%20I%20just%20booked%20an%20appointment%20with%20code%20${bookingSuccess.bookingCode}%20for%20${bookingSuccess.service}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#25D366] text-white py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" /> Share on WhatsApp
                    </a>
                    <button
                      onClick={closeBookingModal}
                      className="flex-1 bg-[#0A6B6B] hover:bg-[#0A4F4F] text-white py-3 rounded-lg text-sm font-semibold"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Appointment Form */
                <form onSubmit={handleBookingSubmit} className="p-6 overflow-y-auto space-y-4 flex-grow">
                  
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#0A2E2E]/70 tracking-wide mb-1 font-sans">
                      Patient Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="e.g. Girish Bakshi"
                      className="w-full border border-[#0A6B6B]/15 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-[#0A6B6B] font-sans"
                    />
                  </div>

                  {/* Phone + Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#0A2E2E]/70 tracking-wide mb-1 font-sans">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        placeholder="e.g. +91 98XXX-XXXXX"
                        className="w-full border border-[#0A6B6B]/15 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-[#0A6B6B] font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#0A2E2E]/70 tracking-wide mb-1 font-sans">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        placeholder="e.g. name@example.com"
                        className="w-full border border-[#0A6B6B]/15 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-[#0A6B6B] font-sans"
                      />
                    </div>
                  </div>

                  {/* Service selection dropdown */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#0A2E2E]/70 tracking-wide mb-1 font-sans">
                      Dental Speciality / Service Needed
                    </label>
                    <select
                      value={bookingService}
                      onChange={(e) => setBookingService(e.target.value)}
                      className="w-full border border-[#0A6B6B]/15 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-[#0A6B6B] font-sans text-brand-dark"
                    >
                      <option value="">General Dental Consultation</option>
                      <option value="Preventive Dentistry">Preventive Dentistry (Checkups & Cleaning)</option>
                      <option value="Restorative Dentistry">Restorative Dentistry (Fillings & Crowns)</option>
                      <option value="Endodontics">Endodontics (Root Canal Treatment)</option>
                      <option value="Oral Surgery">Oral Surgery (Wisdom Tooth Extraction)</option>
                      <option value="Cosmetic Dentistry">Cosmetic Dentistry (Whitening & Veneers)</option>
                      <option value="Dental Implants">Dental Implants (Permanent Implants)</option>
                      <option value="Orthodontics">Orthodontics (Braces & Aligners)</option>
                      <option value="Paediatric Dentistry">Paediatric Dentistry (Kids Care)</option>
                      <option value="Gum Care & Periodontics">Gum Care & Periodontics</option>
                    </select>
                  </div>

                  {/* Date and Hours Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#0A2E2E]/70 tracking-wide mb-1 font-sans">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full border border-[#0A6B6B]/15 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-[#0A6B6B] font-sans h-[42px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#0A2E2E]/70 tracking-wide mb-1 font-sans">
                        Preferred Shift
                      </label>
                      <select
                        value={bookingTimeSlot}
                        onChange={(e) => setBookingTimeSlot(e.target.value)}
                        className="w-full border border-[#0A6B6B]/15 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-[#0A6B6B] font-sans text-brand-dark h-[42px]"
                      >
                        <option value="Morning (10:00 AM - 2:00 PM)">Morning (10:00 AM - 2:00 PM)</option>
                        <option value="Evening (4:30 PM - 9:00 PM)">Evening (4:30 PM - 9:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Optional Notes */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#0A2E2E]/70 tracking-wide mb-1 font-sans">
                      Special Requests / Symptoms (Optional)
                    </label>
                    <textarea
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      placeholder="Describe any tooth pain, urgent extractions, or if you request a private scheduling cycle."
                      rows={2}
                      className="w-full border border-[#0A6B6B]/15 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-[#0A6B6B] font-sans resize-none"
                    ></textarea>
                  </div>

                  {/* Google Reviews Trust Reminder inside Form */}
                  <div className="bg-[#E8F4F4] text-[#0A6B6B] px-3.5 py-2.5 rounded-lg text-xs leading-relaxed font-sans flex items-start gap-2 border border-[#0A6B6B]/10">
                    <ShieldCheck className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                    <span>
                      Dr. Mridula Sankaran is a board-certified Maxillofacial Surgeon. Your private records are guarded securely, and we will follow sterile surgical guidelines.
                    </span>
                  </div>

                  {/* Form Submission Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#C9A84C] hover:bg-[#b0903b] active:scale-98 text-white font-bold py-3.5 rounded-lg text-base shadow-md transition-all focus:outline-none flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-5 h-5 text-white" />
                      Request Scheduled Slots
                    </button>
                  </div>

                  {/* Stored Bookings list inside modal */}
                  {savedAppointments.length > 0 && (
                    <div className="pt-4 border-t border-[#0A6B6B]/10">
                      <p className="text-[11px] font-bold uppercase text-[#0A2E2E]/60 tracking-wider mb-2 font-sans">
                        My Local Bookings ({savedAppointments.length})
                      </p>
                      <div className="max-h-24 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                        {savedAppointments.slice(0, 3).map((apt) => (
                          <div key={apt.id} className="bg-[#FAF7F2] p-2 rounded border border-[#0A6B6B]/5 text-xs flex justify-between items-center">
                            <div>
                              <p className="font-bold text-[#0A2E2E] truncate max-w-[180px]">
                                {apt.service}
                              </p>
                              <p className="text-[10px] text-[#0A2E2E]/60">
                                {apt.date} • {apt.timeSlot.split(' ')[0]}
                              </p>
                            </div>
                            <span className="font-mono text-[#C9A84C] font-semibold">
                              {apt.bookingCode}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
