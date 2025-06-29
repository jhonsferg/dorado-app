import { forwardRef } from 'react';
import { clsx } from 'clsx';

const Badge = forwardRef(({
                            children,
                            variant = 'default',
                            size = 'md',
                            className,
                            ...props
                          }: any, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full';

  const variants: {[key: string]: string} = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  };

  const sizes: {[key: string]: string} = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };

  const classes = clsx(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <span ref={ref} className={classes} {...props}>
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;
