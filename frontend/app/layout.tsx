import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import ThemeProvider from '@/components/theme-provider';
import MainNav from '@/components/main-nav';
import type { Metadata } from 'next';

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
  children: React.ReactNode;
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
        </ThemeProvider>
      </body>
    </html>
  );
}
