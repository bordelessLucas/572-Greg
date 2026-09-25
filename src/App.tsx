import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { Typography } from './components/ui'
import { DashboardPage } from './presentation/pages/DashboardPage'
import { ClientsPage } from './presentation/pages/ClientsPage'
import { LoginPage } from './presentation/pages/LoginPage'
import { ModulePage } from './presentation/pages/ModulePage'
import { ProductsPage } from './presentation/pages/ProductsPage'
import { PurchasesPage } from './presentation/pages/PurchasesPage'
import { RegisterPage } from './presentation/pages/RegisterPage'
import { SuppliersPage } from './presentation/pages/SuppliersPage'
import { getModuleById } from './presentation/module-content'
import { authService } from './services/auth.service'

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
  const [user, setUser] = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    const handleHashChange = () => setView(getViewFromHash())

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => authService.observeAuthState((nextUser) => {
    setUser(nextUser)
    setAuthReady(true)
  }), [])

  const navigate = (nextView: AppView) => {
    window.location.hash = nextView
    setView(nextView)
  }

  if (!authReady) {
    return (
      <main className="auth-page">
        <section className="auth-panel" aria-live="polite">
          <Typography as="p" variant="title">Carregando acesso</Typography>
          <Typography variant="secondary">Validando a sessao do administrador.</Typography>
        </section>
      </main>
    )
  }

  if (view === 'login') {
    return <LoginPage onEnterDashboard={() => navigate('dashboard')} />
  }

  if (!user) {
    return <LoginPage onEnterDashboard={() => navigate('dashboard')} />
  }

  if (view === 'register') {
    return <RegisterPage onBackDashboard={() => navigate('dashboard')} />
  }

  if (view === 'clientes') {
    return <ClientsPage />
  }

  if (view === 'fornecedores') {
    return <SuppliersPage />
  }

  if (view === 'produtos') {
    return <ProductsPage />
  }

  if (view === 'compras') {
    return <PurchasesPage />
  }

  const module = getModuleById(view)

  if (module) {
    return <ModulePage module={module} />
  }

  return <DashboardPage />
}

export default App
