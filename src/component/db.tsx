import { Table } from '@mantine/core'
import { FC } from 'react'

import { useQueryWorks } from 'src/lib/works'

type Content = {
  name: string
  date: string
  lang: string[]
  url: string
}

export const Db: FC = () => {
  const { data } = useQueryWorks()

  const obj = data?.map((content: any) => {
    const id = content.id
    const urls = content.url
    const lang = content.properties['Languages']['multi_select'].map(
      (lang: any) => lang.name
    )
    const date = content.properties['Date']['date']
    const name = content.properties['Name']['title'].map(
      (c: any) => c.plain_text
    )

    // console.log(lang.map((l) => l.name))

    return {
      id,
      urls,
      lang,
      date,
      name,
    }
  })

  const rows = obj?.map((content, index) => (
    <tr key={content.id}>
      <td>
        <a href={content.urls}>{content.name}</a>
      </td>

      <td>{content.date['start']}</td>
      <td>{content.lang}</td>
    </tr>
  ))

  return (
    <div className="mx-auto mt-4 w-full max-w-2xl">
      <p>Db Component</p>
      <Table highlightOnHover withColumnBorders mt={40}>
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Date</th>
            <th>Languages</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  )
}
