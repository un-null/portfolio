import { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints'

import { notion } from 'src/lib/notion'

import type { NextApiRequest, NextApiResponse } from 'next'

const contact = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, message } = req.body

  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` })
  }

  try {
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID_FORM,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Email: {
          email: email,
        },
        Text: {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
      },
    })
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(500).json({ message: 'Error' })
  }
}

export default contact
