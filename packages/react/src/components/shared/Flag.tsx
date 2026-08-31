import React from 'react';

export interface FlagProps {
  iso2: string;
  flag?: string;
  flagUrl?: string;
  className?: string;
  alt?: string;
  mode?: 'emoji' | 'image' | 'auto';
}

/**
 * Flag component that handles both emoji and image flags.
 * 'auto' mode uses emoji by default but provides image as an alternative.
 */
export const Flag: React.FC<FlagProps> = ({ 
  iso2, 
  flag, 
  flagUrl, 
  className = '', 
  alt = '', 
  mode = 'auto' 
}) => {
  const url = flagUrl || `https://flagcdn.com/w320/${iso2.toLowerCase()}.png`;

  if (mode === 'image') {
    return (
      <img 
        src={url} 
        alt={alt || iso2} 
        className={`rck-flag-img ${className}`}
        loading="lazy"
      />
    );
  }

  // For 'emoji' or 'auto', we can use a wrapper that might handle Windows specifically
  // or just render the emoji. 
  // However, since Windows doesn't render emoji flags well, 
  // many libraries prefer using images for consistent look.
  
  return (
    <span className={`rck-flag-wrapper ${className}`} title={alt || iso2}>
      {flag || iso2}
    </span>
  );
};
