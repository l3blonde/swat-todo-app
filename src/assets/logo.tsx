// src/assets/logo.tsx
import React from 'react';

interface LogoProps {
    color?: string;
    size?: number;
}

const Logo: React.FC<LogoProps> = ({ color = '#1565c0', size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill={color} />
        <path d="M10 20L17 27L30 14" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default Logo;