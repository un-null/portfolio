import Head from 'next/head'
import { FC, ReactNode } from 'react'

import { Footer, Header } from 'src/component/Layout'

type LayoutProps = {
  title: string
  description: string
  children: ReactNode
}

export const HomeLayout: FC<LayoutProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="grid min-h-screen w-screen grid-rows-layout font-mono">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
