export default function AccountTypeToggle({ value, onChange }) {
  const options = [
    { value: 'creator', label: 'Creator' },
    { value: 'brand', label: 'Brand' },
  ];
  return (
    <div role="radiogroup" aria-label="Account type" className="grid grid-cols-2 gap-1 rounded-xl bg-neutral-100 p-1">
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={`h-10 rounded-lg text-sm font-semibold transition-all duration-200 ${
              isSelected ? 'bg-white text-primary-800 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
