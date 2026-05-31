type Props = {
  type: 'flights' | 'bookings' | 'filtered';
  message: string;
  action?: React.ReactNode;
};

export function EmptyState({ type, message, action }: Props) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 flex flex-col items-center text-center gap-5">
      <div className="text-[var(--color-border)]">
        {type === 'flights' && <PlaneIllustration />}
        {type === 'bookings' && <BoardingPassIllustration />}
        {type === 'filtered' && <FilterIllustration />}
      </div>
      <p className="text-sm text-[var(--color-text-secondary)] max-w-xs">{message}</p>
      {action}
    </div>
  );
}

function PlaneIllustration() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="36" cy="36" r="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
      <path
        d="M16 38l6-2 4 8 4-3-3-8 5-2 8 6 5-2-8-12 3-1c3-1 6 0 7 3s0 6-3 7l-3 1-2 13-5 2-1-9-5 2-1 5-4 1 1-8-8-1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function BoardingPassIllustration() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="18" width="56" height="36" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="36" x2="22" y2="36" stroke="currentColor" strokeWidth="1.5" />
      <line x1="50" y1="36" x2="64" y2="36" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="36" cy="36" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="26" y1="26" x2="34" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="30" x2="31" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="26" x2="46" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="30" x2="43" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="42" x2="46" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="46" x2="38" y2="46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FilterIllustration() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="36" cy="36" r="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M20 24h32M26 36h20M32 48h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}