import React from 'react';

const Icon = ({ path, className = '', ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={color}
            className={`${className}`}
            {...props}
        >
            <path d={path} />
        </svg>
    );
};

export default Icon;