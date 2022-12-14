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
import { PageType } from 'src/lib/works/types'

import { Table } from './Table'
import { Gallery } from './Gallery'

export const Works: FC = () => {
  const { data, error } = useQueryWorks()

  const xs = useMediaQuery('(min-width: 576px)')

  if (error) throw new Error(error.message)
  if (!data) return null

  const records = data.map((content: PageType, index) => {
    const id = content.id
    const page_url = content.url
    const langs = content.properties['Languages']['multi_select'].map(
      (lang) => lang.name
    )
    const date = dayjs(content.properties['Date']['date']['start']).format(
      'YYYY.MM.DD'
    )
    const name = content.properties['Name']['title'].map((c) => c.plain_text)
    const cover = data?.map((content) => content.cover['external']['url'])[
      index
    ]

    const langages = langs.map((lang, i) => {
      switch (lang) {
        case 'Next.js':
          return <IconBrandNextjs size={xs ? 24 : 16} key={i} />
        case 'Notion API':
          return <IconBrandNotion size={xs ? 24 : 16} key={i} />
        case 'Tailwind CSS':
          return <IconBrandTailwind size={xs ? 24 : 16} key={i} />
        case 'Mantine':
          return <IconBrandMantine size={xs ? 24 : 16} key={i} />
        default:
          return lang
      }
    })

    return {
      id,
      page_url,
      langages,
      date,
      name,
      cover,
    }
  })

  return (
    <div className="mx-auto mt-5 h-auto max-w-3xl">
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
          <Table records={records} />
        </Tabs.Panel>

        <Tabs.Panel value="Gallery">
          <Space mt={20} />
          <Gallery records={records} />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

// DatabasePropertyConfigResponse
