import './globals.css';
import { Inter } from 'next/font/google';
import { ClientLayout } from '@/components/ClientLayout';
import { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Course High',
  description: 'A modern course and task management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>
          <div className="min-h-screen bg-[#0A0F1C] flex flex-col [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            {/* Footer */}
            <footer className="py-6 text-center border-t border-gray-800">
              <p className="text-sm text-gray-400">
                Developed by{' '}
                <span className="text-primary-400 font-medium">
                  Shreeteja Mutukundu
                </span>
              </p>
            </footer>
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
