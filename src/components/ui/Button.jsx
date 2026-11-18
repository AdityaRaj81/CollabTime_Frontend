const VARIANTS = {
  primary:
    'bg-primary-600 text-white shadow-sm hover:bg-primary-700 focus-visible:ring-primary-500',
  secondary:
    'bg-white text-neutral-800 border border-neutral-200 shadow-sm hover:border-primary-300 hover:text-primary-700',
  outline:
    'border border-primary-600 text-primary-700 hover:bg-primary-50',
  ghost: 'text-neutral-700 hover:bg-neutral-100',
  danger: 'bg-error-600 text-white hover:bg-error-700',
};

const SIZES = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  type = 'button',
  disabled,
  ...props
}) {
  const isDisabled = disabled || isLoading;
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
