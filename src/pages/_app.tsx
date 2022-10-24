import '../lib/tailwind.css'

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

import type { AppPropsWithLayout } from 'next/app'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  const getLayout = Component.getLayout ?? ((page) => page)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            colors: {
              dark: [
                '#F6F7F8',
                '#A6A7AB',
                '#909296',
                '#5C5F66',
                '#373A40',
                '#2C2E33',
                '#25262B',
                '#1A1B1E',
                '#141517',
                '#101113',
              ],
              grape: [
                '#faf5ff',
                '#f3e8ff',
                '#e9d5ff',
                '#d8b4fe',
                '#c084fc',
                '#a855f7',
                '#9333ea',
                '#7e22ce',
                '#6b21a8',
                '#581c87',
              ],
            },
          }}
        >
          {getLayout(<Component {...pageProps} />)}
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  )
}

export default MyApp
