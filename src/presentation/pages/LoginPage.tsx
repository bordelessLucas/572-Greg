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
            GA
          </span>
          <div>
            <Typography as="p" variant="title">
              Gestão Apple
            </Typography>
            <Typography as="p" variant="caption">
              Controle interno da revenda.
            </Typography>
          </div>
        </div>

        <div className="auth-copy">
          <Typography as="h1" variant="pageTitle" className="auth-title" id="login-title">
            Acesse sua área interna.
          </Typography>
          <Typography variant="secondary">
            Organize estoque, vendas, compras e recebimentos em um só lugar.
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
            Criar acesso
          </button>
        </div>
      </section>
    </main>
  )
}
