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
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto animate-slideUp">
      <CookieConsent
        location="none" // prevent default full-width style
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
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          padding: '0.75rem 1rem',
          fontSize: '0.8rem',
          maxWidth: '420px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          lineHeight: '1.4',
        }}
        buttonStyle={{
          color: '#fff',
          background: '#0070f3',
          border: 'none',
          borderRadius: '6px',
          padding: '0.4rem 0.9rem',
          fontWeight: '600',
          fontSize: '0.8rem',
          marginTop: '0.6rem',
        }}
        declineButtonStyle={{
          color: '#fff',
          background: '#555',
          border: 'none',
          borderRadius: '6px',
          padding: '0.4rem 0.9rem',
          fontWeight: '600',
          fontSize: '0.8rem',
          marginLeft: '0.5rem',
          marginTop: '0.6rem',
        }}
        buttonWrapperClasses="flex justify-center gap-2 flex-wrap"
        containerClasses="flex flex-col items-center text-center"
      >
        <span className="text-sm sm:text-[15px] leading-snug">
        We use cookies to analyze our website traffic and to support technical features that enhance your experience.{' '}&nbsp;
          <Link
            href="/privacy-policy"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Learn more
          </Link>
        </span>
      </CookieConsent>

      {/* 👇 Animation styles */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 30px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
