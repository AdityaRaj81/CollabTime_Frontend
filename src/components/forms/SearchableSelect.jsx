import { useEffect, useMemo, useRef, useState } from 'react';

export default function SearchableSelect({ id, label, options, value, onChange, placeholder = 'Search...', error, required = false }) {
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setQuery(value || '');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    return options.filter((option) => option.toLowerCase().includes(term)).slice(0, 8);
  }, [options, query]);

  function choose(option) {
    onChange(option);
    setQuery(option);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
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
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-invalid={Boolean(error)}
        autoComplete="off"
        placeholder={placeholder}
        value={query}
        onFocus={() => setIsOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
          if (value) onChange('');
        }}
        className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 ${
          error ? 'border-error-500' : 'border-neutral-300 hover:border-neutral-400'
        }`}
      />
      {isOpen && matches.length > 0 && (
        <ul
          role="listbox"
          className="animate-fade-in absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-neutral-200 bg-white py-1 shadow-lg"
        >
          {matches.map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(option)}
                className={`block w-full px-3.5 py-2 text-left text-sm transition-colors hover:bg-primary-50 ${
                  option === value ? 'font-semibold text-primary-700' : 'text-neutral-700'
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p className="mt-2 text-sm text-error-600">{error}</p>
      )}
    </div>
  );
}
