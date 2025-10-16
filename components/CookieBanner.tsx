'use client';
import CookieConsent from 'react-cookie-consent';

export default function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="site_cookie_consent"
      onAccept={() => {
        // enable analytics, tracking scripts
        window.gtag && window.gtag('event', 'cookie_accept');
      }}
      onDecline={() => {
        // disable analytics, do not load scripts
      }}
      style={{ background: '#333' }}
      buttonStyle={{ color: '#fff', background: '#0070f3' }}
      declineButtonStyle={{ color: '#fff', background: '#555' }}
    >
      We use cookies to improve your experience. <a href="/cookie-policy">Learn more</a>
    </CookieConsent>
  );
}
