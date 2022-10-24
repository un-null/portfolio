import { ActionIcon, Anchor, useMantineColorScheme } from '@mantine/core'
import Link from 'next/link'
import { FC } from 'react'
import { IconMoon, IconSun, IconPlanet } from '@tabler/icons'

export const Header: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <header className="sticky top-0 z-50 grid h-14 w-full place-items-center bg-[#1A1B1E] px-6">
      <div className="flex h-full w-full max-w-screen-lg items-center justify-between">
        <Link href="/" passHref>
          <Anchor
            component="a"
            size="xl"
            weight={700}
            underline={false}
            color="dark.0"
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
          <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
          >
            {dark ? <IconSun size={20} /> : <IconMoon size={20} />}
          </ActionIcon>
        </div>
      </div>
    </header>
  )
}
