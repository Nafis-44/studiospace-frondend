import Link from "next/link";
import { Search, Calendar, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Discover Spaces",
      description: "Filter verified cyc walls, podcast lounges, soundstages, and mixing suites by location, gear inventory, and creator reviews.",
      icon: <Search className="w-6 h-6 text-amber-500" />
    },
    {
      step: "02",
      title: "Select Shoot Hours",
      description: "Inspect live calendar availability, choose precise hourly blocks, and review transparent breakdown rates with zero surprise fees.",
      icon: <Calendar className="w-6 h-6 text-blue-500" />
    },
    {
      step: "03",
      title: "Book Instantly",
      description: "Lock in your reservation with double-booking collision prevention, instant host confirmation, and downloadable invoice vouchers.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />
    },
    {
      step: "04",
      title: "Create & Produce",
      description: "Arrive at the stage with verified access codes, plug into ready-calibrated equipment grids, and bring your vision to life.",
      icon: <Sparkles className="w-6 h-6 text-purple-500" />
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">Frictionless Booking</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">How StudioSpace Works</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
            Four simple steps from pre-production concept to rolling camera in world-class creative facilities.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition">
                    {item.icon}
                  </div>
                  <span className="text-xl font-black text-slate-300 dark:text-slate-700">{item.step}</span>
                </div>
                <h3 className="font-extrabold text-lg mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div>
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20 transition"
          >
            <span>Start Exploring Workspaces</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}