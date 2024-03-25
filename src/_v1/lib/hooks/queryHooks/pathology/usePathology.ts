import client from '@/_v1/lib/client'
import { COMMON_STALE_TIME, ORDER_BY_ID, ORDER_DIR_ASC } from '@/_v1/lib/constants'
import { useQuery } from '@tanstack/react-query'

export function getPathology(ctx: any = null) {
  return async () => {
    const { data } = await client.get('/pathology', {
      params: {
        page: ctx?.page,
        perPage: ctx?.perPage,
        sortBy: ctx?.sortBy ?? ORDER_BY_ID,
        sortOrder: ctx?.sortOrder ?? ORDER_DIR_ASC
      }
    })
    return data
  }
}

export function usePathology(ctx?: any) {
  return useQuery({
    queryKey: ['pathologies', ctx],
    queryFn: getPathology({
      ...ctx
    }),
    staleTime: COMMON_STALE_TIME
  })
}
