import { Text } from '@mantine/core'
import { FC } from 'react'

export const Footer: FC = () => {
  return (
    <footer className="h-14 w-full border-t border-gray-300">
      <div className="mx-auto grid h-full w-full max-w-screen-xl place-items-center">
        <Text size="xs" align="center">
          null portfolio
        </Text>
      </div>
    </footer>
  )
}
