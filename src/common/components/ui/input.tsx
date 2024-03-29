import * as React from 'react';

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  test?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'search';
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`w-full rounded-md border border-gray-200 bg-gray-100 p-4 text-gray-600 outline-none ${className}`}
        ref={ref}
        {...props}
      />
    );
  },
);

export default Input;
