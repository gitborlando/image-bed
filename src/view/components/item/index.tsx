import { matchCase } from '@gitborlando/utils'
import { useHTMLElement } from '@gitborlando/utils/react'
import { createContext, FC } from 'react'
import { getTypeFromUrl } from 'src/utils/common'
import { useVisible } from 'src/view/hooks/visible'
import './index.less'

export interface ItemProps {
  width: number
  item: Item
}

const Context = createContext<boolean>(false)

export const Item: FC<ItemProps> = observer(({ width, item }) => {
  const imgRef = useHTMLElement('div')
  const type = getTypeFromUrl(item.name + '.png')
  const visible = useVisible(imgRef)
  const [isHover, setIsHover] = useState(false)

  return (
    <Flex
      ref={imgRef}
      layout='c'
      className='Item'
      style={{ width, height: width / item.ratio }}
      data-visible={visible.toString()}
      onHover={(h) => setIsHover(h)}>
      <Context.Provider value={isHover}>
        {matchCase(type, {
          image: <ImageComp url={item.name} visible={visible} />,
          text: <></>,
          tree: <></>,
        })}
      </Context.Provider>
      <Flex vif={isHover} layout='h' className='Item-icons'>
        <Icon
          url={Assets.trash}
          className='delete'
          onClick={() => Adaptor.removeItem(item)}
        />
      </Flex>
    </Flex>
  )
})

const ImageComp: FC<{ url: string; visible: boolean }> = observer(
  ({ url, visible }) => {
    const isHover = useContext(Context)
    const imgRef = useHTMLElement('div')

    return (
      <Flex ref={imgRef} layout='c' className='image-comp'>
        {visible && <img alt='' src={url} data-hover={isHover} />}
      </Flex>
    )
  },
)
