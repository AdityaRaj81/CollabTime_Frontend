export default function CheckboxField({ id, checked, onChange, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-neutral-600">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={Boolean(error)}
          className="mt-0.5 h-4 w-4 flex-none rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
        />
        <span>{children}</span>
      </label>
      {error && <p className="mt-2 text-sm text-error-600">{error}</p>}
    </div>
  );
}
