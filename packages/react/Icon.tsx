import React from 'react';

export default function Icon({ children, ...props }: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
        >
            {children}
        </svg>
    );
}