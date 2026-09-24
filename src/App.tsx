import { useEffect, useState } from 'react'
import { DashboardPage } from './presentation/pages/DashboardPage'
import { ClientsPage } from './presentation/pages/ClientsPage'
import { LoginPage } from './presentation/pages/LoginPage'
import { ModulePage } from './presentation/pages/ModulePage'
import { RegisterPage } from './presentation/pages/RegisterPage'
import { getModuleById } from './presentation/module-content'

type AppView = 'login' | 'register' | 'dashboard' | string

function getViewFromHash(): AppView {
  const hash = window.location.hash.replace('#', '')

  if (hash === 'login' || hash === 'register' || hash === 'dashboard' || getModuleById(hash)) {
    return hash
  }

  return 'dashboard'
}

function App() {
  const [view, setView] = useState<AppView>(getViewFromHash)

  useEffect(() => {
    const handleHashChange = () => setView(getViewFromHash())

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (nextView: AppView) => {
    window.location.hash = nextView
    setView(nextView)
  }

  if (view === 'login') {
    return <LoginPage onEnterDashboard={() => navigate('dashboard')} onNavigateRegister={() => navigate('register')} />
  }

  if (view === 'register') {
    return <RegisterPage onBackLogin={() => navigate('login')} onEnterDashboard={() => navigate('dashboard')} />
  }

  if (view === 'clientes') {
    return <ClientsPage />
  }

  const module = getModuleById(view)

  if (module) {
    return <ModulePage module={module} />
  }

  return <DashboardPage />
}

export default App
