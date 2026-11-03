"use client";

import Link from "next/link";
import { Camera, Mic, Radio, Music, Palette } from "lucide-react";

const categories = [
  {
    name: "Photo Studios",
    description: "Cyclorama walls, natural daylight lofts, and professional lighting setups.",
    icon: <Camera className="w-6 h-6 text-amber-500" />,
    slug: "Photo Studios"
  },
  {
    name: "Sound Stages",
    description: "Acoustic blackboxes, green screens, catwalk power, and drive-in access.",
    icon: <Radio className="w-6 h-6 text-purple-500" />,
    slug: "Sound Stages"
  },
  {
    name: "Podcast Rooms",
    description: "Turnkey audio/video recording with multi-cam 4K switchers and Shure mics.",
    icon: <Mic className="w-6 h-6 text-emerald-500" />,
    slug: "Podcast Rooms"
  },
  {
    name: "Music Suites",
    description: "Dolby Atmos monitoring, analog consoles, vocal booths, and live rooms.",
    icon: <Music className="w-6 h-6 text-amber-400" />,
    slug: "Music Suites"
  },
  {
    name: "Art Workshops",
    description: "Ceramic kilns, pottery wheels, printmaking presses, and raw maker space.",
    icon: <Palette className="w-6 h-6 text-rose-500" />,
    slug: "Art Workshops"
  }
];

export default function Category() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">Curated Production Categories</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">Browse by Creative Discipline</h2>
          </div>
          <Link 
            href="/studios" 
            className="text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline mt-2 md:mt-0"
          >
            Explore All Workspaces →
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/studios?category=${encodeURIComponent(cat.slug)}`}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-400/50 transition flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
                  {cat.icon}
                </div>
                <h3 className="font-extrabold text-base mb-2 group-hover:text-amber-500 transition">{cat.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">{cat.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-amber-500 transition">
                <span>View Spaces</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}