'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from './ThemeProvider';
import { ReactQueryProviders } from './ReactQueryProvider';
// import { MockProvider } from './MockProvider';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <ReactQueryProviders>
        {/* <MockProvider> */}
        <ThemeProvider defaultTheme="default">{children}</ThemeProvider>
        {/* </MockProvider> */}
      </ReactQueryProviders>
    </SessionProvider>
  );
}
