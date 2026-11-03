"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { PlusCircle, Sparkles, DollarSign, MapPin, Users, Image as ImageIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { gettokenfromclient } from "@/lib/gettokenfromClient";

export default function AddStudioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Real user state dynamically load korar jonno
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    // Login korar shomoy jodi user info localStorage-e save koren (jemon: localStorage.setItem('user', JSON.stringify({name, email})))
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        name: parsedUser.name || "Anonymous Creator",
        email: parsedUser.email || "creator@studio.com",
      });
    } else {
      // Jodi login na kora thake, tahole login page-e pathiye dite paren
      // router.push("/login");
      
      // Temporary fallback jate error na ase
      setUser({
        name: "Logged-in User",
        email: "user@studiospace.com",
      });
    }
  }, [router]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await gettokenfromclient(); // Client-side token fetch
    setLoading(true);

    const studioPayload = {
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
      securityDeposit: Number(formData.securityDeposit),
      maxCapacity: Number(formData.maxCapacity),
      ownerName: user.name,
      ownerEmail: user.email,
      createdAt: new Date(),
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-studio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(studioPayload),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Studio added successfully! 🎉");
        setTimeout(() => {
          router.push("/my-listings");
        }, 1500);
      } else {
        toast.error(result.error || "Failed to add studio");
      }
    } catch (error) {
      toast.error("Server connection error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-right" />
      
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        
        {/* Form Header */}
        <div className="bg-slate-900 text-white p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl" />
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">Creator Hosting</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">List Your Creative Space</h1>
          <p className="text-slate-400 text-sm mt-1">Publish your production studio, soundstage, or lounge for visionary creators.</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
          
          {/* Read-only User Details Section (Dynamic) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Host Name (Read-only)</label>
              <input
                type="text"
                value={user.name}
                disabled
                className="w-full mt-1 bg-transparent text-sm font-bold text-slate-700 dark:text-slate-200 cursor-not-allowed outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Host Email (Read-only)</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full mt-1 bg-transparent text-sm font-bold text-slate-700 dark:text-slate-200 cursor-not-allowed outline-none"
              />
            </div>
          </div>

          {/* Studio Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Studio Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Apex Cyclorama Photostudio & Stage"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
            />
          </div>

          {/* Category & Max Capacity */}
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
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Max Capacity (Persons)</label>
              <div className="relative">
                <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  name="maxCapacity"
                  required
                  placeholder="e.g. 15"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Hourly Rate & Security Deposit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Hourly Rate ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  name="hourlyRate"
                  required
                  placeholder="65"
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
                  placeholder="150"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Location & Image URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Location / Address</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="Downtown Creative District"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Image URL (ImgBB/Unsplash)</label>
              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  name="image"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Amenities List */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Amenities (Comma separated)</label>
            <input
              type="text"
              name="amenities"
              placeholder="Acoustic Treatment, 4K Lighting Grid, Wi-Fi, Dressing Room"
              value={formData.amenities}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
            />
          </div>

          {/* Detailed Overview */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Detailed Overview</label>
            <textarea
              name="description"
              rows={4}
              required
              placeholder="Describe your studio's acoustic setup, natural lighting, gear specs..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Publishing Studio...</span>
            ) : (
              <>
                <PlusCircle className="w-5 h-5" />
                <span>Publish Studio Listing</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}

















// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import toast, { Toaster } from "react-hot-toast";
// import { PlusCircle, Sparkles, DollarSign, MapPin, Users, Image as ImageIcon } from "lucide-react";
// import { authClient } from "@/lib/auth-client";

// export default function AddStudioPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   // Better Auth session theke real user data ana
//   const { data: session, isPending } = authClient.useSession();
//   const user = session?.user;

//   // Private Route check: Login na thakle sign-in page-e pathiye dibe
//   useEffect(() => {
//     if (!isPending && !user) {
//       router.push("/sign-in");
//     }
//   }, [user, isPending, router]);

//   const [formData, setFormData] = useState({
//     title: "",
//     category: "Photo Studios",
//     hourlyRate: "",
//     securityDeposit: "",
//     maxCapacity: "",
//     location: "",
//     image: "",
//     amenities: "",
//     description: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return;
    
//     setLoading(true);

//     const studioPayload = {
//       ...formData,
//       hourlyRate: Number(formData.hourlyRate),
//       securityDeposit: Number(formData.securityDeposit),
//       maxCapacity: Number(formData.maxCapacity),
//       ownerName: user.name || "Creator",
//       ownerEmail: user.email,
//       createdAt: new Date(),
//     };

//     try {
//       const response = await fetch("http://localhost:8000/add-studio", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(studioPayload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Studio added successfully! 🎉");
//         setTimeout(() => {
//           router.push("/my-listings");
//         }, 1500);
//       } else {
//         toast.error(data.error || "Failed to add studio");
//       }
//     } catch (error) {
//       toast.error("Server connection error!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Session load howar shomoy loading text dekhabe
//   if (isPending) {
//     return <div className="text-center py-20 font-medium">Checking authentication...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
//       <Toaster position="top-right" />
      
//       <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        
//         {/* Form Header */}
//         <div className="bg-slate-900 text-white p-8 sm:p-10 relative overflow-hidden">
//           <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl" />
//           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 mb-4">
//             <Sparkles className="w-3.5 h-3.5 text-amber-400" />
//             <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">Creator Hosting</span>
//           </div>
//           <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">List Your Creative Space</h1>
//           <p className="text-slate-400 text-sm mt-1">Publish your production studio, soundstage, or lounge for visionary creators.</p>
//         </div>

//         {/* Form Body */}
//         <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
          
//           {/* Read-only User Details Section */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
//             <div>
//               <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Host Name (Read-only)</label>
//               <input
//                 type="text"
//                 value={user?.name || ""}
//                 disabled
//                 className="w-full mt-1 bg-transparent text-sm font-bold text-slate-700 dark:text-slate-200 cursor-not-allowed outline-none"
//               />
//             </div>
//             <div>
//               <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Host Email (Read-only)</label>
//               <input
//                 type="email"
//                 value={user?.email || ""}
//                 disabled
//                 className="w-full mt-1 bg-transparent text-sm font-bold text-slate-700 dark:text-slate-200 cursor-not-allowed outline-none"
//               />
//             </div>
//           </div>

//           {/* Studio Title */}
//           <div>
//             <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Studio Title</label>
//             <input
//               type="text"
//               name="title"
//               required
//               placeholder="e.g. Apex Cyclorama Photostudio & Stage"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
//             />
//           </div>

//           {/* Category & Max Capacity */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Category</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
//               >
//                 <option value="Photo Studios">Photo Studios</option>
//                 <option value="Sound Stages">Sound Stages</option>
//                 <option value="Podcast Rooms">Podcast Rooms</option>
//                 <option value="Music Suites">Music Suites</option>
//                 <option value="Art Workshops">Art Workshops</option>
//                 <option value="Film Stage">Film Stage</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Max Capacity (Persons)</label>
//               <div className="relative">
//                 <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
//                 <input
//                   type="number"
//                   name="maxCapacity"
//                   required
//                   placeholder="e.g. 15"
//                   value={formData.maxCapacity}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Hourly Rate & Security Deposit */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Hourly Rate ($)</label>
//               <div className="relative">
//                 <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
//                 <input
//                   type="number"
//                   name="hourlyRate"
//                   required
//                   placeholder="65"
//                   value={formData.hourlyRate}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Security Deposit ($)</label>
//               <div className="relative">
//                 <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
//                 <input
//                   type="number"
//                   name="securityDeposit"
//                   required
//                   placeholder="150"
//                   value={formData.securityDeposit}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Location & Image URL */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Location / Address</label>
//               <div className="relative">
//                 <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
//                 <input
//                   type="text"
//                   name="location"
//                   required
//                   placeholder="Downtown Creative District"
//                   value={formData.location}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Image URL (ImgBB/Unsplash)</label>
//               <div className="relative">
//                 <ImageIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
//                 <input
//                   type="url"
//                   name="image"
//                   required
//                   placeholder="https://images.unsplash.com/..."
//                   value={formData.image}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Amenities List */}
//           <div>
//             <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Amenities (Comma separated)</label>
//             <input
//               type="text"
//               name="amenities"
//               placeholder="Acoustic Treatment, 4K Lighting Grid, Wi-Fi, Dressing Room"
//               value={formData.amenities}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
//             />
//           </div>

//           {/* Detailed Overview */}
//           <div>
//             <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">Detailed Overview</label>
//             <textarea
//               name="description"
//               rows={4}
//               required
//               placeholder="Describe your studio's acoustic setup, natural lighting, gear specs..."
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition resize-none"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
//           >
//             {loading ? (
//               <span>Publishing Studio...</span>
//             ) : (
//               <>
//                 <PlusCircle className="w-5 h-5" />
//                 <span>Publish Studio Listing</span>
//               </>
//             )}
//           </button>

//         </form>

//       </div>
//     </div>
//   );
// }