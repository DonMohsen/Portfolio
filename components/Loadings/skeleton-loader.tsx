// components/SkeletonLoader.tsx
export const SkeletonLoader = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-300 h-60 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  };
  