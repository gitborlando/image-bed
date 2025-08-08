import { createRoot } from 'react-dom/client'
import { App } from './view/app'

import { Github } from 'src/service/github'
import 'src/view/style/index.less'

Github.setup()

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
