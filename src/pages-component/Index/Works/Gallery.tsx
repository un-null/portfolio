import { Card } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
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
export const Gallery: FC<Props> = ({ obj }) => {
  return (
    <div className="mt-4 w-fit max-w-3xl">
      <div className="grid h-auto w-full grid-cols-2 gap-4 sm:grid-cols-3">
        {obj?.map((content) => {
          return (
            <Link key={content.id} href={content.url}>
              <Card
                className="max-h-[250px] max-w-[250px] cursor-pointer"
                withBorder
              >
                <Card.Section>
                  <Image
                    src={content.image}
                    alt=""
                    width={400}
                    height={300}
                    objectFit="cover"
                  />
                </Card.Section>
                <div>
                  <p className="text-sm font-semibold">{content.name}</p>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
