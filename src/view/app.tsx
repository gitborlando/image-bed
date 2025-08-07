import { observer } from 'mobx-react'
import { FC } from 'react'
import './app.less'

export const App: FC<{}> = observer(({}) => {
  return (
    <Flex layout='c' className='app'>
      <Flex layout='c' block='x' className='btn-block-x'>
        1234
      </Flex>
    </Flex>
  )
})
