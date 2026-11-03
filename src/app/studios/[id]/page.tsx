import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Users, Shield, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import BookingModal from "@/components/BookingModal"; // Path onujayi import korun
import {  gettokenfromserver } from "@/lib/gettokenfromserver";

interface StudioDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function StudioDetailsPage({ params }: StudioDetailsPageProps) {
  const { id } = await params;


 const token = await gettokenfromserver();

  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) notFound();
  const studio = await res.json();

  const hourlyRate = studio?.hourlyRate || 0;
  const securityDeposit = studio?.securityDeposit || 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
      <div className="max-w-6xl mx-auto space-y-8">
        
      
        <Link href="/studios" className="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </Link>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                {studio.category}
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{studio.title}</h1>

              <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-sm">
                <MapPin className="w-4 h-4 text-amber-500" />
                {studio.location}
              </p>

              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-800">
                <Image src={studio.image} alt={studio.title} fill className="object-cover" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                  <span className="text-xs text-slate-400 font-bold uppercase block">Max Capacity</span>
                  <span className="text-lg font-extrabold mt-1 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-amber-500" /> {studio.maxCapacity ?? "30"} Persons
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                  <span className="text-xs text-slate-400 font-bold uppercase block">Security Deposit</span>
                  <span className="text-lg font-extrabold mt-1 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-amber-500" /> ${securityDeposit}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-bold">About This Workspace</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {studio.description || "Massive creative soundstage with professional lighting grid, acoustic treatment, and premium facilities."}
                </p>
              </div>

              
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold">Equipment & Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cyclorama Wall
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Soundproof Vocal Booth
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> High-Speed Gigabit WiFi
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 4K DMX Lighting Grid
                  </div>
                </div>
              </div>
            </div>
          </div>

         
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-lg space-y-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-amber-500">${hourlyRate}</span>
                  <span className="text-xs text-slate-400 font-medium"> / hour</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full">
                  <span>★ {studio.rating ?? "5.0"}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-slate-500">
                  <span>Security Deposit</span>
                  <span className="font-bold text-slate-900 dark:text-white">${securityDeposit}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Cancellation Policy</span>
                  <span className="font-bold text-emerald-600">Free before shoot</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Availability</span>
                  <span className="font-bold text-slate-900 dark:text-white">Instant Request Slots</span>
                </div>
              </div>

             
              <BookingModal
                studioId={id}
                studioTitle={studio.title}
                studioLocation={studio.location}
                studioImage={studio.image}
                hourlyRate={hourlyRate}
                securityDeposit={securityDeposit}
                token={token}
              />

              <p className="text-[11px] text-center text-slate-400">
                You won&apos;t be charged immediately. This reservation will enter pending status for host approval.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}