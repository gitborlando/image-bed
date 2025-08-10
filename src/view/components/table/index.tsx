import { objectKey, range } from '@gitborlando/utils'
import { useHTMLElement } from '@gitborlando/utils/react'
import { FC } from 'react'
import { Adaptor } from 'src/service/adaptor'
import { Item } from 'src/view/components/item'
import './index.less'

export interface TableProps {}

const count = 6

export const Table: FC<TableProps> = observer(() => {
  const tableRef = useHTMLElement('div')

  const [tableWidth, setTableWidth] = useState(0)
  const itemWidth = useMemo(() => {
    if (tableWidth <= 0) return 0
    return (tableWidth - (count + 1) * 8) / count
  }, [tableWidth])

  const imageQueues = useMemo(() => {
    const imageQueues = range(count).map(() => [] as ImageObject[])
    const imageQueueHeights = range(count).map(() => 0)

    if (tableWidth <= 0) return imageQueues

    const findShortestQueueIndex = () => {
      let index = 0
      let height = imageQueueHeights[0]
      for (let i = 1; i < imageQueueHeights.length; i++) {
        if (imageQueueHeights[i] < height) {
          index = i
          height = imageQueueHeights[i]
        }
      }
      return index
    }

    Adaptor.images.forEach((i) => {
      const ratio = i.ratio
      const index = findShortestQueueIndex()
      imageQueues[index].push(i)
      imageQueueHeights[index] += itemWidth / ratio
    })
    return imageQueues
  }, [tableWidth, Adaptor.images])

  useLayoutEffect(() => {
    setTableWidth(tableRef.current?.clientWidth ?? 0)
  }, [tableRef.current])

  useEffect(() => {
    if (!tableRef.current) return
    const observer = new ResizeObserver((entries) => {
      if (entries[0].contentRect.width > 0) {
        setTableWidth(entries[0].contentRect.width)
      }
    })
    observer.observe(tableRef.current)
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className='Table' ref={tableRef}>
      {imageQueues.map((q) => {
        return (
          <Flex vif={tableWidth > 0} className='list' key={objectKey(q)}>
            {q.map((item) => (
              <Item key={item.name} item={item} width={itemWidth} />
            ))}
          </Flex>
        )
      })}
    </div>
  )
})
