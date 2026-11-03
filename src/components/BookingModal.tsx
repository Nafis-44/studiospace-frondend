"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, X } from "lucide-react";

interface BookingModalProps {
  studioId: string;
  studioTitle: string;
  studioLocation: string;
  studioImage: string;
  hourlyRate: number;
  securityDeposit: number;
  token?: string;
}

export default function BookingModal({
  studioId,
  studioTitle,
  studioLocation,
  studioImage,
  hourlyRate,
  securityDeposit,
}: BookingModalProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shootDate, setShootDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [crewCount, setCrewCount] = useState<number | "">("");
  const [gearNotes, setGearNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const totalHours = 4; // demo calculation
  const estimatedTotal = hourlyRate * totalHours + securityDeposit;

  const handleConfirmBooking = async () => {
    setSubmitting(true);
    try {
      const bookingData = {
        studioId,
        studioTitle,
        studioLocation,
        studioImage,
        date: shootDate, // Backend duplicate check er jonno
        shootDate,
        startTime,
        endTime,
        crewCount,
        gearNotes,
        totalAmount: estimatedTotal,
        status: "Pending",
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const resData = await response.json();

      if (response.ok) {
        setIsModalOpen(false);
        router.push("/my-bookings");
      } else {
        alert(resData.error || "Failed to confirm booking!");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm shadow-md transition text-center cursor-pointer"
      >
        Book Workspace Now
      </button>

      {/* Booking Modal (Popup) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500">Reserve Creative Slot</span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">{studioTitle}</h2>
              <p className="text-xs text-slate-400 mt-0.5">Rate: ${hourlyRate}/hr • Deposit: ${securityDeposit}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Shoot Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={shootDate}
                    onChange={(e) => setShootDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Start Time</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10:00 AM"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">End Time</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 02:00 PM"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Expected Crew / Talent Count (Max 30)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 4"
                  value={crewCount}
                  onChange={(e) => setCrewCount(e.target.value ? Number(e.target.value) : "")}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Production Requirements / Gear Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Bringing high-output lighting, smoke machine, heavy rigging..."
                  value={gearNotes}
                  onChange={(e) => setGearNotes(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-medium resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-slate-500">
                <div className="flex justify-between">
                  <span>${hourlyRate} × {totalHours} sheet hours</span>
                  <span className="font-bold text-slate-900 dark:text-white">${hourlyRate * totalHours}</span>
                </div>
                <div className="flex justify-between">
                  <span>Refundable Security Deposit</span>
                  <span className="font-bold text-slate-900 dark:text-white">${securityDeposit}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-amber-600 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Total Estimated Cost</span>
                  <span>${estimatedTotal}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirmBooking}
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-lg transition text-center cursor-pointer disabled:opacity-50"
            >
              {submitting ? "Sending Request..." : "⚡ Confirm & Send Booking Request"}
            </button>

          </div>
        </div>
      )}
    </>
  );
}