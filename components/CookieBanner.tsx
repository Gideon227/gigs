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
    <div className="fixed bottom-0 left-0 w-full z-50 animate-slideUp">
      <CookieConsent
        location="none"
        buttonText="Accept"
        declineButtonText="Decline"
        enableDeclineButton
        cookieName="site_cookie_consent"
        hideOnAccept
        hideOnDecline
        overlay={false}
        style={{
          background: 'rgba(15,15,15,0.95)',
          color: '#fff',
          padding: '0.6rem 1rem', // 👈 reduced height
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
        buttonStyle={{
          color: '#fff',
          background: '#0070f3',
          border: 'none',
          borderRadius: '6px',
          padding: '0.4rem 1rem',
          fontWeight: '600',
          fontSize: '0.8rem',
          marginLeft: '0.5rem',
        }}
        declineButtonStyle={{
          color: '#fff',
          background: '#555',
          border: 'none',
          borderRadius: '6px',
          padding: '0.4rem 1rem',
          fontWeight: '600',
          fontSize: '0.8rem',
          marginLeft: '0.5rem',
        }}
        buttonWrapperClasses="flex items-center justify-end flex-wrap gap-2 mt-2 sm:mt-0"
        containerClasses="flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left"
      >
        <span className="text-[13px] sm:text-[14px] leading-snug">
          We use cookies to enhance your experience.&nbsp;
          <Link
            href="/privacy-policy"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Learn more
          </Link>
        </span>
      </CookieConsent>

      {/* Animation */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
