import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prof. Ennio Tasciotti',
  description: 'Scientist, entrepreneur and longevity medicine expert.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
