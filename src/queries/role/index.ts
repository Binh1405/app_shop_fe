import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryKeys } from 'src/configs/queryKey'
import { getAllRoles } from 'src/services/role'
import { TParamsGetRoles } from 'src/types/role'

export const useGetListRoles = (
  params: TParamsGetRoles,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: [queryKeys.role_list, params.order, params.search, params.limit, params.page],
    queryFn: async () => {
      const res = await getAllRoles({ params: { ...params } })

      return res
    },
    ...options
  })
}
