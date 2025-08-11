import 'src/view/style/index.less'
import 'virtual:uno.css'

import { withSuspense } from '@gitborlando/utils/react'
import { configure } from 'mobx'
import { createRoot } from 'react-dom/client'
import { Adaptor } from 'src/service/adaptor'
import { Github } from 'src/service/services/github'
import { Tencent } from 'src/service/services/tencent'
import { App } from './view/app'

configure({ enforceActions: 'never' })

Adaptor.install(Github)
Adaptor.install(Tencent)
Adaptor.use(Tencent)

const root = createRoot(document.getElementById('root')!)
root.render(withSuspense(<App />, <h1>loading...</h1>))
