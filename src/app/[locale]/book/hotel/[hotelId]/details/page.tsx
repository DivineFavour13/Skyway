'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Calendar, Users, Moon } from 'lucide-react';
import { useHotelStore } from '@/store/hotelStore';
import { Button } from '@/components/ui/Button';
import { useFormattedPrice } from '@/hooks/useFormattedPrice';
import { calculateNights } from '@/lib/mockHotels';
import { cn } from '@/lib/utils';

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  specialRequests: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function HotelDetailsPage() {
  const { hotelId, locale } = useParams<{ hotelId: string; locale: string }>();
  const router = useRouter();
  const t = useTranslations('hotelBooking');
  const { selectedHotel, selectedRoom, setSelectedRoom, checkin, checkout, guests, guestDetails, setGuestDetails } = useHotelStore();

  useEffect(() => {
    if (!selectedHotel) router.replace(`/${locale}`);
  }, [selectedHotel, router, locale]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: guestDetails ?? {},
  });

  function onSubmit(data: FormData) {
    setGuestDetails(data);
    router.push(`/${locale}/book/hotel/${hotelId}/review`);
  }

  if (!selectedHotel) return null;

  const nights = calculateNights(checkin, checkout);
  const currentRoom = selectedRoom ?? selectedHotel.roomTypes[0]!;

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <button onClick={() => router.back()} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1.5">
          <ArrowLeft size={16} /> {t('back')}
        </button>
        <span className="text-lg font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>✦ Nextrip</span>
        <div className="w-16" />
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* Hotel summary */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 mb-8">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-xl shrink-0"
              style={{ background: `linear-gradient(135deg, ${selectedHotel.colorFrom}, ${selectedHotel.colorTo})` }} />
            <div className="flex-1">
              <h2 className="text-base font-bold text-[var(--color-text-primary)]">{selectedHotel.name}</h2>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{selectedHotel.city}, {selectedHotel.country}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-xs text-[var(--color-text-secondary)]">
                <span className="flex items-center gap-1"><Calendar size={12} /> {checkin} → {checkout}</span>
                <span className="flex items-center gap-1"><Users size={12} /> {guests} {t('guests')}</span>
                <span className="flex items-center gap-1"><Moon size={12} /> {nights} {nights === 1 ? t('night') : t('nights')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Room selection */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            {t('selectRoom')}
          </h2>
          <div className="space-y-3">
            {selectedHotel.roomTypes.map((room) => {
              const isSelected = currentRoom.id === room.id;
              return (
                <button key={room.id} type="button" onClick={() => setSelectedRoom(room)}
                  className={cn('w-full text-left rounded-2xl border p-4 transition-all',
                    isSelected ? 'border-[var(--color-accent)] bg-[var(--color-accent-dim)]'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]')}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">{room.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{room.beds} · Max {room.maxGuests} guests</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {room.amenities.map((a) => (
                          <span key={a} className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-raised)] text-[var(--color-text-muted)]">{a}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <RoomPrice amount={String(room.pricePerNight)} currency={selectedHotel.currency} nights={nights} perNight={t('perNight')} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          {t('title')}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex gap-4">
            <Field label={t('firstName')} error={errors.firstName ? 'Required' : undefined}>
              <input {...register('firstName')} placeholder="Divine" className={inputClass(!!errors.firstName)} />
            </Field>
            <Field label={t('lastName')} error={errors.lastName ? 'Required' : undefined}>
              <input {...register('lastName')} placeholder="Favour" className={inputClass(!!errors.lastName)} />
            </Field>
          </div>
          <Field label={t('email')} error={errors.email ? 'Enter a valid email' : undefined}>
            <input {...register('email')} type="email" placeholder="you@example.com" className={inputClass(!!errors.email)} />
          </Field>
          <Field label={t('phone')} error={errors.phone ? 'Enter a valid phone number' : undefined}>
            <input {...register('phone')} type="tel" placeholder="+234 800 000 0000" className={inputClass(!!errors.phone)} />
          </Field>
          <Field label={t('specialRequests')}>
            <textarea {...register('specialRequests')} placeholder={t('specialRequestsPlaceholder')} rows={3}
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent)] transition-colors resize-none" />
          </Field>
          <div className="pt-2">
            <Button type="submit" size="lg" className="w-full">{t('reviewButton')}</Button>
          </div>
        </form>
      </main>
    </div>
  );
}

function RoomPrice({ amount, currency, nights, perNight }: { amount: string; currency: string; nights: number; perNight: string }) {
  const formatted = useFormattedPrice(amount, currency);
  return (
    <div>
      <p className="text-lg font-bold text-[var(--color-text-primary)]">{formatted}</p>
      <p className="text-xs text-[var(--color-text-muted)]">{perNight}</p>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex-1 space-y-1.5">
      <label className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-xs text-[var(--color-error)]" role="alert">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full h-11 px-4 rounded-xl border bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-colors ${hasError ? 'border-[var(--color-error)]' : 'border-[var(--color-border)] focus:border-[var(--color-accent)]'}`;
}