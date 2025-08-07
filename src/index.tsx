import { createRoot } from 'react-dom/client'
import { App } from './view/app'

import './style/index.less'

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
