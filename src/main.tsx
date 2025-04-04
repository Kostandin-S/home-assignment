import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19';
import './index.css'
import App from './App.tsx'
import { Provider } from './components/ChakraUI/provider.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider enableSystem={false}>
      <App />
    </Provider>
  </StrictMode>,
)
