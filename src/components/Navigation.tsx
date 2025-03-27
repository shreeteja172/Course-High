'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1C]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-white relative group"
            >
              <span className="relative z-10">Course High</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group"
            >
              <span className="relative z-10">Dashboard</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md" />
            </Link>
            <Link
              href="/courses"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group"
            >
              <span className="relative z-10">Courses</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md" />
            </Link>
            <Link
              href="/calendar"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group"
            >
              <span className="relative z-10">Calendar</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}; 