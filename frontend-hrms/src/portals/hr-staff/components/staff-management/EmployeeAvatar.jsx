import React, { useMemo, useState } from 'react';
import { User } from 'lucide-react';

const avatarColors = [
  { background: '#FDE68A', color: '#92400E' },
  { background: '#BFDBFE', color: '#1D4ED8' },
  { background: '#C7D2FE', color: '#5B21B6' },
  { background: '#BBF7D0', color: '#166534' },
  { background: '#FBCFE8', color: '#9D174D' },
  { background: '#FED7AA', color: '#C2410C' },
];

function getAvatarPalette(seedText = '') {
  const hash = Array.from(seedText).reduce(
    (total, char) => total + char.charCodeAt(0),
    0
  );

  return avatarColors[hash % avatarColors.length];
}

export default function EmployeeAvatar({ src, alt, name, size = 32, className = '' }) {
  const [imageFailed, setImageFailed] = useState(false);
  const palette = useMemo(() => getAvatarPalette(name || alt || ''), [name, alt]);

  if (src && !imageFailed) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <div
      className={className}
      aria-label={alt}
      title={name || alt}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: palette.background,
        color: palette.color,
        flexShrink: 0,
      }}
    >
      <User size={Math.round(size * 0.58)} strokeWidth={2.2} />
    </div>
  );
}