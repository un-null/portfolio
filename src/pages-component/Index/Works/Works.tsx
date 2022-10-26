import { FC } from 'react'
import { Space, Tabs } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import {
  IconBrandMantine,
  IconBrandNextjs,
  IconBrandNotion,
  IconBrandTailwind,
  IconPhoto,
  IconTable,
} from '@tabler/icons'
import dayjs from 'dayjs'

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
    const date = dayjs(content.properties['Date']['date']['start']).format(
      'YYYY.MM.DD'
    )
    const name = content.properties['Name']['title'].map(
      (c: any, i: any) => c.plain_text
    )
    const image_url: any = data?.map(
      (content: any) => content.cover['external']['url']
    )[index]

    const langages = lang.map((c: any, i: any) => {
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
      langages,
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
          <Space mt={20} />
          <Table obj={obj} showIcon />
        </Tabs.Panel>

        <Tabs.Panel value="Gallery">
          <Space mt={20} />
          <Gallery obj={obj} />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

// DatabasePropertyConfigResponse
