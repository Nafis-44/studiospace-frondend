// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { 
//   Moon, 
//   Sun, 
//   ChevronDown, 
//   PlusCircle, 
//   List, 
//   BookmarkCheck, 
//   LogOut 
// } from "lucide-react";
// import { authClient } from "@/lib/auth-client";

// export default function Navbar() {
// const {data: session} = authClient.useSession();
// const userdata = session?.user;
// console.log(userdata);


//   const pathname = usePathname();
//   const [theme, setTheme] = useState<"light" | "dark">("light");
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // Ekhane user er profile picture o public folder theke set kora holo (jemon public/avatar.jpg)
//   const [user, setUser] = useState<{ name: string; avatar: string } | null>({
//     name: "Alex",
//     avatar: "/logo.jpg", // Apni public folder-e avatar thakle seta dite paren
//   });

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//     document.documentElement.classList.toggle("dark");
//   };

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Explore Studios", href: "/studios" },
//     { name: "How It Works", href: "/how-it-works" },
//     { name: "About Us", href: "about-us" },
//   ];

//   return (
//     <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
//         {/* Left Side: Brand Logo from public/logo.jpg */}
//         <Link href="/" className="flex items-center gap-3 group">
//           <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-md bg-amber-400 group-hover:scale-105 transition duration-300">
//             <Image
//               src="/logo.jpg"
//               alt="StudioSpace Logo"
//               className="w-full h-full object-cover"
//               width={10}
//               height={10}
//             />
//           </div>
//           <div className="flex flex-col">
//             <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white leading-none">
//               Studio<span className="text-amber-500">Space</span>
//             </span>
//             <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">
//               Creative Marketplace
//             </span>
//           </div>
//         </Link>

//         {/* Center: Navigation Links */}
//         <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/50 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.href;
//             return (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
//                   isActive
//                     ? "bg-amber-400 text-slate-950 shadow-sm font-bold"
//                     : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Right Side: Theme Toggle & User Auth Dropdown */}
//         <div className="flex items-center gap-3">
          
//           {/* Theme Toggle Button */}
//           <button
//             onClick={toggleTheme}
//             aria-label="Toggle Theme"
//             className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
//           >
//             {theme === "light" ? (
//               <Moon className="w-4 h-4 text-slate-700" />
//             ) : (
//               <Sun className="w-4 h-4 text-amber-400" />
//             )}
//           </button>

//           {/* Authenticated State Dropdown */}
//           {user ? (
//             <div className="relative">
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="flex items-center gap-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition"
//               >
//                 <Image
//                   src={user.avatar}
//                   alt={user.name}
//                   className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-400"
//                   width={10}
//                   height={10}
//                 />
//                 <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
//                   {user.name}
//                 </span>
//                 <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
//               </button>

//               {/* Dropdown Menu Overlay */}
//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
//                   <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
//                     <p className="text-xs text-slate-400 font-medium">Logged in as</p>
//                     <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
//                   </div>

//                   <div className="py-1">
//                     <Link
//                       href="/add-studio"
//                       onClick={() => setDropdownOpen(false)}
//                       className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
//                     >
//                       <PlusCircle className="w-4 h-4 text-amber-500" />
//                       Add New Studio
//                     </Link>

//                     <Link
//                       href="/my-listings"
//                       onClick={() => setDropdownOpen(false)}
//                       className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
//                     >
//                       <List className="w-4 h-4 text-amber-500" />
//                       My Studio Listings
//                     </Link>

//                     <Link
//                       href="/my-bookings"
//                       onClick={() => setDropdownOpen(false)}
//                       className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
//                     >
//                       <BookmarkCheck className="w-4 h-4 text-amber-500" />
//                       My Bookings
//                     </Link>
//                   </div>

//                   <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
//                     <button
//                       onClick={() => {
//                         setUser(null);
//                         setDropdownOpen(false);
//                       }}
//                       className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
//                     >
//                       <LogOut className="w-4 h-4" />
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             /* Unauthenticated State Action Buttons */
//             <div className="flex items-center gap-2">
//               <Link
//                 href="/login"
//                 className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 transition"
//               >
//                 Login
//               </Link>
//               <Link
//                 href="/sign-up"
//                 className="px-4 py-2 rounded-full text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-sm transition"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }







"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  Moon, 
  Sun, 
  ChevronDown, 
  PlusCircle, 
  List, 
  BookmarkCheck, 
  LogOut 
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const userdata = session?.user;

  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about-us" },
  ];

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left Side: Brand Logo from public/logo.jpg */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-md bg-amber-400 group-hover:scale-105 transition duration-300">
            <Image
              src="/logo.jpg"
              alt="StudioSpace Logo"
              className="w-full h-full object-cover"
              width={44}
              height={44}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white leading-none">
              Studio<span className="text-amber-500">Space</span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">
              Creative Marketplace
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/50 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-amber-400 text-slate-950 shadow-sm font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Theme Toggle & User Auth Dropdown */}
        <div className="flex items-center gap-3">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-slate-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Authenticated State Dropdown */}
          {userdata ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              >
                <Image
                  src={userdata.image || "/logo.jpg"}
                  alt={userdata.name || "User Avatar"}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-400"
                  width={32}
                  height={32}
                />
                <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {userdata.name || "User"}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu Overlay */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-400 font-medium">Logged in as</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{userdata.name || userdata.email}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/add-studio"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <PlusCircle className="w-4 h-4 text-amber-500" />
                      Add New Studio
                    </Link>

                    <Link
                      href="/my-listings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <List className="w-4 h-4 text-amber-500" />
                      My Studio Listings
                    </Link>

                    <Link
                      href="/my-bookings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <BookmarkCheck className="w-4 h-4 text-amber-500" />
                      My Bookings
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Unauthenticated State Action Buttons */
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 transition"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 rounded-full text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-sm transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}