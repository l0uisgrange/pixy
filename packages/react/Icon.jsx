import React from 'react';

const Icon = ({ children, path, className = '', ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`${className}`}
            {...props}
        >
            {content}
        </svg>
    );
};

export default Icon;