import { NextPageWithLayout } from 'next'

import { ContactPage } from 'src/pages-component'
import { HomeLayout } from 'src/pages-layout'

const Contact: NextPageWithLayout = () => {
  return <ContactPage />
}

Contact.getLayout = (page) => (
  <HomeLayout title="Home" description="null portfolio Contact Page">
    {page}
  </HomeLayout>
)

export default Contact
