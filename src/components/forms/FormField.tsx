import React from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

export function FormField({
  id,
  label,
  type = 'text',
  error,
  className = '',
  required,
  value,
  onChange,
  ...props
}: FormFieldProps) {
  return (
    <div>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-purple-200"
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-1 block w-full rounded-md bg-purple-800/50 border border-purple-600 text-white px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
          error ? 'border-red-500' : ''
        } ${className}`}
        required={required}
        {...props}
      />
      {error && (
        <p 
          id={`${id}-error`} 
          className="mt-1 text-sm text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}