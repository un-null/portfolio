import { ReactNode } from 'react'

export type PageProps = {
  id: string
  page_url: string
  langages: ReactNode[]
  date: string
  name: string[]
  image_url: string
}

export type PropertyType = {
  Name: { title: [{ plain_text: string }] }
  Date: { date: { start: string } }
  Languages: { multi_select: [{ id: string; name: string; color: string }] }
}

export type PageType = {
  id: string
  cover: Record<'file' | 'external', { url: string }>
  url: string
  properties: PropertyType
}
