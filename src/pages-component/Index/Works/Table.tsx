import { Table as MantineTable } from '@mantine/core'
import { FC } from 'react'

type Props = {
  obj:
    | {
        id: any
        url: any
        lang: any
        date: any
        name: any
        image: any
      }[]
    | undefined
}

export const Table: FC<Props> = ({ obj }) => {
  const rows = obj?.map((content) => (
    <tr key={content.id}>
      <td className="flex justify-between px-2">
        <p>{content.name}</p>
        <a
          href={content.url}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer border px-2 py-px shadow-sm hover:bg-gray-100"
        >
          open
        </a>
      </td>

      <td>{content.date['start']}</td>
      <td>{content.lang}</td>
    </tr>
  ))

  return (
    <div className="mx-auto w-full max-w-3xl">
      <MantineTable withColumnBorders mt={16} fontSize="xs">
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Date</th>
            <th>Languages</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </MantineTable>
    </div>
  )
}
