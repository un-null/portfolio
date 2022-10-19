import { FC } from 'react'

import { useQueryWorks } from 'src/lib/works'

import { Db } from './Db'
import { Gallery } from './Gallery'

export const Works: FC = () => {
  const { data } = useQueryWorks()

  const obj = data?.map((content: any, index) => {
    const id = content.id
    const urls = content.url
    const lang = content.properties['Languages']['multi_select'].map(
      (lang: any) => lang.name
    )
    const date = content.properties['Date']['date']
    const name = content.properties['Name']['title'].map(
      (c: any) => c.plain_text
    )
    const image = data?.map((content: any) => content.cover['external']['url'])[
      index
    ]

    return {
      id,
      urls,
      lang,
      date,
      name,
      image,
    }
  })

  return (
    <div>
      <h1 className="text-center">Works</h1>
      {/* <Db obj={obj} /> */}
      <Gallery obj={obj} />
    </div>
  )
}
