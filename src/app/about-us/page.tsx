import Link from "next/link";
import { Sparkles, Shield, Users, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden space-y-4 shadow-xl">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl" />
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">About StudioSpace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Empowering Creators Worldwide</h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            StudioSpace is the premier creative marketplace connecting photographers, filmmakers, podcasters, and musicians with world-class professional workspaces and soundstages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <Users className="w-8 h-8 text-amber-500" />
            <h3 className="font-bold text-lg">For Creators</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Find acoustic-treated soundstages, Cyclorama walls, and fully-equipped lighting grids instantly.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <Shield className="w-8 h-8 text-amber-500" />
            <h3 className="font-bold text-lg">Secure Booking</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              JWT-secured authentication, double-booking prevention, and seamless instant request workflows.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <CheckCircle2 className="w-8 h-8 text-amber-500" />
            <h3 className="font-bold text-lg">Verified Hosts</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every studio listing is managed by verified professionals with complete transparent pricing and policies.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}