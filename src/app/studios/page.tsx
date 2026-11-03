"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Search } from "lucide-react";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  hourlyRate: number;
  securityDeposit?: number;
  maxCapacity?: number;
  rating?: number;
}

export default function StudiosPage() {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category");

  const [studios, setStudios] = useState<Studio[]>([]);
  const [filteredStudios, setFilteredStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryQuery || "All");

  useEffect(() => {
    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    }
  }, [categoryQuery]);

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`);
        const data = await res.json();
        const studioList = Array.isArray(data) ? data : [];
        setStudios(studioList);
        setFilteredStudios(studioList);
      } catch (error) {
        console.error("Failed to fetch studios", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, []);

  useEffect(() => {
    let result = studios;

    // Filter by category
    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter((studio) => studio.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (studio) =>
          studio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          studio.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStudios(result);
  }, [selectedCategory, searchTerm, studios]);

  const categories = ["All", "Photo Studios", "Sound Stages", "Podcast Rooms", "Music Suites", "Art Workshops"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Explore Creative Workspaces</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Discover and book professional studios for your next project.</p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-amber-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Studios Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-medium">Loading workspaces...</div>
        ) : filteredStudios.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-slate-500 dark:text-slate-400">No studios found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudios.map((studio) => (
              <div
                key={studio._id}
                className="card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-48 w-full bg-slate-800">
                  <Image
                    src={studio.image}
                    alt={studio.title}
                    fill
                    className="object-cover"
                  />
                  <span className="badge badge-primary absolute top-3 left-3 bg-amber-400 text-slate-950 font-bold border-none text-xs px-3 py-1">
                    {studio.category}
                  </span>
                </div>

                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-extrabold text-lg line-clamp-1">{studio.title}</h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{studio.rating ?? 4.9}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      {studio.location}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Hourly Rate</span>
                      <span className="text-lg font-black text-amber-500">${studio.hourlyRate} <span className="text-xs text-slate-400 font-medium">/ hr</span></span>
                    </div>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition"
                    >
                      View Details
                    </Link>
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