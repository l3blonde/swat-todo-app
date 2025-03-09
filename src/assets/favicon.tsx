// src/assets/favicon.tsx
import React from 'react';

interface FaviconProps {
    color?: string;
    size?: number;
}

const Favicon: React.FC<FaviconProps> = ({ color = '#1565c0', size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="6" fill={color} />
        <path d="M8 16L14 22L24 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default Favicon;