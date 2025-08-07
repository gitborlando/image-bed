import { Flex } from '@gitborlando/widget'

export function App() {
  return (
    <Flex layout='c' className='w-full h-full gap-y-20'>
      <Flex layout='v-c' className='w-200 bd-1-black/30'>
        <img className='w-100%' src={Assets.章若楠} alt='章若楠' />
        <h2>这是章若楠</h2>
      </Flex>
    </Flex>
  )
}
