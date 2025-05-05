// layout.tsx

import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import './globals.css';                // our theme vars + resets
import '@mantine/core/styles.css';     // Mantine base styles
import '@mantine/notifications/styles.css'; // Mantine toasts

// load Geist fonts into CSS vars so we can use them in tailwind / CSS
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Query Management',                // shown in browser tab / SEO
  description: 'Clinical trial query tracker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={
          // apply our loaded fonts globally + antialiasing
          `${geistSans.variable} ${geistMono.variable} antialiased`
        }
      >
        {/* MantineProvider gives us consistent theming across components */}
        <MantineProvider defaultColorScheme="dark">
          {/* place for any toast notifications */}
          <Notifications />
          {/* child pages will render here */}
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
