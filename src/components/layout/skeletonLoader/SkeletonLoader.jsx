/* ─── Shimmer pulse block ─────────────────────────────────────────────────── */
const Bone = ({ className = "" }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

/* ─── Hero skeleton ───────────────────────────────────────────────────────── */
const HeroSkeleton = () => (
  <div className="w-full bg-gradient-to-r from-red-200 to-red-300 animate-pulse">
    {/* navbar */}
    <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 py-4">
      <Bone className="h-7 w-24 bg-red-300 rounded" />
      <div className="hidden md:flex items-center gap-6">
        {[60, 80, 70, 90, 70].map((w, i) => (
          <Bone
            key={i}
            className="h-3 bg-red-300 rounded"
            style={{ width: w }}
          />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Bone className="h-9 w-44 bg-red-300 rounded-full" />
        <Bone className="h-8 w-8 bg-red-300 rounded-full" />
        <Bone className="h-3 w-14 bg-red-300 rounded" />
      </div>
    </div>

    {/* hero content */}
    <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-6 pb-10">
      {/* left appliance illustration */}
      <Bone className="hidden md:block w-36 h-36 lg:w-44 lg:h-44 bg-red-300 rounded-xl flex-shrink-0" />

      {/* center text + search */}
      <div className="flex-1 flex flex-col items-center gap-4 px-4">
        <Bone className="h-8 sm:h-10 w-3/4 max-w-md bg-red-300 rounded-lg" />
        <Bone className="h-4 w-1/2 max-w-xs bg-red-300 rounded" />
        {/* search bar */}
        <div className="w-full max-w-xl mt-2 flex items-center gap-2">
          <Bone className="flex-1 h-11 bg-white/40 rounded-full" />
          <Bone className="h-11 w-24 bg-red-300 rounded-full" />
        </div>
      </div>

      {/* right appliance illustration */}
      <Bone className="hidden md:block w-36 h-36 lg:w-44 lg:h-44 bg-red-300 rounded-xl flex-shrink-0" />
    </div>
  </div>
);

/* ─── Category tabs skeleton ──────────────────────────────────────────────── */
const CategoryTabsSkeleton = () => (
  <div className="w-full overflow-x-auto py-5 px-4 sm:px-8 lg:px-16 border-b border-gray-100">
    <div className="flex gap-4 min-w-max mx-auto justify-center">
      {[120, 110, 100, 140, 110, 90, 100].map((w, i) => (
        <div
          key={i}
          className={`flex flex-col items-center gap-2 flex-shrink-0 ${i === 0 ? "opacity-100" : "opacity-60"}`}
        >
          <Bone
            className={`rounded-xl ${i === 0 ? "ring-2 ring-red-300" : ""}`}
            style={{ width: w, height: w * 0.75 }}
          />
          <Bone className="h-3 rounded" style={{ width: w * 0.7 }} />
        </div>
      ))}
    </div>
  </div>
);

/* ─── Section title skeleton ──────────────────────────────────────────────── */
const SectionTitleSkeleton = () => (
  <div className="flex flex-col items-center gap-2 py-6">
    <Bone className="h-6 w-48 rounded-lg" />
  </div>
);

/* ─── Product card skeleton ───────────────────────────────────────────────── */
const ProductCardSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm animate-pulse">
    <Bone className="w-full aspect-square bg-gray-100 rounded-none" />
    <div className="p-3 flex flex-col gap-2">
      <Bone className="h-3.5 w-4/5 rounded" />
      <Bone className="h-3 w-3/5 rounded" />
    </div>
  </div>
);

/* ─── Product grid skeleton ───────────────────────────────────────────────── */
const ProductGridSkeleton = ({ count = 5 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

/* ─── Footer skeleton ─────────────────────────────────────────────────────── */
const FooterSkeleton = () => (
  <div className="w-full bg-gray-100 animate-pulse mt-10">
    {/* top footer */}
    <div className="container mx-auto px-6 sm:px-10 lg:px-16 py-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* brand col */}
      <div className="col-span-2 sm:col-span-1 flex flex-col gap-3">
        <Bone className="h-7 w-24 bg-gray-300 rounded" />
        <Bone className="h-3 w-full bg-gray-200 rounded" />
        <Bone className="h-3 w-5/6 bg-gray-200 rounded" />
        <Bone className="h-3 w-4/6 bg-gray-200 rounded" />
        <div className="flex gap-2 mt-2">
          {[0, 1, 2, 3].map((i) => (
            <Bone key={i} className="w-8 h-8 bg-gray-300 rounded-full" />
          ))}
        </div>
      </div>
      {/* link cols */}
      {["Quick Links", "Support", "Contact"].map((col) => (
        <div key={col} className="flex flex-col gap-3">
          <Bone className="h-4 w-24 bg-gray-300 rounded" />
          {[80, 70, 90, 60, 75].map((w, i) => (
            <Bone
              key={i}
              className="h-3 bg-gray-200 rounded"
              style={{ width: w }}
            />
          ))}
        </div>
      ))}
    </div>

    {/* bottom bar */}
    <div className="border-t border-gray-200 px-6 sm:px-10 lg:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
      <Bone className="h-3 w-48 bg-gray-300 rounded" />
      <div className="flex gap-4">
        <Bone className="h-3 w-20 bg-gray-200 rounded" />
        <Bone className="h-3 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════
   Main SkeletonLoader — full page
══════════════════════════════════════════════════════════════════════════ */
const SkeletonLoader = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero + Navbar */}
      <HeroSkeleton />

      {/* Category tabs */}
      <CategoryTabsSkeleton />

      {/* Product sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 pb-8">
        {/* Section 1 */}
        <SectionTitleSkeleton />
        <ProductGridSkeleton count={5} />

        {/* Section 2 */}
        <SectionTitleSkeleton />
        <ProductGridSkeleton count={5} />

        {/* Section 3 — partial row visible */}
        <SectionTitleSkeleton />
        <ProductGridSkeleton count={4} />
      </div>

      {/* Footer */}
      <FooterSkeleton />
    </div>
  );
};

export default SkeletonLoader;
