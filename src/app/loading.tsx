export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center font-sans">
      <div className="space-y-4 text-center">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-bold uppercase tracking-widest text-amber-500 animate-pulse">
          Loading StudioSpace...
        </p>
      </div>
    </div>
  );
}