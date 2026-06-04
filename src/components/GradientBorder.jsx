const GradientBorder = ({ children, className = '' }) => (
  <div
    className={`relative p-px rounded-3xl ${className}`}
    style={{
      background: 'linear-gradient(var(--angle, 0deg), #6366f1, #a855f7, #ec4899, #6366f1)',
      animation: 'spin-border 4s linear infinite',
    }}
  >
    <div className="relative rounded-3xl h-full w-full" style={{ background: 'var(--bg)' }}>
      {children}
    </div>
    <style>{`
      @keyframes spin-border { to { --angle: 360deg; } }
      @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
    `}</style>
  </div>
);

export default GradientBorder;
