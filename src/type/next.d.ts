import { NextPage, NextPageWithLayout } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

declare module 'next' {
  type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement, data?: P) => ReactNode
  }
}

declare module 'next/app' {
  type AppPropsWithLayout<P = {}> = AppProps<P> & {
    Component: NextPageWithLayout<P>
  }
}
