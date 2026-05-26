'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useBookingStore } from '@/store/bookingStore';
import { Button } from '@/components/ui/Button';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  passport: z.string().min(5, 'Enter a valid passport number'),
});

type FormData = z.infer<typeof schema>;

export default function DetailsPage() {
  const { offerId, locale } = useParams<{ offerId: string; locale: string }>();
  const router = useRouter();
  const { selectedOffer, passenger, setPassenger } = useBookingStore();

  useEffect(() => {
    if (!selectedOffer) router.replace(`/${locale}`);
  }, [selectedOffer, router, locale]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: passenger ?? {},
  });

  function onSubmit(data: FormData) {
    setPassenger(data);
    router.push(`/${locale}/book/${offerId}/review`);
  }

  if (!selectedOffer) return null;

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <button
          onClick={() => router.back()}
          className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          ← Back
        </button>
        <span
          className="text-lg font-bold text-[var(--color-text-primary)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          ✦ Skyway
        </span>
        <div className="w-16" />
      </nav>

      <main className="max-w-xl mx-auto px-4 py-10">
        <StepIndicator current={3} />

        <h1
          className="text-2xl font-bold text-[var(--color-text-primary)] mt-8 mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Passenger details
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex gap-4">
            <Field label="First name *" error={errors.firstName?.message}>
              <input
                {...register('firstName')}
                placeholder="Divine"
                className={inputClass(!!errors.firstName)}
              />
            </Field>
            <Field label="Last name *" error={errors.lastName?.message}>
              <input
                {...register('lastName')}
                placeholder="Favour"
                className={inputClass(!!errors.lastName)}
              />
            </Field>
          </div>

          <Field label="Email address *" error={errors.email?.message}>
            <input
              {...register('email')}
              type="email"
              placeholder="you@example.com"
              className={inputClass(!!errors.email)}
            />
          </Field>

          <Field label="Passport number *" error={errors.passport?.message}>
            <input
              {...register('passport')}
              placeholder="A12345678"
              className={inputClass(!!errors.passport)}
            />
          </Field>

          <div className="pt-2">
            <Button type="submit" size="lg" className="w-full">
              Review booking →
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 space-y-1.5">
      <label className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-[var(--color-error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full h-11 px-4 rounded-xl border bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-colors ${
    hasError
      ? 'border-[var(--color-error)] focus:border-[var(--color-error)]'
      : 'border-[var(--color-border)] focus:border-[var(--color-accent)]'
  }`;
}

function StepIndicator({ current }: { current: number }) {
  const steps = ['Search', 'Seats', 'Details', 'Review'];
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <div key={step} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div
                className="h-5 w-5 rounded-full text-xs flex items-center justify-center font-semibold"
                style={{
                  backgroundColor: active
                    ? 'var(--color-accent)'
                    : done
                    ? 'var(--color-success)'
                    : 'var(--color-surface-raised)',
                  color: active
                    ? 'var(--color-accent-text)'
                    : done
                    ? 'var(--color-bg)'
                    : 'var(--color-text-muted)',
                }}
              >
                {done ? '✓' : n}
              </div>
              <span
                className="text-xs"
                style={{
                  color: active
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-muted)',
                }}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="h-px w-6 bg-[var(--color-border)]" />
            )}
          </div>
        );
      })}
    </div>
  );
}