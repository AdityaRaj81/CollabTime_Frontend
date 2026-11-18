export function ProgressSteps({ steps, currentIndex }) {
  const percent = Math.round(((currentIndex + 1) / steps.length) * 100);
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-semibold text-primary-700">
          Step {currentIndex + 1} of {steps.length}: {steps[currentIndex]}
        </span>
        <span className="text-neutral-500">{percent}% complete</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-neutral-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div
          className="h-full rounded-full bg-primary-600 transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function Spinner({ className = '' }) {
  return (
    <span
      className={`inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary-600 border-t-transparent ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
