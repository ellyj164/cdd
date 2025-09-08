'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { AuthProvider } from '../src/contexts/AuthContext.jsx'
import { ThemeProvider } from '../src/contexts/ThemeContext.jsx'
import { CartProvider } from '../src/context/CartContext.jsx'
import { NotificationProvider } from '../src/components/NotificationSystem.jsx'
import ErrorBoundary from '../src/components/ErrorBoundary.jsx'

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <ErrorBoundary>
      <NotificationProvider>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </NotificationProvider>
    </ErrorBoundary>
  )
}