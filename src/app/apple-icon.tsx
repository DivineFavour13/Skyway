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
        <div
          style={{
            fontSize: 110,
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