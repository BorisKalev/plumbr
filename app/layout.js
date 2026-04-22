import { Geist } from 'next/font/google';
import { LanguageProvider } from './context/LanguageContext';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata = {
  title: 'plumbr — Services de plomberie',
  description: 'Solutions de plomberie rapides, fiables et professionnelles.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
