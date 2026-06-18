'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plane, Building2, Car, Compass } from 'lucide-react';
import { Link } from '@/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatDateTime, formatDuration } from '@/lib/utils';
import { useFormattedPrice } from '@/hooks/useFormattedPrice';
import type { DuffelOffer } from '@/types/duffel';
import type { Hotel, RoomType } from '@/lib/mockHotels';
import type { Car as CarType } from '@/lib/mockCars';
import type { Activity } from '@/lib/mockActivities';

type FlightBooking = {
  type: 'flight' | undefined;
  ref: string;
  offer: DuffelOffer;
  passenger: { firstName: string; lastName: string; email: string; passport: string };
  passengers?: { firstName: string; lastName: string; email: string; passport: string }[];
  seatIds: string[];
  bookedAt: string;
};

type HotelBooking = {
  type: 'hotel';
  ref: string;
  hotel: Hotel;
  room: RoomType;
  checkin: string;
  checkout: string;
  nights: number;
  guests: number;
  guestDetails: { firstName: string; lastName: string; email: string };
  totalPrice: string;
  currency: string;
  bookedAt: string;
};

type CarBooking = {
  type: 'car';
  ref: string;
  car: CarType;
  pickup: string;
  pickupDate: string;
  returnDate: string;
  days: number;
  driverDetails: { firstName: string; lastName: string; email: string };
  totalPrice: string;
  currency: string;
  bookedAt: string;
};

type ActivityBooking = {
  type: 'activity';
  ref: string;
  activity: Activity;
  date: string;
  people: number;
  guestDetails: { firstName: string; lastName: string; email: string };
  totalPrice: string;
  currency: string;
  bookedAt: string;
};

type SavedBooking = FlightBooking | HotelBooking | CarBooking | ActivityBooking;

function FlightBookingCard({ booking, onCancel }: { booking: FlightBooking; onCancel: (ref: string) => void }) {
  const t = useTranslations('bookings');
  const formattedPrice = useFormattedPrice(booking.offer.total_amount, booking.offer.total_currency);
  const [confirming, setConfirming] = useState(false);

  const slice = booking.offer.slices[0];
  const firstSeg = slice?.segments[0];
  const lastSeg = slice?.segments[slice.segments.length - 1];
  if (!slice || !firstSeg || !lastSeg) return null;

  const departure = formatDateTime(firstSeg.departing_at);
  const arrival = formatDateTime(lastSeg.arriving_at);
  const stops = slice.segments.length - 1;

  return (
    <BookingShell ref_={booking.ref} bookedAt={booking.bookedAt} Icon={Plane} label="Flight"
      confirming={confirming} setConfirming={setConfirming} onCancel={() => onCancel(booking.ref)} t={t}>
      <div className="flex items-center gap-4">
        <div>
          <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">{departure.time}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{firstSeg.origin.iata_code} · {departure.date}</p>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1">
          <p className="text-xs text-[var(--color-text-muted)]">{formatDuration(slice.duration)}</p>
          <div className="w-full flex items-center gap-1">
            <div className="h-px flex-1 bg-[var(--color-border)]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-border)]" />
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            {stops === 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">{arrival.time}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{lastSeg.destination.iata_code} · {arrival.date}</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
        <p className="text-xs text-[var(--color-text-muted)]">
          {booking.passengers && booking.passengers.length > 0
            ? `${booking.passengers[0].firstName} ${booking.passengers[0].lastName} ${
                booking.passengers.length > 1
                  ? booking.passengers.length - 1 === 1
                    ? t('traveler', { count: booking.passengers.length - 1 })
                    : t('travelerPlural', { count: booking.passengers.length - 1 })
                  : ''
              }`
            : `${booking.passenger.firstName} ${booking.passenger.lastName}`}
        </p>
        <p className="text-sm font-bold text-[var(--color-text-primary)]">{formattedPrice}</p>
      </div>
    </BookingShell>
  );
}

function HotelBookingCard({ booking, onCancel }: { booking: HotelBooking; onCancel: (ref: string) => void }) {
  const t = useTranslations('bookings');
  const formattedPrice = useFormattedPrice(booking.totalPrice, booking.currency);
  const [confirming, setConfirming] = useState(false);

  return (
    <BookingShell ref_={booking.ref} bookedAt={booking.bookedAt} Icon={Building2} label="Hotel"
      confirming={confirming} setConfirming={setConfirming} onCancel={() => onCancel(booking.ref)} t={t}>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg shrink-0"
          style={{ background: `linear-gradient(135deg, ${booking.hotel.colorFrom}, ${booking.hotel.colorTo})` }} />
        <div className="flex-1">
          <p className="text-sm font-bold text-[var(--color-text-primary)]">{booking.hotel.name}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{booking.room.name} · {booking.checkin} → {booking.checkout}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{booking.nights} nights · {booking.guests} guests</p>
        </div>
        <p className="text-sm font-bold text-[var(--color-text-primary)]">{formattedPrice}</p>
      </div>
    </BookingShell>
  );
}

function CarBookingCard({ booking, onCancel }: { booking: CarBooking; onCancel: (ref: string) => void }) {
  const t = useTranslations('bookings');
  const formattedPrice = useFormattedPrice(booking.totalPrice, booking.currency);
  const [confirming, setConfirming] = useState(false);

  return (
    <BookingShell ref_={booking.ref} bookedAt={booking.bookedAt} Icon={Car} label="Car"
      confirming={confirming} setConfirming={setConfirming} onCancel={() => onCancel(booking.ref)} t={t}>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg shrink-0 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${booking.car.colorFrom}, ${booking.car.colorTo})` }}>
          <Car size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-[var(--color-text-primary)]">{booking.car.year} {booking.car.make} {booking.car.model}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{booking.pickup} · {booking.pickupDate} → {booking.returnDate}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{booking.days} days · {booking.car.provider}</p>
        </div>
        <p className="text-sm font-bold text-[var(--color-text-primary)]">{formattedPrice}</p>
      </div>
    </BookingShell>
  );
}

function ActivityBookingCard({ booking, onCancel }: { booking: ActivityBooking; onCancel: (ref: string) => void }) {
  const t = useTranslations('bookings');
  const formattedPrice = useFormattedPrice(booking.totalPrice, booking.currency);
  const [confirming, setConfirming] = useState(false);

  return (
    <BookingShell ref_={booking.ref} bookedAt={booking.bookedAt} Icon={Compass} label="Activity"
      confirming={confirming} setConfirming={setConfirming} onCancel={() => onCancel(booking.ref)} t={t}>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg shrink-0 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${booking.activity.colorFrom}, ${booking.activity.colorTo})` }}>
          <Compass size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-[var(--color-text-primary)]">{booking.activity.title}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{booking.activity.city} · {booking.date}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{booking.people} people · {booking.activity.duration}</p>
        </div>
        <p className="text-sm font-bold text-[var(--color-text-primary)]">{formattedPrice}</p>
      </div>
    </BookingShell>
  );
}

