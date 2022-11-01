import { Card } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { PageProps } from 'src/lib/works/types'

type Props = {
  records: PageProps[]
}
export const Gallery: FC<Props> = ({ records }) => {
  return (
    <div className="grid h-auto w-fit grid-cols-2 gap-4 sm:grid-cols-3">
      {records?.map((content) => {
        return (
          <Link key={content.id} href={content.page_url}>
            <Card
              className="max-h-[250px] max-w-[250px] cursor-pointer"
              withBorder
            >
              <Card.Section>
                <Image
                  src={content.image_url}
                  alt=""
                  width={400}
                  height={300}
                  objectFit="cover"
                />
              </Card.Section>
              <div>
                <p className="text-sm">{content.name}</p>
              </div>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
