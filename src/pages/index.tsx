import { Index } from 'src/pages-component'
import { HomeLayout } from 'src/pages-layout'

import type { NextPageWithLayout } from 'next'

const Home: NextPageWithLayout = () => {
  return <Index />
}

Home.getLayout = (page) => (
  <HomeLayout title="Home" description="null portfolio Home">
    {page}
  </HomeLayout>
)

export default Home
