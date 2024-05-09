import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import MainNav from '@/components/navigation/main-nav';
import ThemeProvider from '@/components/themes/theme-provider';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Next 14 eWUŚ',
  description: 'Aplikacja ułatwiająca weryfikację statusu ubezpieczenia zdrowotnego pacjenta w systemie eWUŚ',
  keywords: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'eWUŚ'],
  authors: [
    { name: 'Krzysztof Borecki', url: 'https://github.com/K3orecki' },
    { name: 'Daniel Biesiada', url: 'https://github.com/BieDaPl' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pl-PL" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen flex flex-col font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainNav />
          <main className="w-full flex-1 flex flex-col items-center">
            {children}
          </main>
          <footer className="w-full h-20 flex items-center justify-center bg-gradient-to-br from-gradientStart from-0% to-gradientEnd to-95%">
            <p className="text-xs text-muted-foreground tracking-wider">
              2024 • Krzysztof Borecki & Daniel Biesiada
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
