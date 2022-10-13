import { Index } from 'src/pages-component'
import { HomeLayout } from 'src/pages-layout'

import type { NextPageWithLayout } from 'next'

const Home: NextPageWithLayout = () => {
  return <Index />
}

Home.getLayout = (page) => <HomeLayout title="Null Homepage">{page}</HomeLayout>

export default Home
