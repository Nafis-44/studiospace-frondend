"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { ArrowRight, Sparkles } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Image from "next/image";

export default function Banner() {
  const slides = [
    {
      id: 1,
      badge: "PREMIER ACOUSTIC HUBS",
      title: "Unlock World-Class Spaces Built for Visionary Creators",
      subtitle:
        "Access acoustic-treated mixing suites, modular photo studios, and 8K cinema stages equipped with pro gear.",
      image: "/banner-1.jpg",
    },
    {
      id: 2,
      badge: "CINEMATIC CYC & LIGHTING",
      title: "Elevate Visual Content in High-End Production Lounges",
      subtitle:
        "Seamlessly reserve pre-rigged lighting soundstages, green screen walls, and multi-cam broadcast setups.",
      image: "/banner-2.jpg",
    },
    {
      id: 3,
      badge: "CREATIVE SOUNDSUITES",
      title: "Record Superior Audio in Dolby Atmos Calibrated Rooms",
      subtitle:
        "Book vintage vocal booths, soundproof podcast spaces, and live acoustic setups with instant hourly rates.",
      image: "/banner-3.jpg",
    },
  ];

  return (
    <section className="relative w-full h-[85vh] min-h-[550px] max-h-[750px] bg-slate-950 overflow-hidden select-none">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect={"fade"}
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40 z-10" />

            {/* Local Image Path */}
            <Image
              src='/banner.jpg'
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              width={300}
              height={300}
            />

            {/* Banner Content */}
            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center z-20">
              <div className="max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                    {slide.badge}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                  {slide.title}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
                  {slide.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/studios"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition duration-300 transform hover:-translate-y-0.5"
                  >
                    <span>Explore Studios</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/studios"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 font-semibold text-sm backdrop-blur-md transition duration-300 transform hover:-translate-y-0.5"
                  >
                    Host Your Space
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}