import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SettingsProvider } from './context/SettingsContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <SettingsProvider>
        <App />
    </SettingsProvider>
)
