'use client';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', glow = false, hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        glass rounded-2xl p-6
        ${glow ? 'glow-purple' : ''}
        ${hover ? 'glass-hover cursor-pointer transition-all duration-200 hover:-translate-y-0.5' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', icon }: { 
  children: React.ReactNode; 
  className?: string; 
  icon?: React.ReactNode;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {icon && (
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-white">{children}</h3>
    </div>
  );
}
