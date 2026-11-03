// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import { MapPin, Users, Shield, ArrowLeft, CheckCircle2, X, Calendar } from "lucide-react";
// import Link from "next/link";

// interface Studio {
//   _id?: string;
//   title: string;
//   category: string;
//   location: string;
//   image: string;
//   hourlyRate: number;
//   securityDeposit?: number;
//   maxCapacity?: number;
//   rating?: number;
//   description?: string;
// }

// export default function StudioDetailsPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [studio, setStudio] = useState<Studio | null>(null);
//   const [loading, setLoading] = useState(true);
  
//   // Modal State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [shootDate, setShootDate] = useState("2026-11-15");
//   const [startTime, setStartTime] = useState("10:00 AM");
//   const [endTime, setEndTime] = useState("02:00 PM");
//   const [crewCount, setCrewCount] = useState(4);
//   const [gearNotes, setGearNotes] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (!id) return;

//     const fetchStudioDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/studios/${id}`);
//         const data = await response.json();
//         setStudio(data);
//       } catch (error) {
//         console.error("Failed to fetch studio details", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudioDetails();
//   }, [id]);

//   const hourlyRate = studio?.hourlyRate || 135;
//   const securityDeposit = studio?.securityDeposit || 150;
//   const totalHours = 4; // demo calculation
//   const estimatedTotal = hourlyRate * totalHours + securityDeposit;

//   // Real Backend API Call
//   const handleConfirmBooking = async () => {
//     if (!studio) return;
//     setSubmitting(true);
//     try {
//       const bookingData = {
//         studioId: id,
//         studioTitle: studio.title,
//         studioLocation: studio.location,
//         studioImage: studio.image,
//         shootDate,
//         startTime,
//         endTime,
//         crewCount,
//         gearNotes,
//         totalAmount: estimatedTotal,
//         status: "Pending Host Approval",
//       };

//       const response = await fetch("http://localhost:8000/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (response.ok) {
//         setIsModalOpen(false);
//         router.push("/my-bookings");
//       } else {
//         alert("Failed to confirm booking!");
//       }
//     } catch (error) {
//       console.error("Error creating booking:", error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-20 text-slate-400 font-medium">Loading studio details...</div>;
//   }

//   if (!studio) {
//     return (
//       <div className="text-center py-20">
//         <h2 className="text-2xl font-bold mb-4">Studio not found</h2>
//         <Link href="/studios" className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold">
//           Back to Studios
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
//       <div className="max-w-6xl mx-auto space-y-8">
        
//         {/* Back Link */}
//         <Link href="/studios" className="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:underline">
//           <ArrowLeft className="w-4 h-4" />
//           <span>Back to Explore</span>
//         </Link>

//         {/* Main Grid Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
//               <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
//                 {studio.category}
//               </span>

//               <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{studio.title}</h1>

//               <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-sm">
//                 <MapPin className="w-4 h-4 text-amber-500" />
//                 {studio.location}
//               </p>

//               <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-800">
//                 <Image src={studio.image} alt={studio.title} fill className="object-cover" />
//               </div>

//               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
//                 <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
//                   <span className="text-xs text-slate-400 font-bold uppercase block">Max Capacity</span>
//                   <span className="text-lg font-extrabold mt-1 flex items-center gap-1.5">
//                     <Users className="w-4 h-4 text-amber-500" /> {studio.maxCapacity ?? "30"} Persons
//                   </span>
//                 </div>

//                 <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
//                   <span className="text-xs text-slate-400 font-bold uppercase block">Security Deposit</span>
//                   <span className="text-lg font-extrabold mt-1 flex items-center gap-1.5">
//                     <Shield className="w-4 h-4 text-amber-500" /> ${securityDeposit}
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
//                 <h3 className="text-xl font-bold">About This Workspace</h3>
//                 <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
//                   {studio.description || "Massive creative soundstage with professional lighting grid, acoustic treatment, and premium facilities."}
//                 </p>
//               </div>

