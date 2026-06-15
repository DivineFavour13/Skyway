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
        <div
          style={{
            fontSize: 20,
            color: '#c29830',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            lineHeight: 1,
          }}
        >
          ✦
        </div>
      </div>
    ),
    { ...size }
  );
}