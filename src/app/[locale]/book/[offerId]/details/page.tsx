'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useBookingStore } from '@/store/bookingStore';
import { Button } from '@/components/ui/Button';

const passengerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  passport: z.string().min(5),
});

const schema = z.object({
  passengers: z.array(passengerSchema),
});

type FormData = z.infer<typeof schema>;

export default function DetailsPage() {
  const { offerId, locale } = useParams<{ offerId: string; locale: string }>();
  const router = useRouter();
  const t = useTranslations('booking');
  const tSteps = useTranslations('steps');
  const tCommon = useTranslations('common');
  const { selectedOffer, search, passengers, setPassengers } = useBookingStore();

  useEffect(() => {
    if (!selectedOffer) router.replace(`/${locale}`);
  }, [selectedOffer, router, locale]);

  const defaultPassengers = Array.from({ length: search.adults }, (_, i) => {
    return passengers[i] || { firstName: '', lastName: '', email: '', passport: '' };
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      passengers: defaultPassengers,
    },
  });

  function onSubmit(data: FormData) {
    setPassengers(data.passengers);
    router.push(`/${locale}/book/${offerId}/review`);
  }

  const steps = [tSteps('search'), tSteps('seats'), tSteps('details'), tSteps('review')];

  if (!selectedOffer) return null;

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <button
          onClick={() => router.back()}
          className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          ← {tCommon('back')}
        </button>
        <span className="text-lg font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
          ✦ Nextrip
        </span>
        <div className="w-16" />
      </nav>

      <main className="max-w-xl mx-auto px-4 py-10">
        <StepIndicator current={3} steps={steps} />

        <h1
          className="text-2xl font-bold text-[var(--color-text-primary)] mt-8 mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {t('details')}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {Array.from({ length: search.adults }).map((_, index) => {
            const passengerErrors = errors.passengers?.[index];
            return (
              <div
                key={index}
                className="p-6 border border-[var(--color-border)] rounded-2xl bg-[var(--color-surface)] space-y-4"
              >
                <h3 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wide">
                  {t('passenger')} {index + 1} {index === 0 && `(${t('primary')})`}
                </h3>

                <div className="flex gap-4 flex-col sm:flex-row">
                  <Field
                    label={t('firstName')}
                    error={
                      passengerErrors?.firstName
                        ? t('firstName').replace(' *', '') + ' is required'
                        : undefined
                    }
                  >
                    <input
                      {...register(`passengers.${index}.firstName`)}
                      placeholder="Divine"
                      className={inputClass(!!passengerErrors?.firstName)}
                    />
                  </Field>
                  <Field
                    label={t('lastName')}
                    error={
                      passengerErrors?.lastName
                        ? t('lastName').replace(' *', '') + ' is required'
                        : undefined
                    }
                  >
                    <input
                      {...register(`passengers.${index}.lastName`)}
                      placeholder="Favour"
                      className={inputClass(!!passengerErrors?.lastName)}
                    />
                  </Field>
                </div>

                <Field
                  label={t('email')}
                  error={passengerErrors?.email ? 'Enter a valid email' : undefined}
                >
                  <input
                    {...register(`passengers.${index}.email`)}
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass(!!passengerErrors?.email)}
                  />
                </Field>

                <Field
                  label={t('passport')}
                  error={passengerErrors?.passport ? 'Enter a valid passport number' : undefined}
                >
                  <input
                    {...register(`passengers.${index}.passport`)}
                    placeholder="A12345678"
                    className={inputClass(!!passengerErrors?.passport)}
                  />
                </Field>
              </div>
            );
          })}

          <div className="pt-2">
            <Button type="submit" size="lg" className="w-full">
              {t('reviewButton')}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex-1 space-y-1.5">
      <label className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-[var(--color-error)]" role="alert">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full h-11 px-4 rounded-xl border bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-colors ${
    hasError ? 'border-[var(--color-error)] focus:border-[var(--color-error)]' : 'border-[var(--color-border)] focus:border-[var(--color-accent)]'
  }`;
}

function StepIndicator({ current, steps }: { current: number; steps: string[] }) {
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
                  backgroundColor: active ? 'var(--color-accent)' : done ? 'var(--color-success)' : 'var(--color-surface-raised)',
                  color: active ? 'var(--color-accent-text)' : done ? 'var(--color-bg)' : 'var(--color-text-muted)',
                }}
              >
                {done ? '✓' : n}
              </div>
              <span className="text-xs" style={{ color: active ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && <div className="h-px w-6 bg-[var(--color-border)]" />}
          </div>
        );
      })}
    </div>
  );
}