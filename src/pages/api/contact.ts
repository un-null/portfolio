import type { NextApiRequest, NextApiResponse } from 'next'

const contact = (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body
  res.status(200).json(data)
}

export default contact
