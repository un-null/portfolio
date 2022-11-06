import '../lib/tailwind.css'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'

import type { AppPropsWithLayout } from 'next/app'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        {getLayout(<Component {...pageProps} />)}
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default MyApp
