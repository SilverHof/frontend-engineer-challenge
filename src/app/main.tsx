import ReactDOM from 'react-dom/client'

import './styles/index.css'
import './providers/ui/_with-translation.tsx'

import { WithProviders } from '@/app/providers'
import { withMsw } from '@/app/providers/ui'
import { AppRouter } from '@/app/routes/app-router.tsx'

const rootElement = document.getElementById('app')

withMsw().then(() => {
  if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <WithProviders>
        <AppRouter />
      </WithProviders>
    )
  }
})
