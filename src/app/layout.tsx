import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ".styles/globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DriveMech - Automotive Solutions",
  description: "Professional automotive repair and maintenance services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ 
          fontFamily: 'var(--font-geist-sans, Inter, system-ui, sans-serif)',
          background: 'var(--background)',
          color: 'var(--foreground)',
          minHeight: '100vh',
          margin: 0,
          lineHeight: 1.6
        }}
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh' 
        }}>
          <header style={{ 
            width: '100%', 
            padding: 'var(--space-lg) var(--space-xl)',
            borderBottom: '1px solid var(--border)',
            background: 'var(--surface)',
            backdropFilter: 'blur(12px)',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}>
            <div style={{ 
              maxWidth: '64rem',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ 
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: 'var(--primary)'
              }}>
                DriveMech
              </span>
              <nav style={{ display: 'flex', gap: 'var(--space-lg)' }}>
                <a href="#" style={{ 
                  color: 'var(--muted)',
                  transition: 'color 0.2s'
                }}>
                  Home
                </a>
                <a href="#" style={{ 
                  color: 'var(--muted)',
                  transition: 'color 0.2s'
                }}>
                  About
                </a>
                <a href="#" style={{ 
                  color: 'var(--muted)',
                  transition: 'color 0.2s'
                }}>
                  Contact
                </a>
              </nav>
            </div>
          </header>
          <main style={{ 
            flex: 1,
            width: '100%',
            maxWidth: '64rem',
            margin: '0 auto',
            padding: 'var(--space-xl) var(--space-md)'
          }}>
            <Providers>{children}</Providers>
          </main>
          <footer style={{ 
            width: '100%',
            padding: 'var(--space-lg) var(--space-xl)',
            borderTop: '1px solid var(--border)',
            background: 'var(--surface)',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'var(--muted)'
          }}>
            © {new Date().getFullYear()} DriveMech. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}

