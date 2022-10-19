import { Loader } from '@mantine/core'
import { FC, Suspense } from 'react'

import { Db } from 'src/component'

export const Index: FC = () => {
  return (
    <div>
      <h1>Index</h1>
      <Suspense fallback={<Loader />}>
        <Db />
      </Suspense>
    </div>
  )
}
