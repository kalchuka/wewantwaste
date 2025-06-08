import React from 'react';
import type { LucideIcon } from 'lucide-react';

// Types for button variants
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'outline' | 'ghost';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  children,
  className = '',
  ...props
}: ButtonProps) => {
  // Size classes
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
    xl: 'px-6 py-3 text-xl',
  };

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border border-transparent shadow-sm',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-transparent',
    danger: 'bg-red-600 hover:bg-red-700 text-white border border-transparent',
    success: 'bg-green-600 hover:bg-green-700 text-white border border-transparent',
    warning: 'bg-amber-500 hover:bg-amber-600 text-white border border-transparent',
    info: 'bg-indigo-600 hover:bg-indigo-700 text-white border border-transparent',
    outline: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent',
  };

  const disabledClasses = 'opacity-60 cursor-not-allowed';

  return (
    <button
      disabled={disabled || isLoading}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled || isLoading ? disabledClasses : ''}
        ${fullWidth ? 'w-full' : ''}
        rounded-lg font-medium transition-all duration-200
        flex items-center justify-center gap-2
        ${className}
      `}
      {...props}
    >
      
      {Icon && iconPosition === 'left' && !isLoading && <Icon className="w-5 h-5" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </button>
  );
};





