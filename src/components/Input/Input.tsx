import React from 'react';

interface InputFieldProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    autoFocus?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
    value,
    onChange,
    placeholder,
    autoFocus = false,
    required = false,
}) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoFocus={autoFocus}
            required={required}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
};
