export default function StudentsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-surface rounded-xl border border-border" />
        <div className="h-10 w-32 bg-surface rounded-xl border border-border" />
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="h-12 border-b border-border bg-bg/50" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 border-b border-border last:border-0" />
        ))}
      </div>
    </div>
  );
}
