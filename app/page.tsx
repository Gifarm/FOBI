"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Info,
  Layers,
  BarChart3,
  Plus,
  Sparkles,
  ChevronRight,
  Target,
  ArrowRight,
  // Instagram,
  // Youtube,
  // Twitter,
  MapPin,
  Mail,
  Send,
  Bell,
  Calendar,
  Play,
} from "lucide-react";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  // Handle scroll for Desktop Header & Reveal animations
  useEffect(() => {
    const handleScroll = () => {
      // Header Animation
      setScrolled(window.scrollY > 100);

      // Simple Reveal Logic
      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-[30px]");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-600">
      {/* Desktop Navigation (Floating Curved Design) */}
      <header
        className={`fixed w-full z-50 px-4 md:px-10 py-4 hidden lg:block transition-all duration-700`}
      >
        <div
          className={`container mx-auto flex justify-between items-center transition-all duration-500 border border-white/40 backdrop-blur-[15px]
            ${
              scrolled
                ? "bg-white/95 shadow-xl rounded-[2rem] px-10 py-3 max-w-6xl mt-1"
                : "bg-white/70 rounded-b-[40px] px-12 py-5 shadow-lg shadow-blue-900/5"
            }`}
        >
          <div className="flex items-center gap-4">
            <img
              src="logo.png"
              alt="Logo FOBI"
              className="h-10 w-auto transition-transform duration-500"
              style={{ transform: scrolled ? "scale(0.95)" : "scale(1)" }}
            />
            <div>
              <span className="font-extrabold text-xl tracking-tighter text-slate-800 block leading-none">
                FOBI
              </span>
              <span className="text-[8px] text-blue-600 font-bold uppercase tracking-widest">
                Forum OSIS Banjar Idaman
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-10 font-bold text-slate-600">
            {["home", "about", "proker", "stats"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="relative hover:text-blue-600 transition-colors group text-sm uppercase tracking-wide"
              >
                {item === "proker"
                  ? "Program"
                  : item === "stats"
                    ? "Statistik"
                    : item === "about"
                      ? "Tentang Kami"
                      : "Beranda"}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <button
            className={`bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-lg hover:shadow-blue-200 text-white rounded-full text-xs font-bold transition-all active:scale-95 ${scrolled ? "px-7 py-2.5" : "px-8 py-3"}`}
          >
            Mulai Kolaborasi
          </button>
        </div>
      </header>

      {/* Mobile Header (Logo Only) */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-lg px-6 py-4 lg:hidden border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="logo.png" alt="Logo FOBI" className="h-8 w-auto" />
          <span className="font-black text-xl text-slate-800 tracking-tighter">
            FOBI
          </span>
        </div>
        <button className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 px-4 pb-4 lg:hidden">
        <div className="bg-white/85 backdrop-blur-2xl border-t border-white/30 rounded-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex justify-around items-center py-4 px-2">
          <a
            href="#home"
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "home" ? "text-blue-600" : "text-slate-400"}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-bold">Beranda</span>
          </a>
          <a
            href="#about"
            onClick={() => setActiveTab("about")}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "about" ? "text-blue-600" : "text-slate-400"}`}
          >
            <Info className="w-5 h-5" />
            <span className="text-[10px] font-bold">Tentang</span>
          </a>
          <div className="relative -top-8">
            <button className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center rotate-45 transition-transform active:scale-90">
              <Plus className="w-8 h-8 -rotate-45" />
            </button>
          </div>
          <a
            href="#proker"
            onClick={() => setActiveTab("proker")}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "proker" ? "text-blue-600" : "text-slate-400"}`}
          >
            <Layers className="w-5 h-5" />
            <span className="text-[10px] font-bold">Proker</span>
          </a>
          <a
            href="#stats"
            onClick={() => setActiveTab("stats")}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "stats" ? "text-blue-600" : "text-slate-400"}`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-[10px] font-bold">Statistik</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-24 lg:pt-0 overflow-hidden bg-gradient-to-br from-[#3b68b3] to-[#1e293b]"
      >
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/20 rounded-full -mr-48 -mt-48 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full -ml-32 -mb-32 blur-[100px]"></div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-white space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-5 py-2.5 rounded-2xl backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-bold tracking-widest uppercase">
                Pusat Aspirasi Kota Banjar
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Sinergi{" "}
              <span className="text-yellow-400 underline decoration-blue-400/30">
                Pelajar
              </span>
              <br />
              Idaman Bangsa.
            </h1>
            <p className="text-lg text-blue-100/70 max-w-xl leading-relaxed">
              Menghubungkan gagasan, mempererat persaudaraan, dan menciptakan
              inovasi melalui kolaborasi OSIS Se-Kota Banjar.
            </p>
            <div className="flex flex-wrap gap-5 pt-4">
              <a
                href="#proker"
                className="bg-white text-blue-900 px-10 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-white/20 transition-all flex items-center gap-2 group"
              >
                Jelajahi Program{" "}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="absolute -inset-20 bg-blue-500/20 rounded-full blur-[80px] animate-pulse"></div>
              <img
                src="logo.png"
                alt="Hero Logo"
                className="relative w-full max-w-md drop-shadow-[0_50px_50px_rgba(0,0,0,0.4)] animate-[bounce_5s_ease-in-out_infinite]"
              />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-[calc(100%+1.3px)] h-[120px]"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V46.35C50.62,54.1,105.14,61.76,161.41,62.1,216.49,62.43,266.38,57.19,321.39,56.44Z"
              fill="#f8fafc"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-12 -mt-16 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Sekolah", val: "54" },
              { label: "Kegiatan", val: "12" },
              { label: "Anggota", val: "500+" },
              { label: "Visi", val: "Banjar" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-md border border-white/50 p-10 rounded-[2.5rem] text-center shadow-lg shadow-blue-900/5 transition-all hover:-translate-y-2"
              >
                <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">
                  {stat.label}
                </p>
                <h3 className="text-4xl font-black text-blue-600 tracking-tighter">
                  {stat.val}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 reveal opacity-0 translate-y-[30px] transition-all duration-1000">
              <div className="relative group max-w-sm mx-auto">
                {" "}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-30 transition-all"></div>
                <img
                  src="cikokecil.png"
                  className="w-6/6 mx-auto rounded-[3rem] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700 object-contain aspect-video lg:aspect-square"
                  alt="Kegiatan Pelajar"
                />
              </div>
            </div>
            <div className="lg:w-1/2 space-y-8 reveal opacity-0 translate-y-[30px] transition-all duration-1000 delay-200">
              <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-800 leading-tight">
                Wadah Pemuda Banjar Berpikir dan Beraksi.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                FOBI adalah titik temu bagi para pemimpin muda tingkat menengah
                atas di Kota Banjar. Kami percaya bahwa perubahan besar dimulai
                dari kolaborasi kecil antar sekolah yang terorganisir dengan
                baik.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-5 rounded-3xl bg-blue-50 border border-blue-100">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 uppercase tracking-tight">
                      Fokus Masa Depan
                    </h4>
                    <p className="text-sm text-slate-500">
                      Menciptakan kurikulum kepemimpinan yang adaptif.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proker Section */}
      <section id="proker" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal opacity-0 translate-y-[30px] transition-all duration-1000">
            <div className="max-w-xl">
              <h4 className="text-blue-600 font-black uppercase tracking-widest text-xs mb-4">
                Eksplorasi Program
              </h4>
              <h2 className="text-4xl font-black text-slate-800">
                Agenda Kerja Aktif Kami
              </h2>
            </div>
            <a
              href="#"
              className="text-blue-600 font-bold flex items-center gap-2 hover:translate-x-2 transition-transform group"
            >
              Semua Program <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "LDK Terpadu",
                tag: "Leadership Camp",
                color: "bg-green-400",
                img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2000",
              },
              {
                title: "Banjar Youth Summit",
                tag: "Student Summit",
                color: "bg-blue-400",
                img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2000",
              },
              {
                title: "FOBI OLYMPICS",
                tag: "Olympic Day",
                color: "bg-yellow-400",
                img: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=2000",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-md border border-white/50 rounded-[3rem] p-4 group reveal opacity-0 translate-y-[30px] transition-all duration-1000"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="relative h-64 overflow-hidden rounded-[2.5rem] mb-6">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={item.title}
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30">
                    <span className="text-[10px] font-black text-white uppercase tracking-tighter">
                      {item.tag}
                    </span>
                    <span
                      className={`${item.color} w-2 h-2 rounded-full animate-pulse`}
                    ></span>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-xl font-black text-slate-800 mb-3 uppercase tracking-tighter">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Program kerja rutin yang bertujuan untuk mempererat
                    silaturahmi dan meningkatkan kompetensi pengurus OSIS.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                    <Calendar className="w-4 h-4" /> Detail Kegiatan
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-slate-400 pt-32 pb-24 lg:pb-12 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16 mb-20">
            <div className="space-y-8">
              <img
                src="logo.png"
                className="h-16 w-auto filter brightness-200"
                alt="Logo Footer"
              />
              <h3 className="text-3xl font-black text-white leading-tight tracking-tighter">
                FORUM OSIS
                <br />
                BANJAR IDAMAN
              </h3>
              <p className="leading-relaxed text-sm max-w-xs">
                Organisasi wadah aspirasi dan kolaborasi pelajar resmi di bawah
                naungan Dinas Pendidikan Kota Banjar.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px]">
                  Peta Situs
                </h4>
                <ul className="space-y-4 text-sm font-medium">
                  {["Sejarah", "Visi Misi", "Galeri", "Kontak"].map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="hover:text-blue-400 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px]">
                  Alamat Kami
                </h4>
                <div className="space-y-4 text-sm font-medium">
                  <p className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                    <span>Sekretariat Kota Banjar, Jawa Barat</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                    <span>admin@fobi.id</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 p-10 rounded-[2.5rem] border border-slate-700/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-600/20 transition-all"></div>
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-400" /> Newsletter
              </h4>
              <p className="text-xs mb-6 leading-relaxed">
                Dapatkan update program terbaru FOBI langsung ke email kamu.
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email kamu..."
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl py-4 px-6 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl transition-colors">
                  Gabung
                </button>
              </div>
            </div>
          </div>

          <div className="text-center pt-10 border-t border-slate-800 text-[10px] font-bold uppercase tracking-[0.5em] text-slate-500">
            &copy; {new Date().getFullYear()} FOBI MEDIA CENTER - Banjar Idaman.
          </div>
        </div>
      </footer>
    </div>
  );
}
