export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse p-4 md:p-0">
      <div className="space-y-2">
        <div className="h-8 w-64 bg-surface rounded-xl border border-border" />
        <div className="h-4 w-96 bg-surface rounded-lg opacity-50" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-surface border border-border rounded-2xl" />
        ))}
      </div>

      <div className="h-64 bg-surface border border-border rounded-2xl" />
    </div>
  );
}
