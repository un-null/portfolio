import { ActionIcon, Anchor, useMantineColorScheme } from '@mantine/core'
import Link from 'next/link'
import { FC } from 'react'
import { IconMoon, IconPlanet, IconSunLow } from '@tabler/icons'

export const Header: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <header className="sticky top-0 z-50 grid h-14 w-full place-items-center bg-transparent px-6">
      <div className="flex h-full w-full max-w-screen-lg items-center justify-between">
        <Link href="/" passHref>
          <Anchor
            component="a"
            size="xl"
            weight={700}
            underline={false}
            color={dark ? 'dark.0' : 'dark.7'}
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
            <ul className="flex space-x-2">
              <li>
                <Link href="/" passHref>
                  <Anchor
                    component="a"
                    size="md"
                    weight={500}
                    underline={false}
                    color={dark ? 'dark.0' : 'dark.7'}
                  >
                    Blog
                  </Anchor>
                </Link>
              </li>
              <li>
                <Link href="/contact" passHref>
                  <Anchor
                    component="a"
                    size="md"
                    weight={500}
                    underline={false}
                    color={dark ? 'dark.0' : 'dark.7'}
                  >
                    contact
                  </Anchor>
                </Link>
              </li>
            </ul>
          </nav>
          <ActionIcon
            variant="outline"
            className={`${
              dark
                ? 'border-[#F4E99B] text-[#F4E99B]'
                : 'border-[#506886] text-[#506886]'
            }`}
            onClick={() => toggleColorScheme()}
          >
            {dark ? <IconSunLow size={20} /> : <IconMoon size={20} />}
          </ActionIcon>
        </div>
      </div>
    </header>
  )
}
