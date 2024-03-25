import client from '@/_v1/lib/client'
import { COMMON_STALE_TIME, ORDER_BY_ID, ORDER_DIR_ASC } from '@/_v1/lib/constants'
import { useQuery } from '@tanstack/react-query'

export function getSpeciality(ctx: any = null) {
  return async () => {
    const { data } = await client.get('/speciality', {
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

export function useSpeciality(ctx?: any) {
  let page = 1
  let perPage = 10
  let sortOrder = ORDER_DIR_ASC
  let sortBy = 'id'

  if (ctx) {
    page = ctx?.page ?? 1
    perPage = ctx?.perPage ?? 10
    sortBy = ctx?.sortBy ?? ORDER_BY_ID
    sortOrder = ctx?.sortOrder ?? ORDER_DIR_ASC
  }

  return useQuery({
    queryKey: ['specialities', perPage, page, sortOrder, sortBy, ctx],
    queryFn: getSpeciality({
      ...ctx,
      perPage,
      page,
      sortOrder,
      sortBy
    }),
    staleTime: COMMON_STALE_TIME
  })
}
