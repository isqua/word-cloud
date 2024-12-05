import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, type }) => {
    return (
        <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type={type}
        >
            {children}
        </button>
    );
};
