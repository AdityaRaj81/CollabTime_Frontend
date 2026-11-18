const STYLES = {
  error: 'border-error-100 bg-error-50 text-error-700',
  success: 'border-success-100 bg-success-50 text-success-700',
  warning: 'border-warning-100 bg-warning-50 text-warning-700',
  info: 'border-secondary-100 bg-secondary-50 text-secondary-800',
};

export default function Alert({ tone = 'error', children, className = '' }) {
  if (!children) return null;
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`animate-fade-in rounded-lg border px-4 py-3 text-sm ${STYLES[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
