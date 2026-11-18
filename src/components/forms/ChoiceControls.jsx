export function ChoiceCards({ name, options, value, onChange, columns = 'sm:grid-cols-2' }) {
  return (
    <div role="radiogroup" className={`grid grid-cols-1 gap-3 ${columns}`}>
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <label
            key={option.value}
            className={`group relative flex cursor-pointer flex-col rounded-xl border-2 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
              isSelected ? 'border-primary-600 bg-primary-50 shadow-sm' : 'border-neutral-200'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span className="flex items-center justify-between">
              <span className={`font-semibold ${isSelected ? 'text-primary-800' : 'text-neutral-900'}`}>
                {option.label}
              </span>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected ? 'border-primary-600 bg-primary-600' : 'border-neutral-300'
                }`}
                aria-hidden="true"
              >
                {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
              </span>
            </span>
            {option.description && (
              <span className="mt-1 text-sm text-neutral-600">{option.description}</span>
            )}
          </label>
        );
      })}
    </div>
  );
}

export function ChipMultiSelect({ id, label, options, values, onChange, error, hint, required = false, max }) {
  function toggle(option) {
    if (values.includes(option)) {
      onChange(values.filter((item) => item !== option));
      return;
    }
    if (max && values.length >= max) return;
    onChange([...values, option]);
  }

  return (
    <fieldset>
      <legend className="mb-2 flex items-center gap-1 text-sm font-medium text-neutral-800">
        {label}
        {required ? (
          <span className="text-error-600" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="text-xs font-normal text-neutral-500">(optional)</span>
        )}
      </legend>
      <div className="flex flex-wrap gap-2" id={id}>
        {options.map((option) => {
          const isSelected = values.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggle(option)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                isSelected
                  ? 'border-primary-600 bg-primary-600 text-white shadow-sm'
                  : 'border-neutral-300 bg-white text-neutral-700 hover:border-primary-400 hover:text-primary-700'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error ? (
        <p className="mt-2 text-sm text-error-600">{error}</p>
      ) : hint ? (
        <p className="mt-2 text-sm text-neutral-500">{hint}</p>
      ) : null}
    </fieldset>
  );
}
