import { generateComponent } from '@gitborlando/utils/script'

const tsxTemplate = (name: string) => `import './index.less'

interface ${name}Props {}

export const ${name}Comp: FC<${name}Props> = observer(({}) => {
  return <Flex layout='c' className='${name.toLowerCase()}'></Flex>
})
`

const lessTemplate = (name: string) => `
.${name.toLowerCase()} {

}`

generateComponent({
  kebabCaseName: true,
  dir: 'src/view/components',
  tsxTemplate,
  lessTemplate,
})
