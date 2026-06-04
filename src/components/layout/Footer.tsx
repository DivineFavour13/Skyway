import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  const companyLinks = [t('about'), t('careers'), t('press'), t('blog')];
  const supportLinks = [t('helpCentre'), t('contact'), t('flightStatus'), t('baggageInfo')];
  const legalLinks = [t('privacy'), t('terms'), t('cookies'), t('accessibility')];

  return (
    <footer className="border-t border-[var(--color-border)] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <p className="text-xl font-bold text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              ✦ Skyway
            </p>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{t('tagline')}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wide mb-4">
              {t('company')}
            </p>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item}>
                  <span className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wide mb-4">
              {t('support')}
            </p>
            <ul className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item}>
                  <span className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wide mb-4">
              {t('legal')}
            </p>
            <ul className="space-y-3">
              {legalLinks.map((item) => (
                <li key={item}>
                  <span className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-muted)]">
            {t('copyright', { year })}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-[var(--color-text-muted)]">
              {t('poweredBy')}{' '}
              <span className="text-[var(--color-accent)]">Duffel</span>
            </p>
            <div className="flex gap-3">
              {['🇳🇬', '🇬🇧', '🇫🇷'].map((flag) => (
                <span key={flag} className="text-base cursor-default">{flag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}