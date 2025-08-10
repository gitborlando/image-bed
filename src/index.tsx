import 'src/view/style/index.less'
import 'virtual:uno.css'

import { withSuspense } from '@gitborlando/utils/react'
import { configure } from 'mobx'
import { createRoot } from 'react-dom/client'
import { Adaptor } from 'src/service/adaptor'
import { Github } from 'src/service/services/github'
import { App } from './view/app'

configure({ enforceActions: 'never' })

Adaptor.use('github', Github)
Adaptor.setService('github')

const root = createRoot(document.getElementById('root')!)
root.render(withSuspense(<App />, <h1>loading...</h1>))
