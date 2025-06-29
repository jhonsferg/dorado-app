import { forwardRef } from 'react';
import { clsx } from 'clsx';

const Input = forwardRef(({
                            className,
                            type = 'text',
                            error,
                            label,
                            helperText,
                            ...props
                          }: any, ref) => {
  const inputClasses = clsx(
    'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm',
    {
      'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500': error,
    },
    className
  );

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        className={inputClasses}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
