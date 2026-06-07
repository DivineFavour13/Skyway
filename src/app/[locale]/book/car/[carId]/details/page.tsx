'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Car, MapPin, Calendar, Clock } from 'lucide-react';
import { useCarStore } from '@/store/carStore';
import { Button } from '@/components/ui/Button';
import { calculateRentalDays } from '@/lib/mockCars';

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  licenseNumber: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

export default function CarDetailsPage() {
  const { carId, locale } = useParams<{ carId: string; locale: string }>();
  const router = useRouter();
  const { selectedCar, pickup, pickupDate, returnDate, driverDetails, setDriverDetails } = useCarStore();

  useEffect(() => {
    if (!selectedCar) router.replace(`/${locale}`);
  }, [selectedCar, router, locale]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: driverDetails ?? {},
  });

  function onSubmit(data: FormData) {
    setDriverDetails(data);
    router.push(`/${locale}/book/car/${carId}/review`);
  }

  if (!selectedCar) return null;

  const days = calculateRentalDays(pickupDate, returnDate);

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <button onClick={() => router.back()} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1.5">
          <ArrowLeft size={16} /> Back
        </button>
        <span className="text-lg font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>✦ Nextrip</span>
        <div className="w-16" />
      </nav>

      <main className="max-w-xl mx-auto px-4 py-10">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 mb-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl shrink-0 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${selectedCar.colorFrom}, ${selectedCar.colorTo})` }}>
              <Car size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--color-text-primary)]">{selectedCar.year} {selectedCar.make} {selectedCar.model}</h2>
              <p className="text-xs text-[var(--color-text-muted)]">{selectedCar.provider} · {selectedCar.category}</p>
              <div className="flex flex-wrap gap-3 mt-1 text-xs text-[var(--color-text-secondary)]">
                <span className="flex items-center gap-1"><MapPin size={12} /> {pickup}</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> {pickupDate} → {returnDate}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {days} days</span>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8" style={{ fontFamily: 'var(--font-display)' }}>Driver details</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex gap-4">
            <Field label="First name *" error={errors.firstName ? 'Required' : undefined}>
              <input {...register('firstName')} placeholder="Divine" className={inputClass(!!errors.firstName)} />
            </Field>
            <Field label="Last name *" error={errors.lastName ? 'Required' : undefined}>
              <input {...register('lastName')} placeholder="Favour" className={inputClass(!!errors.lastName)} />
            </Field>
          </div>
          <Field label="Email address *" error={errors.email ? 'Enter a valid email' : undefined}>
            <input {...register('email')} type="email" placeholder="you@example.com" className={inputClass(!!errors.email)} />
          </Field>
          <Field label="Phone number *" error={errors.phone ? 'Enter a valid number' : undefined}>
            <input {...register('phone')} type="tel" placeholder="+234 800 000 0000" className={inputClass(!!errors.phone)} />
          </Field>
          <Field label="Driver's license number *" error={errors.licenseNumber ? 'Required' : undefined}>
            <input {...register('licenseNumber')} placeholder="DL-12345678" className={inputClass(!!errors.licenseNumber)} />
          </Field>
          <div className="pt-2">
            <Button type="submit" size="lg" className="w-full">Review booking →</Button>
          </div>
        </form>
      </main>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex-1 space-y-1.5">
      <label className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-xs text-[var(--color-error)]">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full h-11 px-4 rounded-xl border bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-colors ${hasError ? 'border-[var(--color-error)]' : 'border-[var(--color-border)] focus:border-[var(--color-accent)]'}`;
}