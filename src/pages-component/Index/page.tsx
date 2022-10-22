import { Loader } from '@mantine/core'
import { FC, Suspense } from 'react'

import { Works } from './Works'

export const Index: FC = () => {
  return (
    <div className="h-auto w-full px-4">
      <Suspense fallback={<Loader />}>
        <Works />
      </Suspense>
    </div>
  )
}
