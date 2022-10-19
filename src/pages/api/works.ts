// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

import { notion } from 'src/lib/notion'

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_WORKS,
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'ascending',
      },
    ],
  })

  const results = data.results

  // console.log(results.map((page) => page.properties))

  return res.status(200).json(results)
}

export default handler
