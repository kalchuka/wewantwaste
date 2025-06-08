import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletalLoaderProps {
  count?: number;
}

export default function SkeletalLoader({ count = 6 }: SkeletalLoaderProps) {
  return (
    <div className="w-full py-10 px-4">
      <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {Array(count).fill(0).map((_, index) => (
        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          {/* Image skeleton */}
          <div className="w-full h-64 bg-gray-200">
            <Skeleton height="100%" className="rounded-t-2xl" />
          </div>
          <div className="p-6">
            <div className="mb-3">
              <Skeleton width="60%" height={24} />
            </div>
            <div className="mb-4">
              <Skeleton width="40%" height={28} />
            </div>
            <div className="space-y-2 mb-4">
              <Skeleton count={3} className="py-1" />
            </div>
            <div className="flex gap-2 mb-4">
              <Skeleton width={80} height={24} className="rounded-full" />
              <Skeleton width={100} height={24} className="rounded-full" />
            </div>
            <div className="mt-4">
              <Skeleton height={48} className="rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
}