'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Building2 } from 'lucide-react';
import { useHotelStore } from '@/store/hotelStore';
import { Button } from '@/components/ui/Button';
import { useFormattedPrice } from '@/hooks/useFormattedPrice';
import { calculateNights } from '@/lib/mockHotels';

function generateRef() {
  return 'NXT-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function HotelReviewPage() {
  const { hotelId, locale } = useParams<{ hotelId: string; locale: string }>();
  const router = useRouter();
  const t = useTranslations('hotelBooking');
  const { selectedHotel, selectedRoom, checkin, checkout, guests, guestDetails, bookingReference, setBookingReference, reset } = useHotelStore();

  const [confirmed, setConfirmed] = useState(!!bookingReference);
  const [loading, setLoading] = useState(false);

  const currentRoom = selectedRoom ?? selectedHotel?.roomTypes[0];
  const nights = checkin && checkout ? calculateNights(checkin, checkout) : 1;
  const totalPrice = currentRoom ? String(currentRoom.pricePerNight * nights) : '0';
  const currency = selectedHotel?.currency ?? 'USD';
  const formattedTotal = useFormattedPrice(totalPrice, currency);

  useEffect(() => {
    if (!selectedHotel || !guestDetails) router.replace(`/${locale}`);
  }, [selectedHotel, guestDetails, router, locale]);

  if (!selectedHotel || !guestDetails || !currentRoom) return null;

  function handleConfirm() {
    setLoading(true);
    setTimeout(() => {
      const ref = generateRef();
      setBookingReference(ref);
      const bookings = JSON.parse(localStorage.getItem('nextrip-bookings') ?? '[]') as unknown[];
      bookings.push({ type: 'hotel', ref, hotel: selectedHotel, room: currentRoom, checkin, checkout, nights, guests, guestDetails, totalPrice, currency, bookedAt: new Date().toISOString() });
      localStorage.setItem('nextrip-bookings', JSON.stringify(bookings));
      setConfirmed(true);
      setLoading(false);
    }, 1200);
  }

  if (confirmed && bookingReference) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="h-20 w-20 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: 'var(--color-accent-dim)' }}>
            <Building2 size={48} style={{ color: 'var(--color-accent)' }} />
          </div>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            {t('confirmed')}
          </h1>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-2">
            <p className="text-sm text-[var(--color-text-muted)]">{t('refLabel')}</p>
            <p className="text-2xl font-mono font-bold text-[var(--color-accent)]">{bookingReference}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{guestDetails.firstName} {guestDetails.lastName} · {selectedHotel.name}</p>
          </div>
          <Button variant="outline" className="w-full" onClick={() => { reset(); router.push(`/${locale}`); }}>
            {t('backToSearch')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <button onClick={() => router.back()} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1.5">
          <ArrowLeft size={16} /> {t('back')}
        </button>
        <span className="text-lg font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>✦ Nextrip</span>
        <div className="w-16" />
      </nav>

      <main className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8" style={{ fontFamily: 'var(--font-display)' }}>{t('review')}</h1>

        <div className="space-y-4">
          <Section title={t('hotel')}>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl shrink-0 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${selectedHotel.colorFrom}, ${selectedHotel.colorTo})` }}>
                <Building2 size={24} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-text-primary)]">{selectedHotel.name}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{selectedHotel.city}, {selectedHotel.country}</p>
              </div>
            </div>
          </Section>

          <Section title={t('stayDetails')}>
            <Row label={t('room')} value={currentRoom.name} />
            <Row label={t('checkIn')} value={checkin} />
            <Row label={t('checkOut')} value={checkout} />
            <Row label={t('nights')} value={`${nights} ${nights === 1 ? t('night') : t('nightsLabel')}`} />
            <Row label={t('guests')} value={String(guests)} />
          </Section>

          <Section title={t('guestLabel')}>
            <Row label={t('name')} value={`${guestDetails.firstName} ${guestDetails.lastName}`} />
            <Row label={t('email')} value={guestDetails.email} />
            <Row label={t('phone')} value={guestDetails.phone} />
            {guestDetails.specialRequests && <Row label={t('specialRequests')} value={guestDetails.specialRequests} />}
          </Section>

          <Section title={t('total')}>
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--color-text-secondary)]">{t('totalLabel')}</p>
              <p className="text-xl font-bold text-[var(--color-text-primary)]">{formattedTotal}</p>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{t('taxNote')}</p>
          </Section>
        </div>

        <div className="mt-8">
          <Button size="lg" className="w-full" onClick={handleConfirm} loading={loading}>{t('confirm')}</Button>
          <p className="text-xs text-[var(--color-text-muted)] text-center mt-3">{t('testNote')}</p>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-3">
      <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">{title}</p>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
      <p className="text-sm text-[var(--color-text-primary)] font-medium">{value}</p>
    </div>
  );
}