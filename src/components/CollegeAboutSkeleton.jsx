import Skeleton from './Skeleton';

function CollegeAboutSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-6">
        <Skeleton width="200px" height="20px" />
      </div>

      {/* Hero/Banner skeleton */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8">
        <Skeleton width="100%" height="384px" className="rounded-none" />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
          <Skeleton width="300px" height="32px" className="bg-gray-400" />
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/70 rounded-lg shadow p-4 text-center">
            <Skeleton width="60px" height="32px" className="mx-auto mb-2" />
            <Skeleton width="80px" height="16px" className="mx-auto" />
          </div>
        ))}
      </div>

      {/* Content sections skeleton */}
      {[...Array(3)].map((_, i) => (
        <section key={i} className="mb-8">
          <Skeleton width="150px" height="28px" className="mb-4" />
          <div className="space-y-2">
            <Skeleton width="100%" height="20px" />
            <Skeleton width="95%" height="20px" />
            <Skeleton width="88%" height="20px" />
          </div>
        </section>
      ))}

      {/* Leadership skeleton */}
      <section className="mb-8">
        <Skeleton width="150px" height="28px" className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/70 rounded-lg shadow p-4 flex gap-4 items-center">
              <Skeleton width="80px" height="80px" className="rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton width="120px" height="20px" />
                <Skeleton width="100px" height="16px" />
                <Skeleton width="80px" height="14px" />
                <Skeleton width="140px" height="14px" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA buttons skeleton */}
      <div className="flex flex-wrap gap-4 justify-center mt-8">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} width="120px" height="40px" className="rounded" />
        ))}
      </div>
    </div>
  );
}

export default CollegeAboutSkeleton;
