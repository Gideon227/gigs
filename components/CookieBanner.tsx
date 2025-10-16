// components/CookieBanner.tsx
'use client';

import CookieConsent, { Cookies } from 'react-cookie-consent';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  // Optionally, you could check cookie existence before showing
  useEffect(() => {
    const consent = Cookies.get('site_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="site_cookie_consent"
      hideOnAccept={true}
      hideOnDecline={true}
      onAccept={() => {
        if (window.gtag) {
          window.gtag('event', 'cookie_accept');
        }
      }}
      onDecline={() => {
        if (window.gtag) {
          window.gtag('event', 'cookie_decline');
        }
      }}
      overlay={true}
      style={{ background: 'rgba(0,0,0,0.8)' }}
      buttonStyle={{
        color: '#fff',
        background: '#0070f3',
        border: 'none',
        borderRadius: '4px',
        padding: '0.7rem 1.2rem',
        fontWeight: '500',
        fontSize: '0.9rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}
      declineButtonStyle={{
        color: '#fff',
        background: '#666',
        border: 'none',
        borderRadius: '4px',
        padding: '0.7rem 1.2rem',
        fontWeight: '500',
        fontSize: '0.9rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        marginLeft: '0.8rem',
      }}
      buttonWrapperClasses="cookie-btn-wrapper"
      containerClasses="cookie-container"
    >
      <div className="cookie-text">
        We use cookies to enhance your experience.{' '}
        <Link href="/legal/privacy-policy">
          <a className="cookie-link">Learn more</a>
        </Link>
      </div>
    </CookieConsent>
  );
}
