'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from './ThemeProvider';
// import { MockProvider } from './MockProvider';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      {/* <MockProvider> */}
      <ThemeProvider defaultTheme="default">{children}</ThemeProvider>
      {/* </MockProvider> */}
    </SessionProvider>
  );
}
