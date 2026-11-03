import Link from "next/link";


export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-400/20">
                S
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">StudioSpace</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The ultimate creative marketplace for booking professional production stages, photo studios, podcast rooms, and music suites with frictionless booking.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-bold text-amber-400">
              <span>#1 Creative Production Marketplace</span>
            </div>
          </div>

          
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/" className="hover:text-amber-400 transition">Home</Link></li>
              <li><Link href="/studios" className="hover:text-amber-400 transition">Explore Studios</Link></li>
              <li><Link href="/how-it-works" className="hover:text-amber-400 transition">How It Works</Link></li>
              <li><Link href="/my-listings" className="hover:text-amber-400 transition">Creator Dashboard</Link></li>
            </ul>
          </div>

          
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Workspaces</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/studios?category=Photo+Studios" className="hover:text-amber-400 transition">Photo Studios</Link></li>
              <li><Link href="/studios?category=Sound+Stages" className="hover:text-amber-400 transition">Sound Stages</Link></li>
              <li><Link href="/studios?category=Podcast+Rooms" className="hover:text-amber-400 transition">Podcast Rooms</Link></li>
              <li><Link href="/studios?category=Music+Suites" className="hover:text-amber-400 transition">Music Suites</Link></li>
            </ul>
          </div>

          
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-xs text-slate-400">Get notified about new premier studios and special creator discounts.</p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-amber-400 outline-none"
              />
              <button className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs transition shadow-md">
                Subscribe
              </button>
            </div>
          </div>

        </div>

       
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} StudioSpace Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-amber-400 transition">Support</a>
          </div>
        </div>

      </div>
    </footer>
  );
}