function BookingShell({
  ref_, bookedAt, Icon, label, confirming, setConfirming, onCancel, t, children,
}: {
  ref_: string;
  bookedAt: string;
  Icon: React.ElementType;
  label: string;
  confirming: boolean;
  setConfirming: (v: boolean) => void;
  onCancel: () => void;
  t: ReturnType<typeof useTranslations>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[var(--color-surface-raised)] flex items-center justify-center shrink-0">
            <Icon size={16} className="text-[var(--color-accent)]" />
          </div>
          <div>
            <p className="font-mono text-sm font-bold text-[var(--color-accent)]">{ref_}</p>
            <p className="text-xs text-[var(--color-text-muted)]">
              {label} · {t('booked')} {new Date(bookedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--color-success)] text-[var(--color-bg)]">
          {t('confirmed')}
        </span>
      </div>

      {children}

      {!confirming ? (
        <button type="button" onClick={() => setConfirming(true)}
          className="w-full py-2 rounded-xl border border-[var(--color-error)] text-xs font-semibold text-[var(--color-error)] hover:bg-[var(--color-error)] hover:text-white transition-colors">
          {t('cancel')}
        </button>
      ) : (
        <div className="rounded-xl border border-[var(--color-error)] p-4 space-y-3">
          <p className="text-sm text-[var(--color-text-primary)] font-medium">{t('cancelTitle')}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{t('cancelNote')}</p>
          <div className="flex gap-3">
            <button type="button" onClick={() => setConfirming(false)}
              className="flex-1 py-2 rounded-xl border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              {t('keepBooking')}
            </button>
            <button type="button" onClick={onCancel}
              className="flex-1 py-2 rounded-xl bg-[var(--color-error)] text-xs font-semibold text-white hover:opacity-90 transition-opacity">
              {t('confirmCancel')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingsPage() {
  const t = useTranslations('bookings');
  const [bookings, setBookings] = useState<SavedBooking[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('nextrip-bookings') ?? '[]') as SavedBooking[];
    setBookings(saved.reverse());
  }, []);

  function handleCancel(ref: string) {
    const updated = bookings.filter((b) => b.ref !== ref);
    localStorage.setItem('nextrip-bookings', JSON.stringify(updated));
    setBookings(updated);
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
          {t('title')}
        </h1>
        {bookings.length === 0 ? (
          <EmptyState type="bookings" message={t('empty')}
            action={<Link href="/" className="text-sm text-[var(--color-accent)] hover:underline">{t('searchLink')}</Link>} />
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              if (booking.type === 'hotel') return <HotelBookingCard key={booking.ref} booking={booking} onCancel={handleCancel} />;
              if (booking.type === 'car') return <CarBookingCard key={booking.ref} booking={booking} onCancel={handleCancel} />;
              if (booking.type === 'activity') return <ActivityBookingCard key={booking.ref} booking={booking} onCancel={handleCancel} />;
              return <FlightBookingCard key={booking.ref} booking={booking as FlightBooking} onCancel={handleCancel} />;
            })}
          </div>
        )}
      </main>
    </div>
  );
}