'use client';

import { useEffect, useState } from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  // check cookie on mount
  useEffect(() => {
    const consent = Cookies.get('site_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  if (!show) {
    return null;
  }

  const handleAccept = () => {
    Cookies.set('site_cookie_consent', 'accepted', { expires: 365 });
    if (window.gtag) window.gtag('event', 'cookie_accept');
    setShow(false);
  };

  const handleDecline = () => {
    Cookies.set('site_cookie_consent', 'declined', { expires: 365 });
    if (window.gtag) window.gtag('event', 'cookie_decline');
    setShow(false);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 bg-opacity-95 text-white z-50 animate-slide-up">
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1 text-sm sm:text-base leading-tight">
          We use cookies to enhance your browsing experience.{" "}
          <Link href="/privacy-policy" className="underline text-blue-300 hover:text-blue-200">
            Cookie Policy
          </Link>
        </div>
        <div className="flex-shrink-0 flex gap-2">
          <button
            onClick={handleDecline}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 text-sm"
          >
            Accept
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0%);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
