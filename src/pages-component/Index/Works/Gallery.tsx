import { Card } from '@mantine/core'
import Image from 'next/image'
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
export const Gallery: FC<Props> = ({ obj }) => {
  return (
    <div className="mx-auto mt-4 w-full max-w-3xl">
      <div className="grid h-auto w-full grid-cols-3  gap-4">
        {obj?.map((content) => {
          return (
            <Card key={content.id} className="h-[300px] w-[200px]" withBorder>
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
                <p>{content.name}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
