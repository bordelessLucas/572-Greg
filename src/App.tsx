import { useEffect, useState } from 'react'
import { DashboardPage } from './presentation/pages/DashboardPage'
import { LoginPage } from './presentation/pages/LoginPage'
import { RegisterPage } from './presentation/pages/RegisterPage'

type AppView = 'login' | 'register' | 'dashboard'

function getViewFromHash(): AppView {
  const hash = window.location.hash.replace('#', '')

  if (hash === 'login' || hash === 'register' || hash === 'dashboard') {
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

  return <DashboardPage />
}

export default App
