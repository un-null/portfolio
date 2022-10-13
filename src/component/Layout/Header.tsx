import { ActionIcon, Anchor } from '@mantine/core'
import Link from 'next/link'
import { FC } from 'react'
import { IconMoon, IconSun, IconPlanet } from '@tabler/icons'

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-50 grid h-14 w-full place-items-center bg-white px-6">
      <div className="flex h-full w-full max-w-screen-xl items-center justify-between">
        <Link href="/" passHref>
          <Anchor
            component="a"
            size="xl"
            weight={700}
            underline={false}
            color="dark.7"
            className="flex"
          >
            <span className="mr-2">
              <IconPlanet size={20} />
            </span>
            __null
          </Anchor>
        </Link>
        <div className="flex space-x-6">
          <nav>
            <Link href="/" passHref>
              <Anchor
                component="a"
                size="lg"
                weight={700}
                underline={false}
                color="dark.7"
              >
                Blog
              </Anchor>
            </Link>
          </nav>
          <ActionIcon variant="outline" color="blue">
            <IconMoon size={20} />
          </ActionIcon>
        </div>
      </div>
    </header>
  )
}
