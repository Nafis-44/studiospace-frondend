// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { MapPin, Calendar, Clock, ArrowRight, Receipt, XCircle } from "lucide-react";

// export default function MyBookingsPage() {
//   const [bookings, setBookings] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBookings = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/bookings");
//       const data = await res.json();
//       setBookings(data);
//     } catch (err) {
//       console.error("Failed to load bookings", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const handleCancelBooking = async (bookingId: string) => {
//     try {
//       const res = await fetch(`http://localhost:8000/bookings/${bookingId}/cancel`, {
//         method: "PATCH",
//       });
//       if (res.ok) {
//         fetchBookings();
//       }
//     } catch (err) {
//       console.error("Failed to cancel booking", err);
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-20 text-slate-400 font-medium">Loading your bookings...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
//       <div className="max-w-5xl mx-auto space-y-8">
        
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
//           <div>
//             <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">Production Schedule</span>
//             <h1 className="text-3xl font-extrabold tracking-tight mt-1">My Studio Bookings</h1>
//             <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Track reservation statuses, cancellation requests, and shoot times.</p>
//           </div>

//           <Link
//             href="/studios"
//             className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-md transition whitespace-nowrap"
//           >
//             <span>Explore More Studios</span>
//             <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>

//         {/* Bookings List */}
//         <div className="space-y-4">
//           {bookings.length === 0 ? (
//             <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500">
//               No bookings found yet.
//             </div>
//           ) : (
//             bookings.map((booking) => (
//               <div
//                 key={booking._id}
//                 className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="relative h-20 w-28 rounded-xl overflow-hidden bg-slate-800 ">
//                     <Image src={booking.studioImage || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"} alt={booking.studioTitle} fill className="object-cover" />
//                   </div>

//                   <div className="space-y-1">
//                     <div className="flex items-center gap-2">
//                       <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
//                         booking.status === "Cancelled" 
//                           ? "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400" 
//                           : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
//                       }`}>
//                         {booking.status}
//                       </span>
//                       <span className="text-[10px] text-slate-400 font-medium">ID: #{booking._id?.slice(-6)}</span>
//                     </div>

//                     <h3 className="font-extrabold text-base line-clamp-1">{booking.studioTitle}</h3>

//                     <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
//                       <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-500" /> {booking.shootDate}</span>
//                       <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> {booking.startTime} - {booking.endTime}</span>
//                     </div>

//                     <p className="text-xs text-slate-400 flex items-center gap-1">
//                       <MapPin className="w-3 h-3 text-amber-500" /> {booking.studioLocation}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Right Side: Total & Actions */}
//                 <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 gap-3">
//                   <div className="text-left md:text-right">
//                     <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Charged / Due</span>
//                     <span className="text-lg font-black text-slate-900 dark:text-white">${booking.totalAmount}</span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <button className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition">
//                       <Receipt className="w-3.5 h-3.5" /> Receipt
//                     </button>
//                     {booking.status !== "Cancelled" && (
//                       <button 
//                         onClick={() => handleCancelBooking(booking._id)}
//                         className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 font-bold text-xs flex items-center gap-1.5 transition"
//                       >
//                         <XCircle className="w-3.5 h-3.5" /> Cancel Booking
//                       </button>
//                     )}
//                   </div>
//                 </div>

//               </div>
//             ))
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }
















"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, Clock, ArrowRight, Receipt, XCircle } from "lucide-react";

interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioLocation: string;
  studioImage: string;
  shootDate: string;
  startTime: string;
  endTime: string;
  crewCount: number;
  gearNotes?: string;
  totalAmount: number;
  status: string;
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`);
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Failed to load bookings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}/cancel`, {
        method: "PATCH",
      });
      if (res.ok) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`);
        const data = await response.json();
        setBookings(data);
      }
    } catch (err) {
      console.error("Failed to cancel booking", err);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-slate-400 font-medium">Loading your bookings...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">Production Schedule</span>
            <h1 className="text-3xl font-extrabold tracking-tight mt-1">My Studio Bookings</h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Track reservation statuses, cancellation requests, and shoot times.</p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-md transition whitespace-nowrap"
          >
            <span>Explore More Studios</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500">
              No bookings found yet.
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-28 rounded-xl overflow-hidden bg-slate-800 ">
                    <Image src={booking.studioImage || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"} alt={booking.studioTitle} fill className="object-cover" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        booking.status === "Cancelled" 
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400" 
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                      }`}>
                        {booking.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">ID: #{booking._id?.slice(-6)}</span>
                    </div>

                    <h3 className="font-extrabold text-base line-clamp-1">{booking.studioTitle}</h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-500" /> {booking.shootDate}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> {booking.startTime} - {booking.endTime}</span>
                    </div>

                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500" /> {booking.studioLocation}
                    </p>
                  </div>
                </div>

                {/* Right Side: Total & Actions */}
                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 gap-3">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Charged / Due</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">${booking.totalAmount}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition">
                      <Receipt className="w-3.5 h-3.5" /> Receipt
                    </button>
                    {booking.status !== "Cancelled" && (
                      <button 
                        onClick={() => handleCancelBooking(booking._id)}
                        className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 font-bold text-xs flex items-center gap-1.5 transition"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Cancel Booking
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}