import Head from 'next/head'
import { FC, ReactNode } from 'react'

type LayoutProps = {
  title: string
  children: ReactNode
}

export const HomeLayout: FC<LayoutProps> = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <main>{children}</main>
    </div>
  )
}
