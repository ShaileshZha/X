export default function Loading() {
  return (
    <div className="grid gap-6">
      <div className="h-8 w-28 rounded bg-gray-200 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border p-4">
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            <div className="mt-2 h-3 w-full bg-gray-100 rounded animate-pulse" />
            <div className="mt-2 h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}


