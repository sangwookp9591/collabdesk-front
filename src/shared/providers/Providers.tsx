import { ThemeProvider } from './ThemeProvider';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ThemeProvider defaultTheme="default">{children}</ThemeProvider>;
}
