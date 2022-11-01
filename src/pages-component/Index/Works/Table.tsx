import { FC } from 'react'
import { IconLink } from '@tabler/icons'
import { DataTable } from 'mantine-datatable'
import { useMediaQuery } from '@mantine/hooks'

import { PageProps } from 'src/lib/works/types'

type Props = {
  records: PageProps[]
}

export const Table: FC<Props> = ({ records }) => {
  const xs = useMediaQuery('(min-width: 576px)')

  return (
    <DataTable
      withColumnBorders
      columns={[
        {
          accessor: 'name',
          cellsClassName: '1fr',
          ellipsis: true,
          render: ({ name, page_url }) => (
            <div>
              {xs ? (
                <div className="flex items-center justify-between">
                  <p>{name}</p>
                  <a
                    href={page_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      xs
                        ? 'cursor-pointer border px-2 py-px shadow-sm hover:bg-gray-100 hover:text-[#1A1B1E]'
                        : 'hidden'
                    }
                  >
                    <IconLink size={12} />
                  </a>
                </div>
              ) : (
                <a href={page_url} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
              )}
            </div>
          ),
        },
        { accessor: 'date', width: 100 },
        { accessor: 'langages', cellsClassName: '1fr flex space-x-2' },
      ]}
      records={records}
      // rowExpansion={{
      //   content: ({ record }) => <p className="pl-5">{record.name}</p>,
      // }}
    />
  )
}
