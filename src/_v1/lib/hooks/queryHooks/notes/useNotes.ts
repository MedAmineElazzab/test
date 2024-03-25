import client from '@/_v1/lib/client'
import { COMMON_STALE_TIME, ORDER_BY_ID, ORDER_DIR_ASC } from '@/_v1/lib/constants'
import { useQuery } from '@tanstack/react-query'

export function getNotes(ctx: any = null) {
    return async () => {
        const { data } = await client.get('/note', {
            params: {
                ...ctx?.filterOptions,
                page: ctx?.page,
                perPage: ctx?.perPage,
                sortBy: ctx?.sortBy ?? ORDER_BY_ID,
                sortOrder: ctx?.sortOrder ?? ORDER_DIR_ASC,
                ...ctx
            }
        })
        return data
    }
}

export function useNotes(ctx?: any, filterOptions?: any) {
    let page = 1
    let perPage = 9
    let sortOrder = ORDER_DIR_ASC
    let sortBy = 'id'

    if (ctx) {
        page = ctx?.page ?? 1
        perPage = ctx?.perPage ?? 9
        sortBy = ctx?.sortBy ?? ORDER_BY_ID
        sortOrder = ctx?.sortOrder ?? ORDER_DIR_ASC
    }

    return useQuery({
        queryKey: ['notes', ctx?.filterOptions, filterOptions, perPage, page, sortOrder, sortBy, ctx],
        queryFn: getNotes({
            ...ctx,
            filterOptions,
            perPage,
            page,
            sortOrder,
            sortBy
        }),
        staleTime: COMMON_STALE_TIME
    })
}
