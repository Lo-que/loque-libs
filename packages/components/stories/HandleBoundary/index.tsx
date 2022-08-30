import React, { ReactElement } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import Loading from '../Loading'

export interface HandleBoundaryProps<T, E> {
  /**
   * useQuery返回值
   */
  query: UseQueryResult<T, E>

  /**
   * data为请求的响应结果
   */
  children: (data: T) => ReactElement

  /**
   * Loading组件
   */
  loadingComponent?: ReactElement
}

const HandleBoundary = <T extends unknown, E = unknown>({
  query,
  children,
  loadingComponent = <Loading />,
}: HandleBoundaryProps<T, E>) => {
  if (query.isLoading) return loadingComponent
  if (query.isSuccess) return children(query.data)
  return (
    <div>
      <p className="my-4 text-primary">请求发生错误，请重试</p>
      <button onClick={() => query.refetch()}>点击重试</button>
    </div>
  )
}

export default HandleBoundary
