export default function Loading() {
  return (
    <div className="prose max-w-none">
      <div className="h-9 w-64 bg-gray-200 rounded animate-pulse" />
      <div className="mt-2 h-4 w-32 bg-gray-100 rounded animate-pulse" />
      <div className="mt-6 space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-4 w-full bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}


