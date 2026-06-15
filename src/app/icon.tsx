import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M 16 4 Q 16 16 28 16 Q 16 16 16 28 Q 16 16 4 16 Q 16 16 16 4 Z"
            fill="#c29830"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}