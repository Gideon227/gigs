'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>

      {/* Main content */}
      <div className="z-10 text-center px-6 md:px-0">
        <h1 className="text-7xl md:text-8xl font-extrabold text-purple-600 mb-4 animate-bounce">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, we can’t find the page you’re looking for. It might have been removed or the URL is incorrect.
        </p>

        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>

      {/* Optional illustration */}
      <div className="absolute bottom-10 md:bottom-0 right-0 md:right-10 w-64 md:w-96 opacity-30">
        <Image
          src="/illustrations/404-illustration.svg" // Optional: replace with your own
          alt="404 Illustration"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}
