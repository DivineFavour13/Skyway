import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="110"
          height="110"
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