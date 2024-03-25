import client from '@/_v1/lib/client'
import { COMMON_STALE_TIME, ORDER_BY_ID, ORDER_DIR_ASC } from '@/_v1/lib/constants'
import { useQuery } from '@tanstack/react-query'

export function getCategory(ctx: any = null) {
  return async () => {
    const { data } = await client.get('/category', {
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

export function useCategory(ctx?: any) {
  return useQuery({
    queryKey: ['categories', ctx],
    queryFn: getCategory({
      ...ctx
    }),
    staleTime: COMMON_STALE_TIME
  })
}
