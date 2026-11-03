"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Edit3, Sparkles, DollarSign, MapPin, Users, Image as ImageIcon } from "lucide-react";
import { gettokenfromclient } from "@/lib/gettokenfromClient";
import { authClient } from "@/lib/auth-client";

function EditStudioContent() {
  const router = useRouter();
  const params = useParams();
  
  // ID sothikvabe extract kora
  const id = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [hostInfo, setHostInfo] = useState({
    name: "Shariar Nafis",
    email: "shariar4436@gmail.com",
  });

  const [formData, setFormData] = useState({
    title: "",
    category: "Photo Studios",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    image: "",
    amenities: "",
    description: "",
  });

  // Logged-in user session fetch kora
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setHostInfo({
            name: session.data.user.name || "Shariar Nafis",
            email: session.data.user.email || "shariar4436@gmail.com",
          });
        }
      } catch (err) {
        console.error("Session error", err);
      }
    };
    fetchSession();
  }, []);

  // Studio Data Fetch by ID with Token (Backend verifyApi-er jonno)
  useEffect(() => {
    if (!id) return;

    const loadStudioData = async () => {
      try {
        const token = await gettokenfromclient(); // Client token ana holo

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`, {
          headers: {
            authorization: `Bearer ${token}`, // Token pass kora holo
          },
        });
        const data = await res.json();

        if (data) {
          setFormData({
            title: data.title || "",
            category: data.category || "Photo Studios",
            hourlyRate: data.hourlyRate ?? "",
            securityDeposit: data.securityDeposit ?? "",
            maxCapacity: data.maxCapacity ?? "",
            location: data.location || "",
            image: data.image || "",
            amenities: data.amenities || "",
            description: data.description || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch studio:", err);
        toast.error("Failed to load studio details");
      } finally {
        setFetching(false);
      }
    };

    loadStudioData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await gettokenfromclient(); 
    setLoading(true);

    const updatedPayload = {
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
      securityDeposit: Number(formData.securityDeposit),
      maxCapacity: Number(formData.maxCapacity),
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPayload),
      });

      if (response.ok) {
        toast.success("Studio updated successfully! 🎉");
        setTimeout(() => {
          router.push("/my-listings");
        }, 1500);
      } else {
        toast.error("Failed to update studio");
      }
    } catch (error) {
      toast.error("Server connection error!");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 font-medium">
        Loading studio data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-right" />
      
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        
        <div className="bg-slate-900 text-white p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl" />
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">Creator Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Update Studio Listing</h1>
          <p className="text-slate-400 text-sm mt-1">Modify your studio specifications, pricing, and details.</p>
        </div>

        <form onSubmit={handleUpdate} className="p-8 sm:p-10 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Host Name (Logged-in)</label>
              <input
                type="text"
                value={hostInfo.name}
                disabled
                className="w-full mt-1 bg-transparent text-sm font-bold text-slate-700 dark:text-slate-200 cursor-not-allowed outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Host Email (Logged-in)</label>
              <input
                type="email"
                value={hostInfo.email}
                disabled
                className="w-full mt-1 bg-transparent text-sm font-bold text-slate-700 dark:text-slate-200 cursor-not-allowed outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Studio Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
              >
                <option value="Photo Studios">Photo Studios</option>
                <option value="Sound Stages">Sound Stages</option>
                <option value="Podcast Rooms">Podcast Rooms</option>
                <option value="Music Suites">Music Suites</option>
                <option value="Art Workshops">Art Workshops</option>
                <option value="Film Stage">Film Stage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Max Capacity</label>
              <div className="relative">
                <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  name="maxCapacity"
                  required
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Hourly Rate ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  name="hourlyRate"
                  required
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Security Deposit ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  name="securityDeposit"
                  required
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  name="image"
                  required
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Amenities</label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Description</label>
            <textarea
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Updating Studio...</span>
            ) : (
              <>
                <Edit3 className="w-5 h-5" />
                <span>Save Changes</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}

export default function EditStudioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">Loading...</div>}>
      <EditStudioContent />
    </Suspense>
  );
}