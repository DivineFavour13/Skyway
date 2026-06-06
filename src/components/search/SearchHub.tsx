'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { BookingTabs, type BookingTab } from './BookingTabs';
import { SearchForm } from './SearchForm';
import { HotelSearchForm } from '@/components/hotels/HotelSearchForm';
import { CarSearchForm } from '@/components/cars/CarSearchForm';
import { ActivitySearchForm } from '@/components/activities/ActivitySearchForm';

export function SearchHub() {
  const [activeTab, setActiveTab] = useState<BookingTab>('flights');
  const t = useTranslations('home');

  const titles: Record<BookingTab, string> = {
    flights:    t('flightsTitle'),
    hotels:     t('hotelsTitle'),
    cars:       t('carsTitle'),
    activities: t('activitiesTitle'),
  };

  return (
    <div>
      <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-accent)] mb-4">
        {t('travelSearch')}
      </p>

      <h1
        className="text-3xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-8 sm:mb-10 leading-tight transition-all"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {titles[activeTab]}
      </h1>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
        <BookingTabs active={activeTab} onChange={setActiveTab} />
        {activeTab === 'flights'    && <SearchForm />}
        {activeTab === 'hotels'     && <HotelSearchForm />}
        {activeTab === 'cars'       && <CarSearchForm />}
        {activeTab === 'activities' && <ActivitySearchForm />}
      </div>
    </div>
  );
}