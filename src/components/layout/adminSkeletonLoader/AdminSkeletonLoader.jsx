const Pulse = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const AdminSkeletonLoader = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ── Sidebar ── */}
      <aside className="w-[256px] bg-[#161a23] flex-shrink-0 px-4 py-5">
        <Pulse className="h-7 w-28 bg-white/10 mb-8" />

        <p className="text-[10px] font-semibold tracking-widest text-white/30 mb-3">
          MAIN
        </p>
        <div className="space-y-2 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Pulse key={i} className="h-4 w-full bg-white/10" />
          ))}
        </div>

        <p className="text-[10px] font-semibold tracking-widest text-white/30 mb-3">
          COMPLIANCE
        </p>
        <div className="space-y-2 mb-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <Pulse key={i} className="h-4 w-full bg-white/10" />
          ))}
        </div>

        <p className="text-[10px] font-semibold tracking-widest text-white/30 mb-3">
          SUPPORT
        </p>
        <div className="space-y-2">
          {Array.from({ length: 1 }).map((_, i) => (
            <Pulse key={i} className="h-4 w-full bg-white/10" />
          ))}
        </div>
      </aside>

      {/* ── Main column ── */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-[57px] bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Pulse className="h-7 w-24" />
            <Pulse className="h-4 w-10" />
          </div>
          <div className="flex items-center gap-2.5">
            <Pulse className="h-8 w-8 rounded-full" />
            <div className="space-y-1.5">
              <Pulse className="h-3 w-24" />
              <Pulse className="h-3 w-12" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <Pulse className="h-4 w-24" />
              <Pulse className="h-3 w-32" />
            </div>
            <Pulse className="h-8 w-20 rounded-md" />
          </div>

          {/* Card grid — mirrors the 4-then-3 layout from the dashboard */}
          <div className="grid grid-cols-4 gap-5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                <Pulse className="h-9 w-9 rounded-lg mb-4" />
                <Pulse className="h-3 w-20 mb-2" />
                <Pulse className="h-6 w-10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSkeletonLoader;
