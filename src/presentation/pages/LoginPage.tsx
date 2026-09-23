import { LockKeyhole, Mail } from 'lucide-react'
import { Button, TextInput, Typography } from '../../components/ui'

interface LoginPageProps {
  onNavigateRegister: () => void
  onEnterDashboard: () => void
}

export function LoginPage({ onNavigateRegister, onEnterDashboard }: LoginPageProps) {
  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="login-title">
        <div className="auth-brand">
          <span className="brand__mark" aria-hidden="true">
            AD
          </span>
          <div>
            <Typography as="p" variant="title">
              Apple Delivery
            </Typography>
            <Typography as="p" variant="caption">
              Mais que produtos. Conexões.
            </Typography>
          </div>
        </div>

        <div className="auth-copy">
          <Typography as="h1" variant="pageTitle" className="auth-title" id="login-title">
            Entre para continuar.
          </Typography>
          <Typography variant="secondary">
            Gestão comercial, financeira e operacional em um ambiente preciso.
          </Typography>
        </div>

        <form className="auth-form">
          <TextInput label="Email" icon={Mail} type="email" placeholder="gustavo@appledelivery.com" required />
          <TextInput label="Senha" icon={LockKeyhole} type="password" placeholder="••••••••" required />
          <Button type="button" onClick={onEnterDashboard}>
            Entrar
          </Button>
        </form>

        <div className="auth-links">
          <button type="button">Esqueci minha senha</button>
          <button type="button" onClick={onNavigateRegister}>
            Criar conta
          </button>
        </div>
      </section>
    </main>
  )
}
