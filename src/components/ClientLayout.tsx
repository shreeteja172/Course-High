'use client';

import { AppProvider } from '@/context/AppContext';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        {children}
      </div>
    </AppProvider>
  );
} 