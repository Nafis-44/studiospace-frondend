"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Edit, MapPin, DollarSign, PlusCircle, Sparkles } from "lucide-react";
import Image from "next/image";

export default function MyListingsPage() {
  const [studios, setStudios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        // এখানে /featured-studios এর বদলে /studios দেওয়া হলো যাতে সব ডেটা (৯+ টা) একসাথে পাওয়া যায়
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`);
        const data = await response.json();
        setStudios(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error("Failed to load listings");
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this studio?")) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Studio deleted successfully!");
        setStudios(studios.filter((studio) => studio._id !== id));
      } else {
        toast.error("Failed to delete studio");
      }
    } catch (error) {
      toast.error("Server error during deletion");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">Creator Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">My Studio Listings</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage, update, or remove your published creative workspaces.</p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm shadow-md transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Studio</span>
          </Link>
        </div>

        {/* Listings List (Horizontal Row Style) */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-medium">Loading your listings...</div>
        ) : studios.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-slate-500 dark:text-slate-400 mb-4">No studio listings found.</p>
            <Link
              href="/add-studio"
              className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm"
            >
              Publish Your First Studio
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {studios.map((studio) => (
              <div
                key={studio._id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition hover:shadow-md"
              >
                {/* Left Side: Image & Info */}
                <div className="flex items-center gap-4">
                  <Image
                    src={studio.image}
                    alt={studio.title}
                    className="w-24 h-24 rounded-xl object-cover shrink-0 bg-slate-800"
                    width={96}
                    height={96}
                  />
                  <div className="space-y-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                      {studio.category}
                    </span>
                    <h3 className="font-extrabold text-lg line-clamp-1">{studio.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      {studio.location}
                    </p>
                  </div>
                </div>

                {/* Right Side: Pricing & Actions */}
                <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-slate-800 gap-4">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Hourly Rate</span>
                    <span className="text-2xl font-black text-amber-500">${studio.hourlyRate} <span className="text-xs text-slate-400 font-medium">/ hr</span></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/studios/edit/${studio._id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs transition"
                    >
                      <Edit className="w-3.5 h-3.5 text-amber-500" />
                      <span>Edit</span>
                    </Link>

                    <button
                      onClick={() => handleDelete(studio._id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 font-bold text-xs transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}