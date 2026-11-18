export default function Input({ id, label, error, hint, required = false, className = '', ...props }) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint && !error ? `${id}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-center gap-1 text-sm font-medium text-neutral-800">
        {label}
        {required ? (
          <span className="text-error-600" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="text-xs font-normal text-neutral-500">(optional)</span>
        )}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId || hintId}
        className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 ${
          error ? 'border-error-500' : 'border-neutral-300 hover:border-neutral-400'
        }`}
        {...props}
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-error-600">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-2 text-sm text-neutral-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
