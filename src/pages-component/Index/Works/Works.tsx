import { FC } from 'react'
import { Tabs } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import {
  IconBrandMantine,
  IconBrandNextjs,
  IconBrandNotion,
  IconBrandTailwind,
  IconPhoto,
  IconTable,
} from '@tabler/icons'

import { useQueryWorks } from 'src/lib/works'

import { Table } from './Table'
import { Gallery } from './Gallery'

export const Works: FC = () => {
  const { data } = useQueryWorks()

  const xs = useMediaQuery('(min-width: 576px)')

  const obj = data?.map((content: any, index) => {
    const id = content.id
    const page_url = content.url
    const lang = content.properties['Languages']['multi_select'].map(
      (lang: any) => lang.name
    )
    const date = content.properties['Date']['date']['start']
    const name = content.properties['Name']['title'].map(
      (c: any) => c.plain_text
    )
    const image_url = data?.map(
      (content: any) => content.cover['external']['url']
    )[index]

    const langIcon = lang.map((c: any, i: any) => {
      switch (c) {
        case 'Next.js':
          return <IconBrandNextjs size={xs ? 24 : 16} key={i} />
        case 'Notion API':
          return <IconBrandNotion size={xs ? 24 : 16} key={i} />
        case 'Tailwind CSS':
          return <IconBrandTailwind size={xs ? 24 : 16} key={i} />
        case 'Mantine':
          return <IconBrandMantine size={xs ? 24 : 16} key={i} />
        default:
          return c
      }
    })

    return {
      id,
      page_url,
      langIcon,
      date,
      name,
      image_url,
    }
  })

  return (
    <div className="mx-auto mt-10 h-auto max-w-3xl">
      <h2 className="mb-6 text-left text-2xl">Works</h2>
      <Tabs defaultValue="Table" color="grape">
        <Tabs.List>
          <Tabs.Tab value="Table" icon={<IconTable size={14} />}>
            Table
          </Tabs.Tab>
          <Tabs.Tab value="Gallery" icon={<IconPhoto size={14} />}>
            Gallery
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Table">
          <Table obj={obj} />
        </Tabs.Panel>

        <Tabs.Panel value="Gallery">
          <Gallery obj={obj} />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

// DatabasePropertyConfigResponse
