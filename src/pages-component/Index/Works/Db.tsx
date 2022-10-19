import { Table } from '@mantine/core'
import { FC } from 'react'

type Props = {
  obj:
    | {
        id: any
        urls: any
        lang: any
        date: any
        name: any
        image: any
      }[]
    | undefined
}

export const Db: FC<Props> = ({ obj }) => {
  const rows = obj?.map((content) => (
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
