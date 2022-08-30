import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Select, { DataType } from '../Select'
import axios from 'axios'

const PeopleSelect = () => {
  const queryClient = useQueryClient()

  queryClient.getQueryCache()
  // people-key 枚举类型
  const query = useQuery(['people-key'], () => axios.get('/people'), {
    select: (data) => data.data.people,
    // refetchInterval: 2000,
  })

  const [selected, setSelected] = useState(query.data[0])

  if (query.status === 'loading') return <>loading</>

  if (query.status === 'success') {
    return (
      <Select data={query.data} selected={selected} onChange={setSelected} />
    )
  }
  return <>error</>
}

export default PeopleSelect
