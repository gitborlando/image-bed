import { FC } from 'react'
import { Adaptor } from 'src/service/adaptor'
import { suspend } from 'suspend-react'
import { Table } from './components/table'

export const App: FC<{}> = observer(({}) => {
  suspend(async () => {
    const [_, err] = await to(Adaptor.loadInfo())
    if (err) return console.error(err)
  }, ['fetch'])

  return (
    <Flex layout='c' className='app'>
      <Table />
    </Flex>
  )
})
