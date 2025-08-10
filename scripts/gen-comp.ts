import { generateComponent } from '@gitborlando/utils/script'

const tsxTemplate = (name: string) => `import { FC } from 'react'
import './index.less'

export interface ${name}Props {}

export const ${name}Comp: FC<${name}Props> = observer(({}) => {
  return <Flex layout='c' className='${name}'></Flex>
})
`

generateComponent({
  kebabCaseName: true,
  dir: 'src/view/components',
  tsxTemplate,
})
