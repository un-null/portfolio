import { Table as MantineTable } from '@mantine/core'
import { FC } from 'react'
import dayjs from 'dayjs'
import { IconLink } from '@tabler/icons'

type Props = {
  obj:
    | {
        id: any
        page_url: any
        langIcon: any
        date: any
        name: any
        image_url: any
      }[]
    | undefined
}

export const Table: FC<Props> = ({ obj }) => {
  const rows = obj?.map((content) => (
    <tr key={content.id}>
      <td className="flex items-center justify-between px-2">
        <p>{content.name}</p>
        <a
          href={content.page_url}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer border px-2 py-px shadow-sm hover:bg-gray-100 hover:text-[#1A1B1E]"
        >
          <IconLink size={12} />
        </a>
      </td>

      <td>
        <time>{dayjs(content.date).format('YYYY.MM.DD')}</time>
      </td>
      <td>
        <div className="flex items-center justify-start space-x-1">
          {content.langIcon}
        </div>
      </td>
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
