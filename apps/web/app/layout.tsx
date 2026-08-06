import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { ThemeProvider } from '@/lib/theme'

export const metadata: Metadata = {
  title: 'micro. — Design Component Library',
  description: 'Micro-interactions and UI blocks for AI-generated apps. Browse, interact, copy the prompt, ship better UI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);})();`
        }} />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <div className="flex pt-14">
            <Sidebar />
            <main className="flex-1 ml-56 min-h-[calc(100vh-56px)]" style={{ background: 'var(--bg)' }}>
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
