export default function StudentDetailsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-surface border border-border" />
          <div className="space-y-2">
            <div className="h-6 w-48 bg-surface rounded-lg" />
            <div className="h-4 w-24 bg-surface rounded-md" />
          </div>
        </div>
        <div className="h-12 w-48 bg-surface rounded-xl border border-border" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="h-96 bg-surface border border-border rounded-3xl" />
        <div className="lg:col-span-2 h-96 bg-surface border border-border rounded-3xl" />
      </div>
    </div>
  );
}
