import { Loader } from '@mantine/core'
import { FC, Suspense } from 'react'

import { Works } from './Works'

export const Index: FC = () => {
  return (
    <div className="mx-auto mt-10 h-auto w-full max-w-3xl px-4">
      <h2 className="text-left text-2xl">Works</h2>
      <Suspense
        fallback={
          <div className="mt-10 grid w-full justify-start">
            <Loader />
          </div>
        }
      >
        <Works />
      </Suspense>
    </div>
  )
}