//               {/* Amenities */}
//               <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
//                 <h3 className="text-lg font-bold">Equipment & Amenities</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium text-slate-600 dark:text-slate-300">
//                   <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cyclorama Wall
//                   </div>
//                   <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Soundproof Vocal Booth
//                   </div>
//                   <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" /> High-Speed Gigabit WiFi
//                   </div>
//                   <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 4K DMX Lighting Grid
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Booking Card */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-lg space-y-6">
//               <div className="flex items-baseline justify-between">
//                 <div>
//                   <span className="text-2xl sm:text-3xl font-black text-amber-500">${hourlyRate}</span>
//                   <span className="text-xs text-slate-400 font-medium"> / hour</span>
//                 </div>
//                 <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full">
//                   <span>★ {studio.rating ?? "5.0"}</span>
//                 </div>
//               </div>

//               <div className="space-y-3 text-xs pt-4 border-t border-slate-100 dark:border-slate-800">
//                 <div className="flex justify-between text-slate-500">
//                   <span>Security Deposit</span>
//                   <span className="font-bold text-slate-900 dark:text-white">${securityDeposit}</span>
//                 </div>
//                 <div className="flex justify-between text-slate-500">
//                   <span>Cancellation Policy</span>
//                   <span className="font-bold text-emerald-600">Free before shoot</span>
//                 </div>
//                 <div className="flex justify-between text-slate-500">
//                   <span>Availability</span>
//                   <span className="font-bold text-slate-900 dark:text-white">Instant Request Slots</span>
//                 </div>
//               </div>

//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm shadow-md transition text-center cursor-pointer"
//               >
//                 Book Workspace Now
//               </button>

//               <p className="text-[11px] text-center text-slate-400">
//                 You won&apos;t be charged immediately. This reservation will enter pending status for host approval.
//               </p>
//             </div>
//           </div>

//         </div>

//       </div>

//       {/* Booking Modal (Popup) */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
            
//             {/* Close Button */}
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <div>
//               <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500">Reserve Creative Slot</span>
//               <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">{studio.title}</h2>
//               <p className="text-xs text-slate-400 mt-0.5">Rate: ${hourlyRate}/hr • Deposit: ${securityDeposit}</p>
//             </div>

//             <div className="space-y-4 text-xs">
//               <div>
//                 <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Shoot Date</label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
//                   <input
//                     type="date"
//                     value={shootDate}
//                     onChange={(e) => setShootDate(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-medium"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Start Time</label>
//                   <input
//                     type="text"
//                     value={startTime}
//                     onChange={(e) => setStartTime(e.target.value)}
//                     className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-medium"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">End Time</label>
//                   <input
//                     type="text"
//                     value={endTime}
//                     onChange={(e) => setEndTime(e.target.value)}
//                     className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-medium"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Expected Crew / Talent Count (Max 30)</label>
//                 <input
//                   type="number"
//                   value={crewCount}
//                   onChange={(e) => setCrewCount(Number(e.target.value))}
//                   className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-medium"
//                 />
//               </div>

//               <div>
//                 <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Production Requirements / Gear Notes (Optional)</label>
//                 <textarea
//                   rows={2}
//                   placeholder="e.g. Bringing high-output lighting, smoke machine, heavy rigging..."
//                   value={gearNotes}
//                   onChange={(e) => setGearNotes(e.target.value)}
//                   className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-medium resize-none"
//                 />
//               </div>

//               <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-slate-500">
//                 <div className="flex justify-between">
//                   <span>${hourlyRate} × {totalHours} sheet hours</span>
//                   <span className="font-bold text-slate-900 dark:text-white">${hourlyRate * totalHours}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Refundable Security Deposit</span>
//                   <span className="font-bold text-slate-900 dark:text-white">${securityDeposit}</span>
//                 </div>
//                 <div className="flex justify-between text-sm font-black text-amber-600 pt-2 border-t border-slate-100 dark:border-slate-800">
//                   <span>Total Estimated Cost</span>
//                   <span>${estimatedTotal}</span>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={handleConfirmBooking}
//               disabled={submitting}
//               className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-lg transition text-center cursor-pointer disabled:opacity-50"
//             >
//               {submitting ? "Sending Request..." : "⚡ Confirm & Send Booking Request"}
//             </button>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }


















// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import { MapPin, Users, Shield, ArrowLeft, CheckCircle2, X, Calendar } from "lucide-react";
// import Link from "next/link";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// interface Studio {
//   _id?: string;
//   title: string;
//   category: string;
//   location: string;
//   image: string;
//   hourlyRate: number;
//   securityDeposit?: number;
//   maxCapacity?: number;
//   rating?: number;
//   description?: string;
// }

// export default function StudioDetailsPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [studio, setStudio] = useState<Studio | null>(null);
//   const [loading, setLoading] = useState(true);
  
