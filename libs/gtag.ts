export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

// Send a pageview to Google Analytics
export const pageview = (url: string) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
  console.log(GA_MEASUREMENT_ID)
};
