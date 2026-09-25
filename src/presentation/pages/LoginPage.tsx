import { LockKeyhole, Mail } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button, TextInput, Typography } from '../../components/ui'
import { authService } from '../../services/auth.service'

interface LoginPageProps {
  onEnterDashboard: () => void
}

export function LoginPage({ onEnterDashboard }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await authService.signIn({ email, password })
      onEnterDashboard()
    } catch {
      setError('Nao foi possivel entrar. Confira email e senha do administrador.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="login-title">
        <div className="auth-brand">
          <span className="brand__mark" aria-hidden="true">
            GA
          </span>
          <div>
            <Typography as="p" variant="title">
              Gestao Apple
            </Typography>
            <Typography as="p" variant="caption">
              Controle interno da revenda.
            </Typography>
          </div>
        </div>

        <div className="auth-copy">
          <Typography as="h1" variant="pageTitle" className="auth-title" id="login-title">
            Acesse sua area interna.
          </Typography>
          <Typography variant="secondary">
            Organize estoque, vendas, compras e recebimentos em um so lugar.
          </Typography>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            icon={Mail}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="gustavo@appledelivery.com"
            required
          />
          <TextInput
            label="Senha"
            icon={LockKeyhole}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Senha do admin"
            required
          />
          {error ? <span className="field__message field__message--error">{error}</span> : null}
          <Button type="submit" loading={loading}>
            Entrar
          </Button>
        </form>

        <div className="auth-links">
          <button type="button">Esqueci minha senha</button>
          <span>Acesso criado somente nas configuracoes internas.</span>
        </div>
      </section>
    </main>
  )
}
