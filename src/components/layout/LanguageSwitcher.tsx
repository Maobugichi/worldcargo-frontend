'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { CaretDown, Check } from '@phosphor-icons/react';
import { locales, type Locale } from '@/i18n/request';

const LOCALE_META: Record<Locale, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇺🇸' },
  es: { label: 'Español', flag: '🇪🇸' },
  ja: { label: '日本語', flag: '🇯🇵' },
  de: { label: 'Deutsch', flag: '🇩🇪' },
};

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  function selectLocale(locale: Locale) {
    setIsOpen(false);
    if (locale === currentLocale) return;
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 rounded-md border border-foreground/20 px-2 py-1.5 text-sm text-foreground transition-colors hover:border-foreground/40 sm:gap-2 sm:px-3"
      >
        <span className="text-base leading-none block lg:hidden" aria-hidden="true">
          {LOCALE_META[currentLocale].flag}
        </span>
        <span className="hidden sm:inline">{LOCALE_META[currentLocale].label}</span>
        <CaretDown
          size={12}
          weight="bold"
          className={`text-foreground/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1.5 min-w-[150px] overflow-hidden rounded-lg border border-border-strong bg-elevated py-1 shadow-lg"
        >
          {locales.map((locale) => {
            const isSelected = locale === currentLocale;
            return (
              <li key={locale} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => selectLocale(locale)}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors ${
                    isSelected
                      ? 'bg-electric/10 text-electric'
                      : 'text-foreground hover:bg-background'
                  }`}
                >
                  <span className="text-base leading-none" aria-hidden="true">
                    {LOCALE_META[locale].flag}
                  </span>
                  <span className="flex-1">{LOCALE_META[locale].label}</span>
                  {isSelected && <Check size={14} weight="bold" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}