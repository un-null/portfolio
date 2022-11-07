import { ListDatabasesResponse } from '@notionhq/client/build/src/api-endpoints'
import { useQuery } from '@tanstack/react-query'

import { PageType } from './types'

export const useQueryWorks = () => {
  const { data, error } = useQuery<PageType[], Error>(['works'], () =>
    fetch(process.env.NEXT_PUBLIC_HOSTNAME + '/api/works').then((res) =>
      res.json()
    )
  )
  return { data, error }
}
