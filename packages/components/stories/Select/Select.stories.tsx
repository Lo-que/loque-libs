import React, { useState } from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import Select, { DataType } from './index'

const basicList: DataType[] = [
  { name: 'option1', value: 1 },
  { name: 'ontion2', value: 2 },
]

export default {
  title: 'Components/Select',
  component: Select,
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => {
  const [selected, setSelected] = useState(basicList[0])
  return <Select {...args} selected={selected} onChange={setSelected} />
}

export const Basic = Template.bind({})
Basic.args = {
  data: basicList,
}
