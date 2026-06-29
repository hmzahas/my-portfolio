const GradientBorder = ({ children, className = '' }) => (
  <div
    className={`relative rounded-3xl ${className}`}
    style={{ border: '1px solid var(--border)' }}
  >
    {children}
  </div>
);

export default GradientBorder;