//   // Modal State - Default value gulo blank/empty kore dewa hoyeche
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [shootDate, setShootDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [crewCount, setCrewCount] = useState<number | "">("");
//   const [gearNotes, setGearNotes] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   useEffect( () => {
//     if (!id) return;

   
    
//     const fetchStudioDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/studios/${id}`,{
//           headers: {
//             authorization:"user logged in",
//           }
//         });
//         const data = await response.json();
//         setStudio(data);
//       } catch (error) {
//         console.error("Failed to fetch studio details", error);
//       } finally {
//         setLoading(false);
//       }
//     };
    

//     fetchStudioDetails();
//   }, [id]);

//   const hourlyRate = studio?.hourlyRate || 0;
//   const securityDeposit = studio?.securityDeposit || 0;
//   const totalHours = 4; // demo calculation
//   const estimatedTotal = hourlyRate * totalHours + securityDeposit;

//   // Real Backend API Call
//   const handleConfirmBooking = async () => {
//     if (!studio) return;
//     setSubmitting(true);
//     try {
//       const bookingData = {
//         studioId: id,
//         studioTitle: studio.title,
//         studioLocation: studio.location,
//         studioImage: studio.image,
//         date: shootDate, // Backend duplicate check-er jonno 'date' key name match kora holo
//         shootDate,
//         startTime,
//         endTime,
//         crewCount,
//         gearNotes,
//         totalAmount: estimatedTotal,
//         status: "Pending",
//       };

//       const response = await fetch("http://localhost:8000/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bookingData),
//       });

//       const resData = await response.json();

//       if (response.ok) {
//         setIsModalOpen(false);
//         router.push("/my-bookings");
//       } else {
//         alert(resData.error || "Failed to confirm booking!");
//       }
//     } catch (error) {
//       console.error("Error creating booking:", error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-20 text-slate-400 font-medium">Loading studio details...</div>;
//   }

//   if (!studio) {
//     return (
//       <div className="text-center py-20">
//         <h2 className="text-2xl font-bold mb-4">Studio not found</h2>
//         <Link href="/studios" className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold">
//           Back to Studios
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
//       <div className="max-w-6xl mx-auto space-y-8">
        
//         {/* Back Link */}
//         <Link href="/studios" className="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:underline">
//           <ArrowLeft className="w-4 h-4" />
//           <span>Back to Explore</span>
//         </Link>

//         {/* Main Grid Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
//               <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
//                 {studio.category}
//               </span>

//               <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{studio.title}</h1>

//               <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-sm">
//                 <MapPin className="w-4 h-4 text-amber-500" />
//                 {studio.location}
//               </p>

//               <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-800">
//                 <Image src={studio.image} alt={studio.title} fill className="object-cover" />
//               </div>

//               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
//                 <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
//                   <span className="text-xs text-slate-400 font-bold uppercase block">Max Capacity</span>
//                   <span className="text-lg font-extrabold mt-1 flex items-center gap-1.5">
//                     <Users className="w-4 h-4 text-amber-500" /> {studio.maxCapacity ?? "30"} Persons
//                   </span>
//                 </div>

//                 <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
//                   <span className="text-xs text-slate-400 font-bold uppercase block">Security Deposit</span>
//                   <span className="text-lg font-extrabold mt-1 flex items-center gap-1.5">
//                     <Shield className="w-4 h-4 text-amber-500" /> ${securityDeposit}
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
//                 <h3 className="text-xl font-bold">About This Workspace</h3>
//                 <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
//                   {studio.description || "Massive creative soundstage with professional lighting grid, acoustic treatment, and premium facilities."}
//                 </p>
//               </div>

//               {/* Amenities */}
//               <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
//                 <h3 className="text-lg font-bold">Equipment & Amenities</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium text-slate-600 dark:text-slate-300">
//                   <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cyclorama Wall
//                   </div>
//                   <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Soundproof Vocal Booth
//                   </div>
//                   <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" /> High-Speed Gigabit WiFi
//                   </div>
//                   <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 4K DMX Lighting Grid
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Booking Card */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-lg space-y-6">
//               <div className="flex items-baseline justify-between">
//                 <div>
//                   <span className="text-2xl sm:text-3xl font-black text-amber-500">${hourlyRate}</span>
//                   <span className="text-xs text-slate-400 font-medium"> / hour</span>
//                 </div>
//                 <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full">
//                   <span>★ {studio.rating ?? "5.0"}</span>
//                 </div>
//               </div>

//               <div className="space-y-3 text-xs pt-4 border-t border-slate-100 dark:border-slate-800">
//                 <div className="flex justify-between text-slate-500">
//                   <span>Security Deposit</span>
//                   <span className="font-bold text-slate-900 dark:text-white">${securityDeposit}</span>
//                 </div>
//                 <div className="flex justify-between text-slate-500">
//                   <span>Cancellation Policy</span>
//                   <span className="font-bold text-emerald-600">Free before shoot</span>
//                 </div>
//                 <div className="flex justify-between text-slate-500">
//                   <span>Availability</span>
//                   <span className="font-bold text-slate-900 dark:text-white">Instant Request Slots</span>
//                 </div>
//               </div>

//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm shadow-md transition text-center cursor-pointer"
//               >
//                 Book Workspace Now
//               </button>

//               <p className="text-[11px] text-center text-slate-400">
//                 You won&apos;t be charged immediately. This reservation will enter pending status for host approval.
//               </p>
//             </div>
//           </div>

//         </div>

//       </div>

//       {/* Booking Modal (Popup) */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
            
//             {/* Close Button */}
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <div>
//               <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500">Reserve Creative Slot</span>
//               <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">{studio.title}</h2>
//               <p className="text-xs text-slate-400 mt-0.5">Rate: ${hourlyRate}/hr • Deposit: ${securityDeposit}</p>
//             </div>

//             <div className="space-y-4 text-xs">
//               <div>
//                 <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Shoot Date</label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
//                   <input
//                     type="date"
//                     required
//                     value={shootDate}
//                     onChange={(e) => setShootDate(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-medium"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Start Time</label>
//                   <input
//                     type="text"
//                     required
//                     placeholder="e.g. 10:00 AM"
//                     value={startTime}
//                     onChange={(e) => setStartTime(e.target.value)}
//                     className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-medium"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">End Time</label>
//                   <input
//                     type="text"
//                     required
//                     placeholder="e.g. 02:00 PM"
//                     value={endTime}
//                     onChange={(e) => setEndTime(e.target.value)}
//                     className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-medium"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Expected Crew / Talent Count (Max 30)</label>
//                 <input
//                   type="number"
//                   required
//                   placeholder="e.g. 4"
//                   value={crewCount}
//                   onChange={(e) => setCrewCount(e.target.value ? Number(e.target.value) : "")}
//                   className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-medium"
//                 />
//               </div>

//               <div>
//                 <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Production Requirements / Gear Notes (Optional)</label>
//                 <textarea
//                   rows={2}
//                   placeholder="e.g. Bringing high-output lighting, smoke machine, heavy rigging..."
//                   value={gearNotes}
//                   onChange={(e) => setGearNotes(e.target.value)}
//                   className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-medium resize-none"
//                 />
//               </div>

//               <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-slate-500">
//                 <div className="flex justify-between">
//                   <span>${hourlyRate} × {totalHours} sheet hours</span>
//                   <span className="font-bold text-slate-900 dark:text-white">${hourlyRate * totalHours}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Refundable Security Deposit</span>
//                   <span className="font-bold text-slate-900 dark:text-white">${securityDeposit}</span>
//                 </div>
//                 <div className="flex justify-between text-sm font-black text-amber-600 pt-2 border-t border-slate-100 dark:border-slate-800">
//                   <span>Total Estimated Cost</span>
//                   <span>${estimatedTotal}</span>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={handleConfirmBooking}
//               disabled={submitting}
//               className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-lg transition text-center cursor-pointer disabled:opacity-50"
//             >
//               {submitting ? "Sending Request..." : "⚡ Confirm & Send Booking Request"}
//             </button>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }



















// import { notFound } from "next/navigation";
// import Image from "next/image";
// import { MapPin, Users, Shield, ArrowLeft, CheckCircle2, Calendar } from "lucide-react";
// import Link from "next/link";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// interface StudioDetailsPageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function StudioDetailsPage({ params }: StudioDetailsPageProps) {
//   const { id } = await params;

//   // Server-side JWT Token get kora (jemon apnar 2nd picture-e chilo)
//   const jwtToken = await auth.api.getToken({
//     headers: await headers(),
//   });
//   const token = jwtToken?.token ;
//   // console.log("Server Token:", jwtToken?.token);

//   // Backend theke data fetch kora with Authorization header
//   const res = await fetch(`http://localhost:8000/studios/${id}`, {
//     headers: {
//       authorization: `Bearer ${token}` 
//     },
//     cache: "no-store",
//   });

//   if (!res.ok) notFound();
//   const studio = await res.json();

//   const hourlyRate = studio?.hourlyRate || 0;
//   const securityDeposit = studio?.securityDeposit || 0;

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
//       <div className="max-w-6xl mx-auto space-y-8">
        
//         {/* Back Link */}
//         <Link href="/studios" className="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:underline">
//           <ArrowLeft className="w-4 h-4" />
//           <span>Back to Explore</span>
//         </Link>

//         {/* Main Grid Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
//               <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
//                 {studio.category}
//               </span>

//               <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{studio.title}</h1>

//               <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-sm">
//                 <MapPin className="w-4 h-4 text-amber-500" />
//                 {studio.location}
//               </p>

//               <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-800">
//                 <Image src={studio.image} alt={studio.title} fill className="object-cover" />
//               </div>

//               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
//                 <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
//                   <span className="text-xs text-slate-400 font-bold uppercase block">Max Capacity</span>
//                   <span className="text-lg font-extrabold mt-1 flex items-center gap-1.5">
//                     <Users className="w-4 h-4 text-amber-500" /> {studio.maxCapacity ?? "30"} Persons
//                   </span>
//                 </div>

//                 <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
//                   <span className="text-xs text-slate-400 font-bold uppercase block">Security Deposit</span>
//                   <span className="text-lg font-extrabold mt-1 flex items-center gap-1.5">
//                     <Shield className="w-4 h-4 text-amber-500" /> ${securityDeposit}
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
//                 <h3 className="text-xl font-bold">About This Workspace</h3>
//                 <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
//                   {studio.description || "Massive creative soundstage with professional lighting grid, acoustic treatment, and premium facilities."}
//                 </p>
//               </div>

//               {/* Amenities */}
//               <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
//                 <h3 className="text-lg font-bold">Equipment & Amenities</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium text-slate-600 dark:text-slate-300">
//                   <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cyclorama Wall
//                   </div>
//                   <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Soundproof Vocal Booth
//                   </div>
//                   <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" /> High-Speed Gigabit WiFi
//                   </div>
//                   <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 4K DMX Lighting Grid
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Booking Card */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-lg space-y-6">
//               <div className="flex items-baseline justify-between">
//                 <div>
//                   <span className="text-2xl sm:text-3xl font-black text-amber-500">${hourlyRate}</span>
//                   <span className="text-xs text-slate-400 font-medium"> / hour</span>
//                 </div>
//                 <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full">
//                   <span>★ {studio.rating ?? "5.0"}</span>
//                 </div>
//               </div>

//               <div className="space-y-3 text-xs pt-4 border-t border-slate-100 dark:border-slate-800">
//                 <div className="flex justify-between text-slate-500">
//                   <span>Security Deposit</span>
//                   <span className="font-bold text-slate-900 dark:text-white">${securityDeposit}</span>
//                 </div>
//                 <div className="flex justify-between text-slate-500">
//                   <span>Cancellation Policy</span>
//                   <span className="font-bold text-emerald-600">Free before shoot</span>
//                 </div>
//                 <div className="flex justify-between text-slate-500">
//                   <span>Availability</span>
//                   <span className="font-bold text-slate-900 dark:text-white">Instant Request Slots</span>
//                 </div>
//               </div>

//               <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 font-medium text-center">
//                 Token verified on server-side successfully! ⚡
//               </div>

//             </div>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }








import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Users, Shield, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BookingModal from "@/components/BookingModal"; // Path onujayi import korun
import {  gettokenfromserver } from "@/lib/gettokenfromserver";

interface StudioDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function StudioDetailsPage({ params }: StudioDetailsPageProps) {
  const { id } = await params;

  // Server-side JWT Token get kora (Terminal-e log dekhabe)
 const token = await gettokenfromserver();

  // Backend theke data fetch kora with Authorization header
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
        
        {/* Back Link */}
        <Link href="/studios" className="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </Link>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
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

              {/* Amenities */}
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

          {/* Right Column: Booking Card */}
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

              {/* Client Component Booking Button & Modal */}
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