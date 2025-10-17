'use client';

import CookieConsent, { Cookies } from 'react-cookie-consent';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('site_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="site_cookie_consent"
      hideOnAccept
      hideOnDecline
      overlay={false}
      style={{
        background: 'rgba(0, 0, 0, 0.85)',
        color: '#fff',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        fontSize: '0.9rem',
        lineHeight: '1.4',
      }}
      buttonStyle={{
        color: '#fff',
        background: '#0070f3',
        border: 'none',
        borderRadius: '6px',
        padding: '0.6rem 1.2rem',
        fontWeight: '600',
        fontSize: '0.85rem',
        marginTop: '0.5rem',
        flexShrink: 0,
      }}
      declineButtonStyle={{
        color: '#fff',
        background: '#555',
        border: 'none',
        borderRadius: '6px',
        padding: '0.6rem 1.2rem',
        fontWeight: '600',
        fontSize: '0.85rem',
        marginLeft: '0.6rem',
        marginTop: '0.5rem',
        flexShrink: 0,
      }}
      buttonWrapperClasses="flex flex-wrap gap-2 mt-2 sm:mt-0"
      containerClasses="max-w-screen-lg mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left"
    >
      <span className="text-sm sm:text-base leading-snug">
        We use cookies to enhance your experience.&nbsp;
        <Link href="/privacy-policy" className="text-blue-400 underline hover:text-blue-300">
          Learn more
        </Link>
      </span>
    </CookieConsent>
  );
}
