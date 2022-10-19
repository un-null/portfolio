import { Loader } from '@mantine/core'
import { FC, Suspense } from 'react'

import { Works } from './Works'

export const Index: FC = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Works />
      </Suspense>
    </div>
  )
}
